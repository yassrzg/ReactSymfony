<?php

namespace App\Controller\Admin;

use App\Entity\Etapes;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class EtapesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Etapes::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
