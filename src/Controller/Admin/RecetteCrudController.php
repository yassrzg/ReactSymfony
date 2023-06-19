<?php

namespace App\Controller\Admin;

use App\Entity\Recette;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TimeField;

class RecetteCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Recette::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            ImageField::new('imageRecette')->setBasePath('uploads/')
                ->setUploadDir('public/Uploads')
                ->setUploadedFileNamePattern('[randomhash]. [extension]')
                ->setRequired(false),
            TextField::new('titre'),
            TextEditorField::new('description'),
            TimeField::new('tempsPreparation'),
            TimeField::new('tempsCuisson'),
            TimeField::new('tempsRepos'),
            TextField::new('Ingredients'),
            TextField::new('Etapes'),
            AssociationField::new('Regime'),
            AssociationField::new('Allergie'),
            BooleanField::new('recetteUser'),
        ];
    }

}
