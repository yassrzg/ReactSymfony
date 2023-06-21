<?php

namespace App\Entity;

use App\Repository\RegimeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RegimeRepository::class)]
class Regime
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true, unique: true)]
    #[Groups(['recette'])]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Recette::class, mappedBy: 'Regime')]
    private Collection $recettes;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'Regime')]
    private Collection $users;

    #[ORM\ManyToMany(targetEntity: Allergie::class, inversedBy: 'regimes')]
    private Collection $Allergie;

    public function __construct()
    {
        $this->recettes = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->Allergie = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Recette>
     */
    public function getRecettes(): Collection
    {
        return $this->recettes;
    }

    public function addRecette(Recette $recette): static
    {
        if (!$this->recettes->contains($recette)) {
            $this->recettes->add($recette);
            $recette->addRegime($this);
        }

        return $this;
    }

    public function removeRecette(Recette $recette): static
    {
        if ($this->recettes->removeElement($recette)) {
            $recette->removeRegime($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addRegime($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeRegime($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Allergie>
     */
    public function getAllergie(): Collection
    {
        return $this->Allergie;
    }

    public function addAllergie(Allergie $allergie): static
    {
        if (!$this->Allergie->contains($allergie)) {
            $this->Allergie->add($allergie);
        }

        return $this;
    }

    public function removeAllergie(Allergie $allergie): static
    {
        $this->Allergie->removeElement($allergie);

        return $this;
    }
}
