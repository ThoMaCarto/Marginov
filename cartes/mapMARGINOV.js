/* 
Script codant la carte des innovations dans les territoires laboratoires de Marginov
Il s'organise en plusieurs parties:
1. paramètres généraux et habillage
2. Création et affichage de la couche contours administratifs
3. Création et affichage de la couche des innovations étudiées par Marginov
4. Mise à jour de la carte à chaque fois que l'on coche ou décoche un acteur
5. création du controleur de couches
*/

// 1. paramètres généraux et habillage
///Paramètre généraux de la carte
var map = L.map('map',
{
	maxZoom: 18,
	minZoom: 5,
	maxBounds: [
		[40, -6],
		[55, 9]
	],
});
map.setView(centerMap, zoomMap);


//création des différents niveaux d'affichage des couches: les panes
map.createPane('600');
map.getPane('600').style.zIndex = 600;
map.createPane('610');
map.getPane('610').style.zIndex = 610;
map.createPane('615');
map.getPane('615').style.zIndex = 615;
map.createPane('620');
map.getPane('620').style.zIndex = 620;
map.createPane('630');
map.getPane('630').style.zIndex = 630;
map.createPane('635');
map.getPane('635').style.zIndex = 635;

//attribution
var attribMARGINOV = '<b>Données</b> © <a href="http://www.marginov.cnrs.fr/?page_id=214">MARGINOV</a>'

//fond de carte
// création d'une couche "osmfr"
//OSM FR utilise les données OSM avec une charte graphique développé pour le territoire français 
var osmfr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
{
	attribution: '<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="http://openstreetmap.fr">OSM France</a><br>' + attribMARGINOV,
	opacity: 0.6,
	minZoom: 0,
	maxZoom: 19,
	bounds: [
		[40, -6],
		[55, 9]
	],
});

// Ajouter la couche "osmfr" à la carte		
// création d'une couche "bwLayer" un fond de carte en grisaille
var bwLayer = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
{
	attribution: '<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a><br>' + attribMARGINOV,
	opacity: 0.8,
	maxZoom: 19,
});


//échelle
L.control.scale(
{
	imperial: false,
	maxWidth: 200,
	updateWhenIdle: false
}).addTo(map);

//flèche du nord
var urlNorthArray = '<img src="aceG8oMc4.png" style="width:30px;">'
var north = L.control(
{
	position: "topleft"
});
north.onAdd = function(map)
{
	var div = L.DomUtil.create("div", );
	div.innerHTML = urlNorthArray;
	return div;
}
north.addTo(map);

//fonctions associées aux paramètres du fichier html
function filterLabo(feature) {
  if (feature.properties.labo === filtreMap) return true
}


function designFond (d){
	switch (d){
		case "gris": return bwLayer;
		case "couleurs": return osmfr;
		default: return bwLayer;
	}
}
map.addLayer(designFond (typeFond));

function displayTerritories(d){
	if(d === true) {return [map.addLayer(coucheTerritoires),map.addControl(info),];}
	else{return [map.removeLayer(coucheTerritoires),map.removeControl(info),];}
	
}

function displayPanneau(afficherPanneau){
	if(afficherPanneau === true) {[panneau.style.display='',displayFiltreActeurs(afficherFiltresActeurs),displayLegendeInitiatives(AfficherLegendeInitiatives)]}
};
displayPanneau(afficherPanneau);

function displayFiltreActeurs(afficherFiltresActeurs){
	if(afficherFiltresActeurs === true) {actors.style.display=''}
};


function displayLegendeInitiatives(AfficherLegendeInitiatives){
	if(AfficherLegendeInitiatives === true) {actors.style.display=''}
};



/*2. Création et affichage de la couche contours administratifs*/


// Fonctions de la Charte graphique. Ces fonctions définissent des paramètres d'affichage en fonction des attributs de la base de donnée
function getTerritoireColor(d)
{
	switch (d)
	{
		case "Commune":
			return "DarkViolet";
		case "EPCI":
			return "#5f72ca";
		case "PNR":
			return "#4ea547";
		case "LEADER":
			return "#f0c53e";
		case "forest":
			return "darkgreen";
		default:
			return "grey";
	}
}

function getTerritoireWeight(d)
{
	switch (d)
	{
		case "Commune":
			return 1;
		case "EPCI":
			return 1;
		case "PNR":
			return 1;
		case "LEADER":
			return 1;
		default:
			return 6;
	}
}

function getTerritoirePane(d)
{
	switch (d)
	{
		case "Commune":
			return "620";
		case "EPCI":
			return "615";
		case "PNR":
			return "610";
		case "LEADER":
			return "610";
		default:
			return "630";
	}
}

function getTerritoireOpacity(d)
{
	switch (d)
	{
		case "Commune":
			return 0;
		case "EPCI":
			return 0;
		case "PNR":
			return 0;
		case "LEADER":
			return 0;
		default:
			return true;
	}
}

/*Les fonctions suivantes permettent de modifier l'affichage d'un perimètre lorsque la souris glisse dessus*/
// affichage spécifique pour mettre en avant un élément de la couche
function highlightFeature(e, d)
{
	var layer = e.target;
	///Création du motif de ligne
	var stripes = new L.StripePattern(
	{
		height: 2,
		weight: 1,
		spaceWeight: 1,
		opacity: 0.7,
		color: getTerritoireColor(layer.feature.properties.type),
	});
	stripes.addTo(map);
	layer.setStyle(
	{
		weight: 2,
		fillPattern: stripes,
		dashArray: '',
		fillOpacity: 0.7,
	});
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge)
	{
		layer.bringToFront();
	}
	info.update(layer.feature.properties);
}

//retour à l'affichage normal
function resetHighlight(e)
{
	coucheTerritoires.resetStyle(e.target);
	info.update();
}
//fonction créant un évennement lorsque la souris glisse sur un élément de la couche
function onEachTerritoires(feature, layer)
{
	layer.on(
	{
		mouseover: highlightFeature,
		mouseout: resetHighlight,
	});
}

/*Fonctions permettant d'afficher un panneau control affichant certaines infos de l'élément*/
//Création d'un panneau control avec les infos du territoire survolé par la souris
var info = L.control();
info.onAdd = function(map)
{
	this._div = L.DomUtil.create('div', 'info'); // création d'un DIV avec la class info
	this.update();
	return this._div;
};
// mise à jour des infos à partir des propriétés de l'entité survolée
info.update = function(props)
{
	this._div.innerHTML = '<h4>Informations : </h4>' + (props ? '<b style="color: ' + getTerritoireColor(props.type) + '">' + props.nom_site + '</b>' : 'Passer le curseur sur un territoire');
};;

/*Affichage de la couche des périmètres administratifs */

var coucheTerritoires = L.geoJson(territoires,
{ //la fonction L.geoJson crée une couche layer à partir de donnée au format geojson
	filter: filterLabo,
	style: function(feature)
	{
		return {
			pane: getTerritoirePane(feature.properties.type),
			weight: getTerritoireWeight(feature.properties.type),
			color: getTerritoireColor(feature.properties.type),
			fillOpacity: getTerritoireOpacity(feature.properties.type),
			fill: true,
		};
	},
	onEachFeature: onEachTerritoires,
});
displayTerritories(afficherTerritoires)//paramètré dans le fichier HTML

/*Affichage du control Info en fonction des couches sélectionnées
le control ne s'affiche que si la couche est affichée*/

function displayInfo()
{
	if (map.hasLayer(coucheTerritoires))
	{
		info.addTo(this);
	}
	else
	{
		info.remove(this);
	}
}
map.on('overlayadd', displayInfo);
map.on('overlayremove', displayInfo);



/*3.Création et affichage de la couche des innovations étudiées par Marginov*/


/*3.1 afficher les innovations en fonction du type d'acteur coché*/

//créer un tableau contenant tous les types d'acteurs recensé typAct3
var typAct2 = [];
for (var i = 0; i < initiatives.features.length; i++)
{
	for (var e = 0; e < initiatives.features[i].properties.actors.length; e++)
	{
		var actorUnique = getCat(typAct2, initiatives.features[i].properties.actors[e]);
		if (actorUnique === undefined)
		{
			actorUnique = [initiatives.features[i].properties.actors[e]]
		}
		typAct2.push(actorUnique);
	}
}
var typAct3 = removeDuplicates(typAct2);

function removeDuplicates(d)
{
	let unique = {};
	d.forEach(function(i)
	{
		if (!unique[i])
		{
			unique[i] = true;
		}
	});
	return Object.keys(unique);
}

function getCat(cats, cat)
{
	for (var u = 0; u < cats.length; u++)
	{
		if (cats[u]["label"] === cat)
		{
			return cats[u];
		}
	}
	return;
}
///Création de la liste remplie à l'ouverture de la page
var checkboxStates = {
	Type: typAct3,
};

/*Création du panneau de commande des types d'acteurs*/

var div1 = document.getElementById('actors');

var actorscheckBox = '';
for (var i = 0; i < typAct3.length; i++)
{
	actorscheckBox += '<input class="input" id="' + typAct3[i] + '" type="checkbox" value="' + typAct3[i] + '" onclick="updateInitiativeLayer()" checked/>' + typAct3[i] + '<br>';
}
div1.innerHTML = '<h4>Type de partenaires</h4><input id="all" class="input" type="checkbox" onclick="toggle(this);updateInitiativeLayer()" checked/><b>Tout sélectionner</b><br>' 
+ actorscheckBox;



// fonction de mise à jours de la liste des filtre
function updateCheckboxStates()
{
	checkboxStates.Type.splice(0, checkboxStates.Type.length);
	//map.removeLayer(init2);	
	var checkboxes = document.querySelectorAll('#actors>.input');
	for (var i = 0; i < checkboxes.length; i++)
	{
		var check = [checkboxes[i].value];
		if (checkboxes[i].checked)
		{
			checkboxStates.Type.push(checkboxes[i].value)
		};
	};
};
//mise à jour de la liste à chaque click dans la liste à cocher

// gestion de la checkbox "all": tout sélectionner ou déselectionner en fonction du statut checked ou non
function toggle(source)
{
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	for (var i = 0; i < checkboxes.length; i++)
	{
		if (checkboxes[i] != source) checkboxes[i].checked = source.checked;
	}
}

////création d'un géojson temporaire contenant seulement les objets correspondant aux acteurs sélectionnés dans les checkboxes
var initiativesChecked = {
	"type": "FeatureCollection",
	"features": []
};
updateInitiativesChecked();
var iconclustersInit;
var initLayerTemp;


////Création d'un panneau de légende des initiatives
var div2 = document.getElementById('initiatives');
var gradesInit = ["atelier-part", "lieu-echange", "prototype-archi", "patrimoine"],
	labelsInit = ["Ateliers participatifs", "Plateforme échanges&innovations", "Prototype architectural", "Patrimoine"];
var legendeInit = '';
for (var i = 0; i < gradesInit.length; i++)
{
	legendeInit += '<div class="map-label ' + gradesInit[i] + '" style="position:relative;"><div class="map-label-content" style="font-size:14px;position:relative;border:0;background-color:rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0,0);">' + labelsInit[i] + '</div></div><br>'
}

div2.innerHTML ='<h4>Type d\'innovations</h4>'
+'<div style="display:flex;flex-direction:row;">'
+'<div style="display:flex;max-width:20px;"><div class="map-label" style="position:relative;"><div class="map-label-content">[M]</div><div class="map-label-arrow" ></div></div></div>'
+'<div style="margin : auto auto auto 6px;"><b>Experience Marginov</b></div>'
+'</div>'
+'<div style="overflow:hidden;">'+ legendeInit + '</div>';

/*Fonction affichant la couche sous la forme d'agglomérat de point (clusters)*/
function displayLayersInit()
{
	//Création des marquers agglomérats d'icones: iconclustersInit
	var iconclustersInit = L.markerClusterGroup(
	{
		maxClusterRadius: 30,
		singleMarkerMode: false,
		zoomToBoundsOnClick: true,
		spiderfyOnMaxZoom: true,
		clusterPane: '630',
		iconCreateFunction: function(cluster)
		{
			var markers = cluster.getAllChildMarkers();
			var n = markers.length;
			var e = n * 10;
			return L.divIcon(
			{
				html: n,
				className: 'mycluster',
				iconSize: L.point(30, 30)
			});
		},
	});
	////Couche d'intitatives en fonction des acteurs cochés
	var initLayerTemp = L.geoJson(initiativesChecked,
	{
		filter: filterLabo,
		pointToLayer: function(feature, latlng)
		{
			// Création de l'icone initiatives
			var iconInitiative = L.divIcon(
			{
				iconSize: null,
				html: '<div class="map-label ' + feature.properties.typecss + '"><div class="map-label-content" style="color:black;">[M]</div><div class="map-label-arrow"></div></div>'
			});
			//Création du marker
			var marker = L.marker(latlng,
			{
				icon: iconInitiative,
				pane: "635"
			});
			//caractéristiques des popup
			marker.bindPopup('<h4>' + feature.properties.name + '</h4><img src="' + feature.properties.illustre + '" width="90%"><p><b> Type d\'innovation : </b>' + feature.properties.cat + '</p><p><b>Acteurs :</b>' + feature.properties.actors + '</p><p><a href="' + feature.properties.link + '" target="_parent" >+ d\'info...</a></p>');
			//Affichage des marqueurs
			return marker;
		},
	});
	//intégration des marqueurs aux clusters
	iconclustersInit.addLayer(initLayerTemp);
	//intégration des clusters à la carte
	iconclustersInit.addTo(map);
};

//mise à jour du geoJSON temporaire 
function updateInitiativesChecked()
{
	initiativesChecked.features.splice(0, initiativesChecked.features.length);
	updateCheckboxStates();
	for (var i = 0; i < initiatives.features.length; i++)
	{
		if (initiatives.features[i].properties.actors.some(x => checkboxStates.Type.some(y => y === x)) === true)
		{
			initiativesChecked.features.push(initiatives.features[i]);
		}
	};
	return initiativesChecked;
};
// affichage de la couche des initiatives au chargement de la page
displayLayersInit();


/*4. Mise à jour de la carte à chaque fois que l'on coche ou décoche un acteur*/

//création d'une couche affichant le geojson temporaire
function updateInitiativeLayer()
{
	var initiativesChecked = {
		"type": "FeatureCollection",
		"features": []
	};
	updateInitiativesChecked();
	map.eachLayer(function(layer)
	{
		map.removeLayer(layer)
	});
	displayLayersInit();
	//Affichage du control Info en fonction des couches sélectionnées
	function displayInfo()
	{
		if (map.hasLayer(coucheTerritoires))
		{
			info.addTo(this);
		}
		else
		{
			info.remove(this);
		}
	};
	map.on('overlayadd', displayInfo);
	map.on('overlayremove', displayInfo);
	map.addLayer(designFond (typeFond)); //paramètré dans le fichier HTML
	displayTerritories(afficherTerritoires)//paramètré dans le fichier HTML
	
};



/*5. création du controleur de couches*/
/////Controleur des couches
var fond = {
	"Fond de carte en couleur": osmfr,
	"Fond de carte en grisaille": bwLayer
};
var overlays = {
	"Périmètres administratifs": coucheTerritoires,
};
//var overlays = {"Innovations": iconclustersInit};
var controlLayers = L.control.layers(fond, overlays,
{
	collapsed: false,
	position: 'bottomleft',
}).addTo(map);
