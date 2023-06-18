<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230617142739 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_allergie (user_id INT NOT NULL, allergie_id INT NOT NULL, INDEX IDX_FE557A4AA76ED395 (user_id), INDEX IDX_FE557A4A7C86304A (allergie_id), PRIMARY KEY(user_id, allergie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_allergie ADD CONSTRAINT FK_FE557A4AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_allergie ADD CONSTRAINT FK_FE557A4A7C86304A FOREIGN KEY (allergie_id) REFERENCES allergie (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_allergie DROP FOREIGN KEY FK_FE557A4AA76ED395');
        $this->addSql('ALTER TABLE user_allergie DROP FOREIGN KEY FK_FE557A4A7C86304A');
        $this->addSql('DROP TABLE user_allergie');
    }
}
