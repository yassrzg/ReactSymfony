<?php

namespace App\Controller;

use App\Repository\RecetteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ApiController extends AbstractController
{
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
}
