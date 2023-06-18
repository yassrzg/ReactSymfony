<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230615115709 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, user_avis_id INT DEFAULT NULL, avis_recette_id INT DEFAULT NULL, note INT NOT NULL, description VARCHAR(1000) NOT NULL, INDEX IDX_8F91ABF041736E95 (user_avis_id), INDEX IDX_8F91ABF065F488D0 (avis_recette_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF041736E95 FOREIGN KEY (user_avis_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF065F488D0 FOREIGN KEY (avis_recette_id) REFERENCES recette (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF041736E95');
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF065F488D0');
        $this->addSql('DROP TABLE avis');
    }
}
