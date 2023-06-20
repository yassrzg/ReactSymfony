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
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ApiController extends AbstractController
{


    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;

    }
    #[Route('/api/getRecetteNoUser', name: 'app_api_getRecette_noUser')]
    public function index(RecetteRepository $recetteRepository, SerializerInterface $serializer):Response
    {

        $h = fn($r,$f,$c) => [];
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => $h
        ];
        $recettes = $recetteRepository->findRecettesWithRecetteUserFalse();

        $r = $serializer->normalize(
            [
                'recettes' => $recettes
            ],
            null,
            $context
        );
        return $this->json(
            $r,
            200,
        );

    }

    #[Route('/account/recette_patient/{id}', name: 'app_recette_patient_id')]
    public function recetteId($id, AvisRepository $avisRepository,  SerializerInterface $serializer) {

        $recette = $this->entityManager->getRepository(Recette::class)->findOneById($id);
        if(!$recette) {
            return $this->redirectToRoute('app_recette_patient');
        }


        $user = $this->getUser();
        $recetteId = $recette->getId();

        $userId = $user->getId();

        $avisId = $this->entityManager->getRepository(Avis::class)->findByUserIdAndRecetteId($userId, $recetteId);

        $avis = $avisRepository->findBy(['AvisRecette' => $recette]);


        $h = fn($r,$f,$c) => [];

        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => $h
        ];

        $r = $serializer->normalize(
            [
                'avis' => $avis
            ],
            null,
            $context
        );
        return $this->json(
            $r,
            200,
        );

    }

}
