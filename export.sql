-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dieteSymf
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allergie`
--

DROP TABLE IF EXISTS `allergie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allergie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergie`
--

LOCK TABLES `allergie` WRITE;
/*!40000 ALTER TABLE `allergie` DISABLE KEYS */;
INSERT INTO `allergie` VALUES (1,'noisette'),(2,'casse'),(3,'chocolat'),(4,'fraise'),(5,'coca'),(6,'sucre');
/*!40000 ALTER TABLE `allergie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avis`
--

DROP TABLE IF EXISTS `avis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_avis_id` int(11) DEFAULT NULL,
  `avis_recette_id` int(11) DEFAULT NULL,
  `note` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_8F91ABF041736E95` (`user_avis_id`),
  KEY `IDX_8F91ABF065F488D0` (`avis_recette_id`),
  CONSTRAINT `FK_8F91ABF041736E95` FOREIGN KEY (`user_avis_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_8F91ABF065F488D0` FOREIGN KEY (`avis_recette_id`) REFERENCES `recette` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avis`
--

LOCK TABLES `avis` WRITE;
/*!40000 ALTER TABLE `avis` DISABLE KEYS */;
INSERT INTO `avis` VALUES (91,16,2,4,'yass'),(92,16,3,4,'cool');
/*!40000 ALTER TABLE `avis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `objet` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (9,'yass.srgrzg@gmail.com','Yassine Rezgui','hello','hello','+33618135078');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20230614122503','2023-06-14 12:25:16',1349),('DoctrineMigrations\\Version20230614124825','2023-06-14 12:48:38',69),('DoctrineMigrations\\Version20230614125011','2023-06-14 12:50:14',60),('DoctrineMigrations\\Version20230614125352','2023-06-14 12:53:56',468),('DoctrineMigrations\\Version20230615071126','2023-06-15 07:11:30',74),('DoctrineMigrations\\Version20230615072325','2023-06-15 07:23:29',300),('DoctrineMigrations\\Version20230615073350','2023-06-15 07:33:54',58),('DoctrineMigrations\\Version20230615092500','2023-06-15 09:25:05',242),('DoctrineMigrations\\Version20230615115429','2023-06-15 11:54:32',332),('DoctrineMigrations\\Version20230615115709','2023-06-15 11:57:13',284),('DoctrineMigrations\\Version20230616103615','2023-06-16 10:36:22',67),('DoctrineMigrations\\Version20230616124041','2023-06-16 12:40:47',156),('DoctrineMigrations\\Version20230617142739','2023-06-17 14:27:46',298),('DoctrineMigrations\\Version20230617143154','2023-06-17 14:32:01',287),('DoctrineMigrations\\Version20230617165830','2023-06-17 16:58:36',145),('DoctrineMigrations\\Version20230619072226','2023-06-19 07:22:31',66),('DoctrineMigrations\\Version20230619143856','2023-06-19 14:39:02',514),('DoctrineMigrations\\Version20230619145140','2023-06-19 14:51:44',215),('DoctrineMigrations\\Version20230619145229','2023-06-19 14:52:33',144),('DoctrineMigrations\\Version20230619151336','2023-06-19 15:13:40',380),('DoctrineMigrations\\Version20230621194250','2023-06-21 19:42:57',58),('DoctrineMigrations\\Version20230622110446','2023-06-22 11:04:51',71),('DoctrineMigrations\\Version20230622135728','2023-06-22 13:57:32',51),('DoctrineMigrations\\Version20230623095120','2023-06-23 09:51:25',79),('DoctrineMigrations\\Version20230705111105','2023-07-05 11:11:22',179),('DoctrineMigrations\\Version20230705112359','2023-07-05 11:24:04',136),('DoctrineMigrations\\Version20230705112914','2023-07-05 11:29:29',175);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etapes`
--

DROP TABLE IF EXISTS `etapes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etapes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etapes`
--

LOCK TABLES `etapes` WRITE;
/*!40000 ALTER TABLE `etapes` DISABLE KEYS */;
INSERT INTO `etapes` VALUES (1,'épucher'),(2,'couper'),(3,'cuir'),(4,'reposer'),(5,'couper');
/*!40000 ALTER TABLE `etapes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'chocolat'),(2,'cerise'),(3,'coco'),(4,'fraise');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recette`
--

DROP TABLE IF EXISTS `recette`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recette` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `temps_preparation` time NOT NULL,
  `temps_repos` time NOT NULL,
  `temps_cuisson` time NOT NULL,
  `recette_user` tinyint(1) DEFAULT NULL,
  `note_moyenne` int(11) DEFAULT NULL,
  `image_recette` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recette`
--

LOCK TABLES `recette` WRITE;
/*!40000 ALTER TABLE `recette` DISABLE KEYS */;
INSERT INTO `recette` VALUES (1,'recette1','<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the</div>','17:40:00','17:42:00','16:41:00',1,3,'c2e000015b376dc441389625aad3d9c8de560e1e. jpg'),(2,'recette2','<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the</div>','16:44:00','17:44:00','15:44:00',1,4,'62652a07b3dfd2956e16767b00904ed627e5af67. jpg'),(3,'recette3','<div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the</div>','18:45:00','14:51:00','19:45:00',0,4,'5f35d035a9d376cda975a7ac342dafdbd8cf1c8a. jpg');
/*!40000 ALTER TABLE `recette` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recette_allergie`
--

DROP TABLE IF EXISTS `recette_allergie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recette_allergie` (
  `recette_id` int(11) NOT NULL,
  `allergie_id` int(11) NOT NULL,
  PRIMARY KEY (`recette_id`,`allergie_id`),
  KEY `IDX_AECC7EB289312FE9` (`recette_id`),
  KEY `IDX_AECC7EB27C86304A` (`allergie_id`),
  CONSTRAINT `FK_AECC7EB27C86304A` FOREIGN KEY (`allergie_id`) REFERENCES `allergie` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AECC7EB289312FE9` FOREIGN KEY (`recette_id`) REFERENCES `recette` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recette_allergie`
--

LOCK TABLES `recette_allergie` WRITE;
/*!40000 ALTER TABLE `recette_allergie` DISABLE KEYS */;
INSERT INTO `recette_allergie` VALUES (1,2),(2,2),(3,2),(3,3);
/*!40000 ALTER TABLE `recette_allergie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recette_etapes`
--

DROP TABLE IF EXISTS `recette_etapes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recette_etapes` (
  `recette_id` int(11) NOT NULL,
  `etapes_id` int(11) NOT NULL,
  PRIMARY KEY (`recette_id`,`etapes_id`),
  KEY `IDX_FAD4FCEE89312FE9` (`recette_id`),
  KEY `IDX_FAD4FCEE4F5CEED2` (`etapes_id`),
  CONSTRAINT `FK_FAD4FCEE4F5CEED2` FOREIGN KEY (`etapes_id`) REFERENCES `etapes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_FAD4FCEE89312FE9` FOREIGN KEY (`recette_id`) REFERENCES `recette` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recette_etapes`
--

LOCK TABLES `recette_etapes` WRITE;
/*!40000 ALTER TABLE `recette_etapes` DISABLE KEYS */;
INSERT INTO `recette_etapes` VALUES (1,1),(1,2),(1,4),(2,1),(2,3),(2,4),(3,1),(3,2),(3,3),(3,4),(3,5);
/*!40000 ALTER TABLE `recette_etapes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recette_ingredient`
--

DROP TABLE IF EXISTS `recette_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recette_ingredient` (
  `recette_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  PRIMARY KEY (`recette_id`,`ingredient_id`),
  KEY `IDX_17C041A989312FE9` (`recette_id`),
  KEY `IDX_17C041A9933FE08C` (`ingredient_id`),
  CONSTRAINT `FK_17C041A989312FE9` FOREIGN KEY (`recette_id`) REFERENCES `recette` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_17C041A9933FE08C` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recette_ingredient`
--

LOCK TABLES `recette_ingredient` WRITE;
/*!40000 ALTER TABLE `recette_ingredient` DISABLE KEYS */;
INSERT INTO `recette_ingredient` VALUES (1,1),(1,2),(1,3),(1,4),(2,1),(2,2),(2,4),(3,1),(3,2),(3,3),(3,4);
/*!40000 ALTER TABLE `recette_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recette_regime`
--

DROP TABLE IF EXISTS `recette_regime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recette_regime` (
  `recette_id` int(11) NOT NULL,
  `regime_id` int(11) NOT NULL,
  PRIMARY KEY (`recette_id`,`regime_id`),
  KEY `IDX_B316888589312FE9` (`recette_id`),
  KEY `IDX_B316888535E7D534` (`regime_id`),
  CONSTRAINT `FK_B316888535E7D534` FOREIGN KEY (`regime_id`) REFERENCES `regime` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_B316888589312FE9` FOREIGN KEY (`recette_id`) REFERENCES `recette` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recette_regime`
--

LOCK TABLES `recette_regime` WRITE;
/*!40000 ALTER TABLE `recette_regime` DISABLE KEYS */;
INSERT INTO `recette_regime` VALUES (1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3);
/*!40000 ALTER TABLE `recette_regime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regime`
--

DROP TABLE IF EXISTS `regime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_AA864A7C5E237E06` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regime`
--

LOCK TABLES `regime` WRITE;
/*!40000 ALTER TABLE `regime` DISABLE KEYS */;
INSERT INTO `regime` VALUES (1,'gros'),(2,'maigre'),(3,'vegetarien');
/*!40000 ALTER TABLE `regime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regime_allergie`
--

DROP TABLE IF EXISTS `regime_allergie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regime_allergie` (
  `regime_id` int(11) NOT NULL,
  `allergie_id` int(11) NOT NULL,
  PRIMARY KEY (`regime_id`,`allergie_id`),
  KEY `IDX_CD93D88E35E7D534` (`regime_id`),
  KEY `IDX_CD93D88E7C86304A` (`allergie_id`),
  CONSTRAINT `FK_CD93D88E35E7D534` FOREIGN KEY (`regime_id`) REFERENCES `regime` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_CD93D88E7C86304A` FOREIGN KEY (`allergie_id`) REFERENCES `allergie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regime_allergie`
--

LOCK TABLES `regime_allergie` WRITE;
/*!40000 ALTER TABLE `regime_allergie` DISABLE KEYS */;
/*!40000 ALTER TABLE `regime_allergie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password`
--

DROP TABLE IF EXISTS `reset_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B9983CE5A76ED395` (`user_id`),
  CONSTRAINT `FK_B9983CE5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password`
--

LOCK TABLES `reset_password` WRITE;
/*!40000 ALTER TABLE `reset_password` DISABLE KEYS */;
INSERT INTO `reset_password` VALUES (1,26,'64a55d15458bc','2023-07-05 12:07:49'),(2,26,'64a55d390e7d7','2023-07-05 12:08:25'),(3,26,'64a5615ff416a','2023-07-05 12:26:07'),(4,26,'64a5689f9a80e','2023-07-05 12:57:03');
/*!40000 ALTER TABLE `reset_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` longtext NOT NULL COMMENT '(DC2Type:json)',
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `regime_user` varchar(255) DEFAULT NULL,
  `allergie_user` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'admin@gmail.com','$2y$13$gOm4nqnsmm1N6TTzUS0n4OZmR9kQpllHETugsrq.G1JeDqf/js9uC','[\"ROLE_USER\",\"ROLE_ADMIN\"]','yass','yass','gros,maigre','noisette','0676767676'),(17,'louloutest@ŋmail.com','$2y$13$2PkOVWTPN6zKyCoI9x1RZOmY2S0KkYRnvCkeznXj8mrqQ04i0lT3C','[\"ROLE_USER\"]','loulou','loulou','gros','noisette,chocolat','0989738646'),(18,'loulou@gmail.com','$2y$13$1bXs/t30I8fHz71Jg9PsqeN57ylOpkV.r5FpgPHvFsnBSnrjZwWwe','[\"ROLE_USER\"]','loulouyassine','yassine','gros,vegetarien,maigre','noisette,casse,fraise,chocolat','0615785012'),(19,'yassstest@gmail.com','$2y$13$3BxKs28Rf81TIIkRnoTD6.bvPrTMcSQtcGRMruxaoRuy3JF499bXa','[\"ROLE_USER\"]','yassine','rezgui','gros,vegetarien','noisette,chocolat,coca','0615254585'),(26,'yass.srgrzg@gmail.com','$2y$13$A.530wuYA5bw5Ys89OQO6O8mrwqEdSycxrHJ1XACQF/QSTDu63G7O','[\"ROLE_USER\"]','Yassine','Rezgui','gros,vegetarien','noisette,chocolat,fraise','0618135045');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_allergie`
--

DROP TABLE IF EXISTS `user_allergie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_allergie` (
  `user_id` int(11) NOT NULL,
  `allergie_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`allergie_id`),
  KEY `IDX_FE557A4AA76ED395` (`user_id`),
  KEY `IDX_FE557A4A7C86304A` (`allergie_id`),
  CONSTRAINT `FK_FE557A4A7C86304A` FOREIGN KEY (`allergie_id`) REFERENCES `allergie` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_FE557A4AA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_allergie`
--

LOCK TABLES `user_allergie` WRITE;
/*!40000 ALTER TABLE `user_allergie` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_allergie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_regime`
--

DROP TABLE IF EXISTS `user_regime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_regime` (
  `user_id` int(11) NOT NULL,
  `regime_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`regime_id`),
  KEY `IDX_CFD45141A76ED395` (`user_id`),
  KEY `IDX_CFD4514135E7D534` (`regime_id`),
  CONSTRAINT `FK_CFD4514135E7D534` FOREIGN KEY (`regime_id`) REFERENCES `regime` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_CFD45141A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_regime`
--

LOCK TABLES `user_regime` WRITE;
/*!40000 ALTER TABLE `user_regime` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_regime` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-05 16:06:37
