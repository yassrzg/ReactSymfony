<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Entity\Contact;
use App\Entity\Recette;
use App\Entity\User;
use App\Repository\AllergieRepository;
use App\Repository\AvisRepository;
use App\Repository\RecetteRepository;
use App\Repository\RegimeRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ApiController extends AbstractController
{


    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer, Security $security) {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;

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

    #[Route('/api/getAllergie', name: 'app_api_getAllergie')]
    public function allergie(AllergieRepository $allergieRepository, SerializerInterface $serializer): JsonResponse
    {
        $allergie = $allergieRepository->findAll();
        $jsonAllergie = $serializer->serialize($allergie, 'json', ['groups' => 'allergie']);
        return new JsonResponse($jsonAllergie, Response::HTTP_OK, [], true);
    }
    #[Route('/api/getRegime', name: 'app_api_getRegime')]
    public function regime(RegimeRepository $regimeRepository, SerializerInterface $serializer): JsonResponse
    {
        $regime = $regimeRepository->findAll();
        $jsonRegime = $serializer->serialize($regime, 'json', ['groups' => 'allergie']);
        return new JsonResponse($jsonRegime, Response::HTTP_OK, [], true);
    }

    #[Route('/api/setUser', name: 'app_api_setUser')]
    public function user(Request $request ,UserPasswordHasherInterface $hashPassword): JsonResponse
    {
        $content = json_decode($request->getContent());
        $newUser = new User();
        if($content != null) {
            $userExist = $this->entityManager->getRepository(User::class)->findOneBy(['email' =>$newUser->getEmail()]);
            if(!$userExist) {
                $newUser->setEmail($content->email);
                $newUser->setRoles(['ROLE_USER']);
                $newUser->setFirstname($content->name);
                $newUser->setLastname($content->surname);
                $password = $hashPassword->hashPassword($newUser,$content->password);
                $newUser->setPassword($password);
                $newUser->setPhoneNumber($content->number);

                $regimeString = implode(',', $content->regime); // convert array to string
                $allergieString = implode(',', $content->allergie);

                $newUser->setRegimeUser($regimeString);
                $newUser->setAllergieUser($allergieString);

                $this->entityManager->persist($newUser);
                $this->entityManager->flush();
                return new JsonResponse(['message' => 'Opération réussie'], 200);
            }
        }
        return new JsonResponse(['message' => 'Erreur dans les données fournies'], 400);
    }



    #[Route('/api/getUser', name: 'app_api_getUser')]
    public function getUserData(): JsonResponse
    {
        $user = $this->getUser();
        $jsonUser = $this->serializer->serialize($user, 'json', ['groups' => 'user']);

        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    #[Route('/api/setNewDataUser', name: 'app_api_setNewDataUser')]
    public function setNewDataUser( Request $request,UserPasswordHasherInterface $hashPassword): JsonResponse
    {
        $content = json_decode($request->getContent());
        if($content != null) {
            $user = $this->getUser();

            $user->setEmail($content->email);

            $user->setFirstname($content->name);
            $user->setLastname($content->surname);
            $password = $hashPassword->hashPassword($user,$content->password);
            $user->setPassword($password);
            $user->setPhoneNumber($content->number);

            $regimeString = implode(',', $content->regime); // convert array to string
            $allergieString = implode(',', $content->allergie);

            $user->setRegimeUser($regimeString);
            $user->setAllergieUser($allergieString);

            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return new JsonResponse(['message' => 'Opération réussie'], 200);
        }
        return new JsonResponse(['message' => 'Erreur dans les données fournies'], 400);
    }



}
