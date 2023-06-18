<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230615072325 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_regime (user_id INT NOT NULL, regime_id INT NOT NULL, INDEX IDX_CFD45141A76ED395 (user_id), INDEX IDX_CFD4514135E7D534 (regime_id), PRIMARY KEY(user_id, regime_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_regime ADD CONSTRAINT FK_CFD45141A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_regime ADD CONSTRAINT FK_CFD4514135E7D534 FOREIGN KEY (regime_id) REFERENCES regime (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_regime DROP FOREIGN KEY FK_CFD45141A76ED395');
        $this->addSql('ALTER TABLE user_regime DROP FOREIGN KEY FK_CFD4514135E7D534');
        $this->addSql('DROP TABLE user_regime');
    }
}
