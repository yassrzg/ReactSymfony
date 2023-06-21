<?php

namespace App\Controller\Admin;

use App\Entity\Allergie;
use App\Entity\Avis;
use App\Entity\Contact;
use App\Entity\Etapes;
use App\Entity\Ingredient;
use App\Entity\Ingredients;
use App\Entity\Recette;
use App\Entity\Regime;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {

        $routeBuilder = $this->container->get(AdminUrlGenerator::class);
        $url = $routeBuilder->setController(UserCrudController::class)->generateUrl();
        return $this->redirect($url);
//        return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('ReactSymfony');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Acceuil', 'fa fa-home');
        yield MenuItem::linkToCrud('Patient', 'fas fa-user', User::class);
        yield MenuItem::linkToCrud('Régime', 'fas fa-list', Regime::class);
        yield MenuItem::linkToCrud('Etapes', 'fas fa-list', Etapes::class);
        yield MenuItem::linkToCrud('Ingredient', 'fas fa-star', Ingredient::class);
        yield MenuItem::linkToCrud('Recette', 'fa-solid fa-utensils', Recette::class);
        yield MenuItem::linkToCrud("Liste d'allergies", 'fa fa-hand-dots', Allergie::class);
        yield MenuItem::linkToCrud('Avis', 'fas fa-star', Avis::class);
        yield MenuItem::linkToCrud('Contact', 'fas fa-star', Contact::class);
    }
}
