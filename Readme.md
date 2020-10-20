# Entreposage des cartes interactives pour le programme de recherche MARGINOV et gestion de versions

Cartes accessibles sur : https://thomacarto.github.io/Marginov/cartes/ [nom du fichier]

Cartographie interactive : ©[Thomas Maillard](https://cv.archives-ouvertes.fr/thomas-maillard "CV_T-Maillard") 

## Programme Marginov


**MARGINOV – Créativités et innovations socio-spatiales dans les territoires de marge (région Nouvelle-Aquitaine). États des lieux, expérimentations et propositions**

CNRS Passages (UMR 5319) financé par la région Nouvelle-Aquitaine et coordonnée par B. Davasse.

L’objectif général du projet MARGINOV est d’interroger les différentes manières d’habiter les lieux, d’aménager les espaces et de gérer les environnements et les paysages dans les territoires en marge de la Région Nouvelle-Aquitaine. La principale hypothèse sur laquelle repose le projet considère que ces territoires, trop souvent regardés de manière négative, sont (ou sont susceptibles d’être) le lieu d’initiatives et de pratiques socio-spatiales faisant preuve d’inventivité.

## paramètrage des cartes.

Les cartes interactives sont constituées de 5 fichiers:
- les 2 bases de données géographiques en format geojson : territoires (périmètres des partenaires institutionnels) et initiatives(points de localisation des innovations accompagnées par Marginov),
- Le script général de la carte : mapMarginov.js,
- le fichier CSS contenant la feuille de style,
- Un fichier HTML contenant la mise en page et les paramètres de base de la carte.

Pour créer une nouvelle carte et la paramètrer, il suffit de faire une copie du fichier cartes/map_default.html et de modifier les paramètres situés dans le script du footer. Les valeurs par défaut sont:

~~~~
var zoomMap = 8;                        /* échelle régionale = 8, échelle locale = 16*/
var minZoom = 5;                        //zoom minimum par défaut mettre 5
var maxZoom = 18;                       //zoom maximum par défaut mettre 18
var centerMap = "auto";                 /* si  "auto" le centre de la carte sera le centroide de la couche territoires, sinon insérer coord.[lat,lng]*/
var filtreMap = ["Haute-Lande"];        /*liste des territoires laboratoire a afficher*/
var typeFond = "gris";                  /* apparence du fond de carte : "gris" ou "couleurs"*/
var afficherTerritoires = false;        /*afficher les périmètres administratifs ou non*/
var afficherInitiatives = true;         /*afficher ou non les puces des initiatives*/
var afficherPanneau = true;             /*afficher le panneau d'information latéral ou non.*/
var afficherFiltresActeurs = true;      /*afficher le panneau permettant de filtrer les initiatives par types d'acteurs*/
var AfficherLegendeInitiatives = true;  /*afficher les panneau de légende des types d'initiatives*/
~~~~
## Carte générale représentant l'ensemble des éléments cartographiés

**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/map_test_all.html


**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/map_default.html

## Prototypes de cartes n°1: Territoire Haute-Lande

Carte présentant les expérimentations menées dans la Haute-Lande par les chercheurs de Marginov et leurs partenaires. Cette carte permet de filtrer les expérimentations affichées en fonction des acteurs qui y participent. Chaque expérimentation est symbolisée par une épingle sur la carte. Lorsque l'on clique sur l'épingle un pop-up s'affiche et donne accès à plus d'informations (une page web spécifique). Cette carte sera intégré sous forme d'iframe au site internet de MARGINOV géré par wordpress.

**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/hautelande_map_filtre_acteurs.html


**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/hautelande_map-territoire.html


## Prototypes de cartes n°2: Territoire Médoc
**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/medoc_map_filtre_acteurs.html


**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/medoc_map_territoires.html

## Prototypes de cartes n°3: Territoire Haute-Gironde

**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/hautegironde_map_filtre_acteurs.html


**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/hautegironde_map_territoires.html

## Prototypes de cartes n°4 : Territoire Creuse

**Lien vers la carte des innovations du département :** https://thomacarto.github.io/Marginov/cartes/Creuse_map_CDepartt.html


**Lien vers la carte des innovations du Pays de Combraille en Marche :** https://thomacarto.github.io/Marginov/cartes/Creuse_map_PaysCEM.html


**Lien vers la carte des tiers lieux du réseau TELA :** https://thomacarto.github.io/Marginov/cartes/Creuse_map_TELA.html


**Lien vers la carte des autres tiers lieux et lieux hybrides de Creuse:** https://thomacarto.github.io/Marginov/cartes/Creuse_map_lieuxhybrides.html


**Lien vers la carte de base :** https://thomacarto.github.io/Marginov/cartes/Creuse_map_territoire.html







