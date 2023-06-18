<?php

namespace App\Form;

use App\Entity\Allergie;
use App\Entity\Regime;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname')
            ->add('lastname')
            ->add('email')
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Mot de passe non identique',
                'label' => 'votre mot de passe',
                'required' => true,
                'first_options' => ['label' => 'Mot de passe'],
                'second_options' => ['label' => 'confimez votre mot de passe']
            ])
            ->add('Regime', EntityType::class, [
                'class' => Regime::class,
                'label' => 'Selectionner le ou les régimes du patient',
                'required' => true,
                'multiple' => true,
                'expanded' => true,

                'attr' => [
                    'class' => 'form-check',
                ]
            ])
            ->add('Allergie', EntityType::class, [
                'class' => Allergie::class,
                'label' => 'Selectionner le ou les allergies du patient',
                'required' => true,
                'multiple' => true,
                'expanded' => true,

                'attr' => [
                    'class' => 'form-check',
                ]
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Inscription'
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
