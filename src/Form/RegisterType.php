<?php

namespace App\Form;

use App\Entity\Allergie;
use App\Entity\Regime;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname',TextType::class, [
                'label' => 'Prénom du patient',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez entrer le prénom.'
                    ]),
                    new Length([
                        'min' => 2,
                        'max' => 25,
                        'minMessage' => 'Votre prénom doit contenir au moins {{ limit }} caractères.',
                        'maxMessage' => 'Votre prénom ne peut pas dépasser {{ limit }} caractères.'
                    ]),
                    new Regex([
                        'pattern' => '/^[a-zA-Z]+$/',
                        'message' => 'Le prénom ne peut contenir que des lettres.'
                    ])
                ]
            ])
            ->add('lastname', TextType::class, [
                'label' => 'Nom du patient',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez entrer un noms.'
                    ]),
                    new Length([
                        'min' => 2,
                        'max' => 25,
                        'minMessage' => 'Le nom doit contenir au moins {{ limit }} caractères.',
                        'maxMessage' => 'Le nom ne peut pas dépasser {{ limit }} caractères.'
                    ]),
                    new Regex([
                        'pattern' => '/^[a-zA-Z]+$/',
                        'message' => 'Le noms ne peut contenir que des lettres.'
                    ])
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email du Patient',
                'constraints' => [
                    new NotBlank([
                        'message' => "Veuillez entrer l'email du patient."
                    ]),
                    new Email([
                        'message' => 'Veuillez entrer une adresse email valide.'
                    ])
                ]
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Mot de passe non identique',
                'label' => 'mots de passe du patient',
                'required' => true,
                'first_options' => ['label' => 'Mot de passe'],
                'second_options' => ['label' => 'confimez votre mot de passe']
            ])
            ->add('Regime', EntityType::class, [
                'class' => Regime::class,
                'label' => 'Régime',
                'required' => true,
                'multiple' => true,
                'expanded' => true,

                'attr' => [
                    'class' => 'form-check',
                ]
            ])
            ->add('Allergie', EntityType::class, [
                'class' => Allergie::class,
                'label' => 'Allergie',
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
