<?php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\User;
use App\Form\RegisterType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;

    }
    #[Route('/register', name: 'app_register')]
    public function index(Request $request, UserPasswordHasherInterface $hashPassword): Response
    {
        $user = new User();

        $form = $this->createForm(RegisterType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user = $form->getData();

            $userExist = $this->entityManager->getRepository(User::class)->findOneBy(['email' =>$user->getEmail()]);

            if(!$userExist) {


                $regimeData = $form->get('Regime')->getData();
                $regimeArray = array();
                foreach ($regimeData as $regime) {
                    $regimeArray[] = $regime->getName();
                }
                $allergieData = $form->get('Allergie')->getData();
                $allergieArray = array();
                foreach ($allergieData as $allergie){
                    $allergieArray[] = $allergie->getName();
                }
                $password = $hashPassword->hashPassword($user,$user->getPassword());
                $regimeString = implode(',', $regimeArray); // convert array to string
                $allergieString = implode(',', $allergieArray);
                $user->setRegimeUser($regimeString);
                $user->setAllergieUser($allergieString);
                $user->setPassword($password);
                $user->setRoles(['ROLE_USER']);

                $this->entityManager->persist($user);
                $this->entityManager->flush();





                $notification= 'Inscription réussi';

                return $this->redirectToRoute('app_account');

            } else {
                $notification= 'Email existe déja';
            }

        }
        return $this->render('register/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
