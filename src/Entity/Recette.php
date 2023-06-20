<?php

namespace App\Entity;

use App\Repository\RecetteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RecetteRepository::class)]
class Recette
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(length: 500)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $tempsPreparation = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $tempsRepos = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $tempsCuisson = null;



    #[ORM\ManyToMany(targetEntity: Allergie::class, inversedBy: 'recettes')]
    private Collection $Allergie;



    #[ORM\Column(nullable: true)]
    private ?bool $recetteUser = null;

    #[ORM\ManyToMany(targetEntity: Regime::class, inversedBy: 'recettes')]
    private Collection $Regime;

    #[ORM\OneToMany(mappedBy: 'AvisRecette', targetEntity: Avis::class)]
    private Collection $avis;

    #[ORM\Column(nullable: true)]
    private ?int $NoteMoyenne = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imageRecette = null;

    #[ORM\ManyToMany(targetEntity: Ingredient::class, inversedBy: 'recettes')]
    private Collection $Ingredient;

    #[ORM\ManyToMany(targetEntity: Etapes::class, inversedBy: 'recettes')]
    private Collection $Etape;



    public function __construct()
    {
        $this->Allergie = new ArrayCollection();
        $this->Regime = new ArrayCollection();
        $this->avis = new ArrayCollection();
        $this->Ingredient = new ArrayCollection();
        $this->Etape = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->titre;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getTempsPreparation(): ?\DateTimeInterface
    {
        return $this->tempsPreparation;
    }

    public function setTempsPreparation(\DateTimeInterface $tempsPreparation): self
    {
        $this->tempsPreparation = $tempsPreparation;

        return $this;
    }

    public function getTempsRepos(): ?\DateTimeInterface
    {
        return $this->tempsRepos;
    }

    public function setTempsRepos(\DateTimeInterface $tempsRepos): self
    {
        $this->tempsRepos = $tempsRepos;

        return $this;
    }

    public function getTempsCuisson(): ?\DateTimeInterface
    {
        return $this->tempsCuisson;
    }

    public function setTempsCuisson(\DateTimeInterface $tempsCuisson): self
    {
        $this->tempsCuisson = $tempsCuisson;

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


    public function isRecetteUser(): ?bool
    {
        return $this->recetteUser;
    }

    public function setRecetteUser(?bool $recetteUser): static
    {
        $this->recetteUser = $recetteUser;

        return $this;
    }

    /**
     * @return Collection<int, Regime>
     */
    public function getRegime(): Collection
    {
        return $this->Regime;
    }

    public function addRegime(Regime $regime): static
    {
        if (!$this->Regime->contains($regime)) {
            $this->Regime->add($regime);
        }

        return $this;
    }

    public function removeRegime(Regime $regime): static
    {
        $this->Regime->removeElement($regime);

        return $this;
    }

    /**
     * @return Collection<int, Avis>
     */
    public function getAvis(): Collection
    {
        return $this->avis;
    }

    public function addAvi(Avis $avi): static
    {
        if (!$this->avis->contains($avi)) {
            $this->avis->add($avi);
            $avi->setAvisRecette($this);
        }

        return $this;
    }

    public function removeAvi(Avis $avi): static
    {
        if ($this->avis->removeElement($avi)) {
            // set the owning side to null (unless already changed)
            if ($avi->getAvisRecette() === $this) {
                $avi->setAvisRecette(null);
            }
        }

        return $this;
    }

    public function getNoteMoyenne(): ?int
    {
        return $this->NoteMoyenne;
    }

    public function setNoteMoyenne(?int $NoteMoyenne): static
    {
        $this->NoteMoyenne = $NoteMoyenne;

        return $this;
    }

    public function getImageRecette(): ?string
    {
        return $this->imageRecette;
    }

    public function setImageRecette(?string $imageRecette): static
    {
        $this->imageRecette = $imageRecette;

        return $this;
    }

    /**
     * @return Collection<int, Ingredient>
     */
    public function getIngredient(): Collection
    {
        return $this->Ingredient;
    }

    public function addIngredient(Ingredient $ingredient): static
    {
        if (!$this->Ingredient->contains($ingredient)) {
            $this->Ingredient->add($ingredient);
        }

        return $this;
    }

    public function removeIngredient(Ingredient $ingredient): static
    {
        $this->Ingredient->removeElement($ingredient);

        return $this;
    }

    /**
     * @return Collection<int, Etapes>
     */
    public function getEtape(): Collection
    {
        return $this->Etape;
    }

    public function addEtape(Etapes $etape): static
    {
        if (!$this->Etape->contains($etape)) {
            $this->Etape->add($etape);
        }

        return $this;
    }

    public function removeEtape(Etapes $etape): static
    {
        $this->Etape->removeElement($etape);

        return $this;
    }

}
