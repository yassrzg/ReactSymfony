<?php

namespace App\Repository;

use App\Entity\Recette;
use App\Entity\Regime;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Regime>
 *
 * @method Regime|null find($id, $lockMode = null, $lockVersion = null)
 * @method Regime|null findOneBy(array $criteria, array $orderBy = null)
 * @method Regime[]    findAll()
 * @method Regime[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RegimeRepository extends ServiceEntityRepository
{

    private EntityManagerInterface $entityManager;
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Regime::class);
        $this->entityManager = $entityManager;
    }

    public function save(Regime $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Regime $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findAllWithNames(): array
    {
        $query = $this->entityManager->createQueryBuilder();
        $query->select('u')
            ->from(Regime::class, 'u');
        $qb = $query->getQuery();
        return $qb->getResult();
    }

    public function findRecettesByRegimes(array $regimes): array
    {
        return $this->createQueryBuilder('r')
            ->leftJoin('r.recettes', 'recettes')
            ->andWhere('r.name IN (:regimes)')
            ->setParameter('regimes', $regimes)
            ->getQuery()
            ->getResult();
    }

    public function findByRegimesNames(array $regimesNames): array
    {
        return $this->createQueryBuilder('r')
            ->join('r.regimes', 'regime')
            ->andWhere('regime.name IN (:regimesNames)')
            ->setParameter('regimesNames', $regimesNames)
            ->getQuery()
            ->getResult();
    }

















//    /**
//     * @return Regime[] Returns an array of Regime objects
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

//    public function findOneBySomeField($value): ?Regime
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
