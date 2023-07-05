<?php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\ResetPassword;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResetPasswordController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/reset-password', name: 'app_reset_password')]
    public function index(Request $request): Response
    {
        if($this->getUser()) {
            return $this->redirectToRoute('app_home');
        }

        if($request->get('email')) {
            $user = $this->entityManager->getRepository(User::class)->findOneByEmail($request->get('email'));


            if($user) {

                // enregistrer la demande en bdd la demande de reset password

                $reset_password = new ResetPassword();
                $reset_password->setUser($user);
                $reset_password->setToken(uniqid());
                $reset_password->setCreatedAt(new \DateTime());
                $this->entityManager->persist($reset_password);
                $this->entityManager->flush();

                // envoie de mail
                $protocol = stripos($_SERVER['SERVER_PROTOCOL'], 'https') === 0 ? 'https://' : 'http://';
                $host = $protocol . $_SERVER['HTTP_HOST'];

                $url = $host . $this->generateUrl('app_reset_password_update', ['token' => $reset_password->getToken()]);

                $email = new Mail();
                $subject = 'Réinitialisation du mot de passe';
                $contentMail = 'Vous avez demandé à réinitialiser votre mot de passe. <br/><br/><br/> Cliquez sur le lien suivant pour réinitialiser votre mot de passe <br/><br/><br/> <a href="'.$url.'">Mettre à jour votre mot de passe</a> <br/><br/><br/> Le liens est valable 3 heures';
                $name_content = $user->getFirstname();
                $sujet = "Vous avez fait une demande de réinitialisation de mot de passe";
                $email->send($user->getEmail(), $name_content, $subject, $contentMail, $name_content, $sujet);

                $this->addFlash('notice', 'Vous allez recevoir un mail dans quelques instant');
            }else {
                $this->addFlash('notice', 'adresse email inconnu');
            }
        }
        return $this->render('reset_password/index.html.twig');
    }

    #[Route('/reset-password/{token}', name: 'app_reset_password_update')]
    public function resetPassword($token): Response
    {
        $reset_password = $this->entityManager->getRepository(ResetPassword::class)->findOneByToken($token);

        if(!$reset_password) {
            return $this->redirectToRoute('app_reset_password');

        }

        $now = new \DateTime();

        if($now > $reset_password->getCreatedAt()->modify('+3 hour')) {
            $this->addFlash('notice', 'Votre demande de mot de passe a expiré. Merci de la renouveller');

            return $this->redirectToRoute('app_reset_password');
        }

        return $this->render('reset_password/update.html.twig', [
            'token' => $token
        ]);

    }
}
