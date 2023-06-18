<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230617143154 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE regime_allergie (regime_id INT NOT NULL, allergie_id INT NOT NULL, INDEX IDX_CD93D88E35E7D534 (regime_id), INDEX IDX_CD93D88E7C86304A (allergie_id), PRIMARY KEY(regime_id, allergie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE regime_allergie ADD CONSTRAINT FK_CD93D88E35E7D534 FOREIGN KEY (regime_id) REFERENCES regime (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE regime_allergie ADD CONSTRAINT FK_CD93D88E7C86304A FOREIGN KEY (allergie_id) REFERENCES allergie (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE regime_allergie DROP FOREIGN KEY FK_CD93D88E35E7D534');
        $this->addSql('ALTER TABLE regime_allergie DROP FOREIGN KEY FK_CD93D88E7C86304A');
        $this->addSql('DROP TABLE regime_allergie');
    }
}
