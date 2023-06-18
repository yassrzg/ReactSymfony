<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230614125352 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_allergie DROP FOREIGN KEY FK_FE557A4A7C86304A');
        $this->addSql('ALTER TABLE user_allergie DROP FOREIGN KEY FK_FE557A4AA76ED395');
        $this->addSql('DROP TABLE user_allergie');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649197E709F');
        $this->addSql('DROP INDEX IDX_8D93D649197E709F ON user');
        $this->addSql('ALTER TABLE user ADD roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', DROP avis_id, DROP name, DROP surname, DROP role, CHANGE email email VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_allergie (user_id INT NOT NULL, allergie_id INT NOT NULL, INDEX IDX_FE557A4A7C86304A (allergie_id), INDEX IDX_FE557A4AA76ED395 (user_id), PRIMARY KEY(user_id, allergie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_allergie ADD CONSTRAINT FK_FE557A4A7C86304A FOREIGN KEY (allergie_id) REFERENCES allergie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_allergie ADD CONSTRAINT FK_FE557A4AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74 ON user');
        $this->addSql('ALTER TABLE user ADD avis_id INT DEFAULT NULL, ADD name VARCHAR(255) NOT NULL, ADD surname VARCHAR(255) NOT NULL, ADD role VARCHAR(255) NOT NULL, DROP roles, CHANGE email email VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649197E709F FOREIGN KEY (avis_id) REFERENCES avis (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649197E709F ON user (avis_id)');
    }
}
