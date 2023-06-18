<?php

namespace App\Controller;


use App\Entity\Avis;
use App\Entity\Recette;
use App\Entity\User;
use App\Repository\RecetteRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AvisPostController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/avis/post', name: 'app_avis_post')]
    public function index(Request $request, RecetteRepository $recetteRepository, UserRepository $userRepository): Response
    {
        $userId = $request->request->get('user_id');
        $recetteId = $request->request->get('recette_id');
        $rating = $request->request->get('rating');

        // Récupérez l'utilisateur et la recette correspondants à leurs IDs
        $user = $this->$userRepository->find($userId);
        $recette = $this->$recetteRepository->find($recetteId);

        // Créez une nouvelle instance de l'entité Avis
        $avis = new Avis();
        $avis->setUserAvis($user);
        $avis->setAvisRecette($recette);
        $avis->setNote($rating);

        // Enregistrez l'avis dans votre base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($avis);
        $entityManager->flush();

        // Retournez une réponse appropriée à votre application React
        return $this->json([
            'message' => 'Avis enregistré avec succès',
        ]);
    }
}
