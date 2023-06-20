<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Recette;
use App\Repository\AvisRepository;
use App\Repository\RecetteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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

    #[Route('/api/getAvisById', name: 'app_api_getAvis')]
    public function Avis( ):Response
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

}
