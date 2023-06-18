<?php

namespace App\Controller;

use App\Entity\Regime;
use App\Entity\Testentity;
use App\Repository\RegimeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class AvisController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/getUser', name: 'app_get_user')]
    public function index(SerializerInterface $serializer, Regime $regime, RegimeRepository $regimeRepository): Response
    {
        $h = fn($r,$f,$c) => [];
        $context = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => $h
        ];
//        $user = $this->getUser();
//        $regimes = $user->getRegime();
//
//        // je crée un nouveau tableau pour les recette
//        $recettes = new ArrayCollection();
//
//        // je récupère toute les recette associé au régime de l'User
//        foreach ($regimes as $regime) {
//            $recettesRegime = $regime->getRecettes();
//            // J'ajoute les recette lié au user dans la variable recette
//            foreach ($recettesRegime as $recette) {
////                $tempsPreparationString = $recette->getTempsPreparation()->format('H:i');
////                $tempsReposString = $recette->getTempsRepos()->format('H:i');
////                $tempsCuissonString = $recette->getTempsCuisson()->format('H:i');
//
//
//                $recettes->add($recette);
//            }
//        }
        $user = $this->getUser();
        $regimes = $user->getRegime();

        // Créer un tableau pour stocker les recettes
        $recettes = [];

        // Récupérer toutes les recettes associées au régime de l'utilisateur
        foreach ($regimes as $regime) {
            $recettesRegime = $regime->getRecettes();
            foreach ($recettesRegime as $recette) {
                // Récupérer les avis associés à la recette
                $avis = $recette->getAvis();

                // Calculer la moyenne des notes
                $notes = $avis->map(fn ($avi) => $avi->getNote())->toArray();
                $averageRating = count($notes) > 0 ? array_sum($notes) / count($notes) : 0;

                // Stocker la moyenne dans la propriété NoteMoyenne de la recette
                $recette->setNoteMoyenne($averageRating);

                // Ajouter la recette au tableau
                $recettes[] = $recette;
            }
        }
        $userAllergies = explode(',', $user->getAllergieUser());
        $filteredRecettes = [];
        foreach ($recettes as $recette) {
            $recetteAllergies =  $recette->getAllergie()->toArray();


            // Vérifier si les allergies de l'utilisateur sont présentes dans les allergies de la recette
            $hasAllergies = false;
            foreach ($userAllergies as $allergie) {
                if (in_array($allergie, $recetteAllergies)) {
                    $hasAllergies = true;
                    break;
                }
            }

            // Ajouter la recette à la liste des recettes filtrées si elle ne mentionne pas les allergies de l'utilisateur
            if (!$hasAllergies) {
                $filteredRecettes[] = $recette;
            }
        }

        $r = $serializer->normalize(
            [
                'user'=> $user,
                'recettes' => $filteredRecettes
            ],
            null,
            $context
        );
        return $this->json(
            $r,
        200,
        );
    }

    #[Route('/api/setAvis', name: 'app_post_avis')]
    public function create(Request $request): Response
    {

        $content = json_decode($request->getContent());
        if ($content !== null) {
            $test = new Testentity();
            $test->setName($content->username);
            $test->setPassword($content->password);
            $this->entityManager->persist($test);
            $this->entityManager->flush();
        }

         return $this->json(
        ['message' => 'message envoyé'],
        200,
    );
    }
}
