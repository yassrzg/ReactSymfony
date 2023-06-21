<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Recette;
use App\Repository\AvisRepository;
use App\Repository\RecetteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RecetteController extends AbstractController
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;

    }
    #[Route('/recette', name: 'app_recette')]
    public function index(RecetteRepository $recetteRepository ): Response
    {

        $user = $this->getUser();
        if($user){
            $recette = $recetteRepository->findAll();
        }else {
            $recette = $recetteRepository->findRecettesWithRecetteUserFalse();
        }

        $recettes = [];

        foreach ($recette as $recetteNoUser) {
            $avis = $recetteNoUser->getAvis();

            $notes = $avis->map(fn ($avi) => $avi->getNote())->toArray();
            $averageRating = count($notes) > 0 ? array_sum($notes) / count($notes) : 0;

            // Stocker la moyenne dans la propriété NoteMoyenne de la recette
            $recetteNoUser->setNoteMoyenne($averageRating);

            // Ajouter la recette au tableau
            $recettes[] = $recetteNoUser;
        }
        return $this->render('recette/index.html.twig', [
            'recettes' => $recettes,
        ]);
    }

    #[Route('/recette/{id}', name: 'app_recette_id')]
    public function recetteId($id, Request $request, AvisRepository $avisRepository) {

        $recette = $this->entityManager->getRepository(Recette::class)->findOneById($id);
        if(!$recette) {
            return $this->redirectToRoute('app_recette_patient');
        }

        $avisId = null;
        $user = $this->getUser();
        $recetteId = $recette->getId();
        if($user) {

            $userId = $user->getId();

            $avisId = $this->entityManager->getRepository(Avis::class)->findByUserIdAndRecetteId($userId, $recetteId);
        }

        $avis = $avisRepository->findBy(['AvisRecette' => $recette]);

        $content = json_decode($request->getContent());

        if ($content != null) {
            // Créer un nouvel avis
            $newAvis = new Avis();
            $newAvis->setAvisRecette($recette);
            $newAvis->setUserAvis($user);
            $newAvis->setNote($content->note);
            $newAvis->setDescription($content->description);
            $this->entityManager->persist($newAvis);
            $this->entityManager->flush();

        }

        return $this->render('recette/recette.html.twig', [
            'recette' => $recette,
            'AvisUser' => $avisId,
            'avis' => $avis,
        ]);

    }
}
