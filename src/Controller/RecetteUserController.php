<?php

namespace App\Controller;

use App\Entity\Allergie;
use App\Entity\Avis;
use App\Entity\Recette;
use App\Entity\Regime;
use App\Repository\AvisRepository;
use App\Repository\RecetteRepository;
use App\Repository\RegimeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RecetteUserController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;

    }

//    #[Route('/account/recette_patient', name: 'app_recette_patient')]
//    public function index(Regime $regime, RegimeRepository $regimeRepository): Response
//    {
//        $user = $this->getUser();
//        $regimes = $user->getRegime();
//
//        // Créer un tableau pour stocker les recettes
//        $recettes = [];
//
//        // Récupérer toutes les recettes associées au régime de l'utilisateur
//        foreach ($regimes as $regime) {
//            $recettesRegime = $regime->getRecettes();
//            foreach ($recettesRegime as $recette) {
//                // Récupérer les avis associés à la recette
//                $avis = $recette->getAvis();
//
//                // Calculer la moyenne des notes
//                $notes = $avis->map(fn ($avi) => $avi->getNote())->toArray();
//                $averageRating = count($notes) > 0 ? array_sum($notes) / count($notes) : 0;
//
//                // Stocker la moyenne dans la propriété NoteMoyenne de la recette
//                $recette->setNoteMoyenne($averageRating);
//
//                // Ajouter la recette au tableau
//                $recettes[] = $recette;
//            }
//        }
//
//
//        // Enregistrer les modifications dans la base de données
//        $this->entityManager->flush();
//
//        return $this->render('recette_user/index.html.twig', [
//            'recettes' => $recettes,
//            'moyenne' => $averageRating
//        ]);
//    }



        #[Route('/account/recette_patient', name: 'app_recette_patient')]
    public function index(Regime $regime, RegimeRepository $regimeRepository): Response
    {
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

        // Enregistrer les modifications dans la base de données
        $this->entityManager->flush();

        return $this->render('recette_user/index.html.twig', [
            'recettes' => $filteredRecettes,
            'moyenne' => $averageRating
        ]);
    }



    #[Route('/account/recette_patient/{id}', name: 'app_recette_patient_id')]
    public function recetteId($id, Request $request, AvisRepository $avisRepository) {

            $recette = $this->entityManager->getRepository(Recette::class)->findOneById($id);
            if(!$recette) {
                return $this->redirectToRoute('app_recette_patient');
            }


            $user = $this->getUser();
            $recetteId = $recette->getId();

            $userId = $user->getId();

            $avisId = $this->entityManager->getRepository(Avis::class)->findByUserIdAndRecetteId($userId, $recetteId);

            $avis = $avisRepository->findBy(['AvisRecette' => $recette]);



            $content = json_decode($request->getContent());
//            dd($content);
//
//        if ($content != null) {
//            $avis = new Avis();
//            $avis->setAvisRecette($recette);
//
//            $avis->setUserAvis($user);
//            $avis->setNote($content->note);
//            $avis->setDescription($content->description);
//            $this->entityManager->persist($avis);
//            $this->entityManager->flush();
//        }
        if ($content != null) {
            // Créer un nouvel avis
            $newAvis = new Avis();
            $newAvis->setAvisRecette($recette);
            $newAvis->setUserAvis($user);
            $newAvis->setNote($content->note);
            $newAvis->setDescription($content->description);
            $this->entityManager->persist($newAvis);
            $this->entityManager->flush();

            // Ajouter le nouvel avis à la liste des avis

        }

            return $this->render('recette_user/recette.html.twig', [
                'recette' => $recette,
                'AvisUser' => $avisId,
                'avis' => $avis
            ]);

    }
}
