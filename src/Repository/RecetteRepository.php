<?php

namespace App\Repository;

use App\Entity\Recette;
use App\Entity\Regime;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Doctrine\Persistence\ManagerRegistry;


/**
 * @extends ServiceEntityRepository<Recette>
 *
 * @method Recette|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recette|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recette[]    findAll()
 * @method Recette[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecetteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recette::class);
    }

    public function save(Recette $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Recette $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function findRecettesWithRecetteUserFalse()
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.recetteUser = :recetteUser')
            ->setParameter('recetteUser', false)
            ->getQuery()
            ->getResult();
    }

    public function findRecettesWithRecetteUserTrue()
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.recetteUser = :recetteUser')
            ->setParameter('recetteUser', true)
            ->getQuery()
            ->getResult();
    }

    public function findByRecettesByRegimeAndAllergie(User $user): array
    {
        $queryBuilder = $this->createQueryBuilder('r')
            ->leftJoin('r.Regime', 'reg')
            ->leftJoin('r.Allergie', 'a')
            ->andWhere(':regime MEMBER OF r.Regime')
            ->andWhere(':allergie NOT MEMBER OF r.Allergie')
            ->setParameter('regime', $user->getRegime())
            ->setParameter('allergie', $user->getAllergie());

        return $queryBuilder->getQuery()->getResult();
    }

    public function findAllWithPagination(Regime $regime, User $user): Query
    {
        $qb = $this->createQueryBuilder('r');
        $qb->leftJoin('r.regime', 'regime');
        $qb->andWhere('regime = :regime');
        $qb->setParameter('regime', $regime);

        $allergies = $user->getAllergie();

        if (!empty($allergies)) {
            foreach ($allergies as $index => $allergie) {
                $qb->leftJoin("r.allergie", "allergie$index");
                $qb->andWhere("allergie$index.id NOT IN (:allergies$index)");
                $qb->setParameter("allergies$index", $allergie);
            }
        }

        return $qb->getQuery();
    }

    public function findAllByUserRegimeWithoutAllergies(User $user): array
    {
        $qb = $this->createQueryBuilder('r');

        $qb->join('r.allergies', 'a')
            ->leftJoin('user.regimes', 'ur')
            ->where('ur.id = r.id')
            ->andWhere($qb->expr()->notIn('a.id', ':allergies'))
            ->setParameter('allergies', $user->getAllergie());

        return $qb->getQuery()->getResult();
    }
    public function findByRecettesByRegimeAndAllergies(Regime $regime, array $allergies): array
    {
        $qb = $this->createQueryBuilder('r');
        $qb->leftJoin('r.Regime', 'regime');
        $qb->andWhere('regime.id = :regimeId');
        $qb->setParameter('regimeId', $regime->getId());

        if (!empty($allergies)) {
            $qb->leftJoin('r.Allergie', 'allergie');
            $qb->andWhere($qb->expr()->notIn('allergie.id', ':allergies'));
            $qb->setParameter('allergies', $allergies);
        }

        return $qb->getQuery()->getResult();
    }



    public function findByRegime(Regime $regime): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.Regime = :regime')
            ->setParameter('regime', $regime)
            ->getQuery()
            ->getResult();
    }

    public function findByRegimesNames(array $regimesNames): array
    {
        return $this->createQueryBuilder('r')
            ->join('r.Regime', 'Regime')
            ->andWhere('Regime.name IN (:regimesNames)')
            ->setParameter('regimesNames', $regimesNames)
            ->getQuery()
            ->getResult();
    }















//    /**
//     * @return Recette[] Returns an array of Recette objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Recette
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
