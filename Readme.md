# Entreposage des cartes interactives pour le programme de recherche MARGINOV et gestion de versions

Cartes accessibles sur : https://thomacarto.github.io/Marginov/cartes/ [nom du fichier]

Cartographie interactive : ©[Thomas Maillard](https://cv.archives-ouvertes.fr/thomas-maillard "CV_T-Maillard") 

## Programme Marginov


**MARGINOV – Créativités et innovations socio-spatiales dans les territoires de marge (région Nouvelle-Aquitaine). États des lieux, expérimentations et propositions**

CNRS Passages (UMR 5319) financé par la région Nouvelle-Aquitaine et coordonnée par B. Davasse.

L’objectif général du projet MARGINOV est d’interroger les différentes manières d’habiter les lieux, d’aménager les espaces et de gérer les environnements et les paysages dans les territoires en marge de la Région Nouvelle-Aquitaine. La principale hypothèse sur laquelle repose le projet considère que ces territoires, trop souvent regardés de manière négative, sont (ou sont susceptibles d’être) le lieu d’initiatives et de pratiques socio-spatiales faisant preuve d’inventivité.

## paramètrage des cartes.

Pour créer une nouvelle carte et la paramètrer, il suffit de faire une copie du fichier cartes/index.html et de modifier les paramètres situés dans le script du footer.

~~~~
var zoomMap = 8; /* échelle régionale = 8, échelle locale = 16*/
var centerMap = "auto";/*[44.4122, -0.5603];coordonnées du centre de la carte (ex. Moustey = [44.35622,-0.76433]) si  "auto" le centre de la carte sera le centroide de la couche territoires*/
var filtreMap = ["Haute-Lande"]; /*filtrage des éléments affiché: tous les élements ou seulement un territoire laboratoire: ex["Medoc","Creuse","Haute-Lande"]*/
var typeFond = "gris";/* apparence du fond de carte : "gris" ou "couleurs"*/
var afficherTerritoires = true; /*afficher les périmètres administratifs ou non*/
var afficherPanneau = false; /*afficher le panneau d'information latéral ou non. Si false, alors les deux paramètres suivants seront invisibles.*/
var afficherFiltresActeurs = false; /*afficher le panneau permettant de filtrer les initiatives par types d'acteurs*/
var AfficherLegendeInitiatives = false; /*afficher les panneau de légende des types d'initiatives*/
~~~~


## Prototype de carte n°1: Territoire Haute-Lande

Carte présentant les expérimentations menées dans la Haute-Lande par les chercheurs de Marginov et leurs partenaires. Cette carte permet de filtrer les expérimentations affichées en fonction des acteurs qui y participent. Chaque expérimentation est symbolisé par une épingle sur la carte. Lorsque l'on clique sur l'épingle un pop-up s'affiche et donne accès à plus d'informations (une page web spécifique). Cette carte sera intégré sous forme d'iframe au site internet de MARGINOV géré par wordpress.

**Lien vers la carte :** https://thomacarto.github.io/Marginov/cartes/hautelande_map_filtre_acteurs.html




