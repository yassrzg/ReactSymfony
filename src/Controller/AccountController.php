<?php

namespace App\Controller;

use App\Entity\Regime;
use App\Repository\RegimeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountController extends AbstractController
{

    #[Route('/account', name: 'app_account')]
    public function index(): Response
    {


        return $this->render('account/index.html.twig', [
            'controller_name' => 'AccountController',
        ]);
    }
}
