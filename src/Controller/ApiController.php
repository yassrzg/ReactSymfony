<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Recette;
use App\Repository\AvisRepository;
use App\Repository\RecetteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    public function index(RecetteRepository $recetteRepository, SerializerInterface $serializer):JsonResponse
    {

        $recettes = $recetteRepository->findRecettesWithRecetteUserFalse();

        $jsonRecettes = $serializer->serialize($recettes, 'json', ['groups' => 'recette']);
        return new JsonResponse($jsonRecettes, Response::HTTP_OK, [], true);

    }

    #[Route('/api/getAvis', name: 'app_api_getAvis')]
    public function avis(AvisRepository $avisRepository, SerializerInterface $serializer):JsonResponse
    {

        $avis = $avisRepository->findAll();
        $jsonAvis = $serializer->serialize($avis, 'json', ['groups' => 'avis']);
        return new JsonResponse($jsonAvis, Response::HTTP_OK, [], true);


    }

}
