
# Mon Projet

Ceci est un projet de site pour une diététicienne Sandrine Coupart pour une évaluation Studi.

## Fonctionnalités demandées

- L'administrateur peut créer des recettes et les afficher.
- Autoriser un visiteur à voir les recettes ou non.
- Crée / Enregistrer un patient
- Le patient peut se connecter.
- Il peut également submit un avis ( maximum ) pour chaque recette.
- Accès à son compte pour modifier certaines informations.
- Les patients/visiteurs peuvent contacter l’administrateur.

## Administrateur

Le compte administrateur a été créé avec les identifiants suivants :

- Email : admin@gmail.com
- Mot de passe : HellBoy6!

## Prérequis

- PHP 8.0 minimum
- Symfony 6
- MariaDB
- Composer
- Bundle React/Symfony
- Npm Install



## Installation du projet en local

1. Cloner le projet à partir du dépôt GitHub :

git clone https://github.com/yassrzg/ReactSymfony.git

2. S'assurer d'être connecté à Internet pour que l'API d'envoi de mails fonctionne correctement.





## Base de données

J'ai inclus un export de ma base de données que j'ai utilisé pour mettre en ligne le site. Si vous souhaitez l'utiliser, vous pouvez trouver le fichier `export.sql` dans le dépôt.

Crée un utilisateur , une BDD , donner tous les droits à l’utilisateur.

-Pour utiliser ce fichier, créez une base de données dans votre environnement local :

mysql -u username -p database_name < export.sql

Exécutez cette commande à la racine de votre projet en remplaçant `username` par le nom de votre utilisateur de base de données et `database_name` par le nom de votre base de données.


Le lien vers le site local est : http://dietestudi.fr/


## Espace administrateur

Une fois connecté en tant qu'administrateur, vous aurez accès à un bouton permettant d'accéder à l'espace administrateur.

Lors de la création d'une Recette, l'administrateur doit respecter les prérequis suivants :

- Créez des allergies / régime / étapes / ingrédients.
- Pour afficher les recettes au patient uniquement , cocher la cache RecetteUser.

Avis:
- L'administrateur a accès au avis décerner à chaque recette, sachant que chaque utilisateur peut submit 1 seul avis par recette , une note moyenne de tous les avis pour chaque recette est calculer pour être afficher lors de l’affichage de toutes les recettes.