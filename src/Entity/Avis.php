<?php

namespace App\Entity;

use App\Repository\AvisRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AvisRepository::class)]
class Avis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $Note = null;

    #[ORM\Column(length: 1000)]
    private ?string $Description = null;

    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?User $UserAvis = null;

    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?Recette $AvisRecette = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->Note;
    }

    public function setNote(int $Note): static
    {
        $this->Note = $Note;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(string $Description): static
    {
        $this->Description = $Description;

        return $this;
    }

    public function getUserAvis(): ?User
    {
        return $this->UserAvis;
    }

    public function setUserAvis(?User $UserAvis): static
    {
        $this->UserAvis = $UserAvis;

        return $this;
    }

    public function getAvisRecette(): ?Recette
    {
        return $this->AvisRecette;
    }

    public function setAvisRecette(?Recette $AvisRecette): static
    {
        $this->AvisRecette = $AvisRecette;

        return $this;
    }
}
