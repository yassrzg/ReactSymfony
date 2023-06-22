<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Contact;
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


    #[Route('/api/getAvis/{recetteId}', name: 'app_api_getAvis')]
    public function avisByRecette(AvisRepository $avisRepository, SerializerInterface $serializer, int $recetteId): JsonResponse
    {
        $avis = $avisRepository->findBy(['AvisRecette' => $recetteId]);
        $jsonAvis = $serializer->serialize($avis, 'json', ['groups' => 'avis']);
        return new JsonResponse($jsonAvis, Response::HTTP_OK, [], true);
    }

    #[Route('/api/setContact', name: 'app_api_setContact')]
    public function contact(Request $request): JsonResponse
    {

        $content = json_decode($request->getContent());
        if($content != null) {

        $newContact = new Contact();
        $newContact->setEmail($content->email);
        $newContact->setName($content->name);
        $newContact->setObjet($content->objet);
        $newContact->setDescription($content->description);
        $newContact->setPhoneNumber($content->number);

        $this->entityManager->persist($newContact);
        $this->entityManager->flush();
            return new JsonResponse(['message' => 'Opération réussie'], 200);
        }
        return new JsonResponse(['message' => 'Erreur dans les données fournies'], 400);
    }


}
