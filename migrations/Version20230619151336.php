<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230619151336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE etapes (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recette_etapes (recette_id INT NOT NULL, etapes_id INT NOT NULL, INDEX IDX_FAD4FCEE89312FE9 (recette_id), INDEX IDX_FAD4FCEE4F5CEED2 (etapes_id), PRIMARY KEY(recette_id, etapes_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recette_etapes ADD CONSTRAINT FK_FAD4FCEE89312FE9 FOREIGN KEY (recette_id) REFERENCES recette (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette_etapes ADD CONSTRAINT FK_FAD4FCEE4F5CEED2 FOREIGN KEY (etapes_id) REFERENCES etapes (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette DROP etapes');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recette_etapes DROP FOREIGN KEY FK_FAD4FCEE89312FE9');
        $this->addSql('ALTER TABLE recette_etapes DROP FOREIGN KEY FK_FAD4FCEE4F5CEED2');
        $this->addSql('DROP TABLE etapes');
        $this->addSql('DROP TABLE recette_etapes');
        $this->addSql('ALTER TABLE recette ADD etapes VARCHAR(500) NOT NULL');
    }
}
