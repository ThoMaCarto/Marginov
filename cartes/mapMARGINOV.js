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
	maxZoom: maxZoom,
	minZoom: minZoom,
	maxBounds: [
		[40, -6],
		[55, 9]
	],
});
//map.setView(centerMap, zoomMap); calculer automatiquement à partir du centroide de la couche territoires



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
	opacity: 0.5,
	minZoom: minZoom,
	maxZoom: maxZoom,
	bounds: [
		[40, -6],
		[55, 12]
	],
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
//filtrer les territoires-laboratoires affichés
function filterLabo(feature) {
  if (filtreMap.includes(feature.properties.labo)) return true
}

//sélectionner le type de fond de carte
function designFond (d){
	switch (d){
		case "gris": return osmfr;
		case "couleurs": return osmfr;
		default: return osmfr;
	}
}
map.addLayer(designFond (typeFond));

//Afficher la couche de périmètres administratifs
function displayTerritories(d){
	if(d === true) {return [map.addLayer(coucheTerritoires),map.addControl(info),];}
	else{return [map.removeLayer(coucheTerritoires),map.removeControl(info),];}
	
}

//Afficher la couches des lieux clés
function displayLieuxcles(d){
	if(d === true) {return [map.addLayer(iconclustersLieuxCles),map.addControl(info),];}
	else{return [map.removeLayer(iconclustersLieuxCles),map.removeControl(info),];}
	
}



//Afficher le panneau latéral
function displayPanneau(afficherPanneau){
	if(afficherPanneau === true) {[panneau.style.display='',displayFiltreActeurs(afficherFiltresActeurs),displayLegendeInitiatives(AfficherLegendeInitiatives)]}
};
displayPanneau(afficherPanneau);

//afficher le filtre des acteurs
function displayFiltreActeurs(afficherFiltresActeurs){
	if(afficherFiltresActeurs === true) {actors.style.display='';}
};

//affichezr la légende des initiatives
function displayLegendeInitiatives(AfficherLegendeInitiatives){
	if(AfficherLegendeInitiatives === true) {initiativeLegend.style.display='';}
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
		case "futurPNR":
			return "#4ea547";
		case "Pays":
			return "#4ea547";
		case "LEADER":
			return "#f0c53e";
		case "ZONE":
			return " #f0c53e ";
		case "CD":
			return "#79c6c0";
		case "CR":
			return "#79c6c0";
		case "InfraEPCI":
			return "#5f72ca";
			
		default:
			return "red";
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
		case "futurPNR":
			return 1;
		case "Pays":
			return 1;
		case "LEADER":
			return 3;
		case "ZONE":
			return 3;
		case "CD":
			return 1;
		case "CR":
			return 1;
		case "InfraEPCI":
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
			return "615";
		case "futurPNR":
			return "620";
		case "Pays":
			return "615";
		case "LEADER":
			return "610";
		case "ZONE":
			return "630";
		case "CD":
			return "610";
		case "CR":
			return "610";
		case "InfraEPCI":
			return "620";
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
		case "futurPNR":
			return 0;
		case "Pays":
			return 0;
		case "LEADER":
			return 0;
		case "ZONE":
			return 0;
		case "InfraEPCI":
			return 0;
		default:
			return 0;
	}
}

/*Les fonctions suivantes permettent de modifier l'affichage d'un perimètre lorsque la souris glisse dessus*/
// affichage spécifique pour mettre en avant un élément de la couche
function highlightFeature(e)
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

/*Affichage de la couche des lieux clés */

var couchelieuxcles = L.geoJson(lieuxCles,
{ //la fonction L.geoJson crée une couche layer à partir de donnée au format geojson
	filter: filterLabo,
	pointToLayer: function(feature, latlng)
		{
			// Création de l'icone initiatives
			var iconInitiative = L.divIcon(
			{
				iconSize: null,
				html: '<div class="map-label ' + feature.properties.label + ' '+ feature.properties.rang +'"><div class="map-label-content" style="color:black;">'+feature.properties.label+'</div><div class="map-label-arrow"></div></div>'
			});
			//Création du marker
			var marker = L.marker(latlng,
			{
				icon: iconInitiative,
				pane: "630"
			});
			//caractéristiques des popup
			marker.bindPopup('<h4>'+ feature.properties.type +' : ' + feature.properties.nom_site + '</h4><p></p><b>Adresse </b>: '+feature.properties.adresse +'<br/>'+feature.properties.commune+' ('+feature.properties.cp+')<p><a href="' + feature.properties.web + '" target="_blank" >'+feature.properties.web+'</a></p>');
			//Affichage des marqueurs
			return marker;
		},
});

var iconclustersLieuxCles = L.markerClusterGroup(
	{
		maxClusterRadius: 30,
		singleMarkerMode: false,
		zoomToBoundsOnClick: true,
		showCoverageOnHover: true,
		spiderfyOnMaxZoom: true,
		clusterPane: '635',
		iconCreateFunction: function(cluster)
		{
			var markers = cluster.getAllChildMarkers();
			var n = markers.length;
			var e = n * 6;
			var f = e;
			return L.divIcon(
			{
				html: '<p style="line-height:'+f+'px;margin:auto;">'+markers.length+'</p>',
				className: 'mycluster',
				iconSize: L.point(e, e)
			});
		},
	});

iconclustersLieuxCles.addLayer(couchelieuxcles);

///paramètrage de la vue dela carte
var centerMaptest = [coucheTerritoires.getBounds().getCenter().lat,coucheTerritoires.getBounds().getCenter().lng];
//si le centerMap = auto est auto alros centre de gravité de la couche territoires, sinon utilisation de la valeur de centermap
function setMapCenter (centerMap){
	if (centerMap === "auto"){return centerMaptest;}else{return centerMap;}
}
map.setView(setMapCenter (centerMap), zoomMap);



displayLieuxcles(afficherLieuxcles)//paramètré dans le fichier HTML
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

var initSelect=[];

for (var i = 0; i < initiatives.features.length; i++){
	if (filtreMap.includes(initiatives.features[i].properties.labo)){
			initSelect.push(initiatives.features[i].properties.actors)
	}
}

for (var j=0;j<initSelect.length;j++){
	for(var e=0;e<initSelect[j].length;e++){
		var iterator = initSelect[j].values();
		for (let elements of iterator) { 
			typAct2.push(elements);
			
		} 
		
	}
	
}


var typAct3 = removeDuplicates(typAct2);
typAct3.sort();

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
+ actorscheckBox+'<br>';



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

//créer un tableau contenant tous les types d'initiatives recensées et présentent sur la carte
var labelsInit0 = [];

for (var i = 0; i < initiatives.features.length; i++)
{	
	if (filtreMap.includes(initiatives.features[i].properties.labo)){
		//if (initiatives.features[i].properties.cat !== undefined)
		//	{
				labelsInit0.push(initiatives.features[i].properties.cat);
		//	}
		 	
	}
}

var labelsInit = removeDuplicates(labelsInit0);

//idem pour le typeCSS

var gradesInit0 = [];

for (var i = 0; i < initiatives.features.length; i++)
{
	if (filtreMap.includes(initiatives.features[i].properties.labo)){
		//if (initiatives.features[i].properties.typecss !== undefined)
		//	{
				gradesInit0.push(initiatives.features[i].properties.typecss);
		//	}
	}
}

var gradesInit = removeDuplicates(gradesInit0);



var div2 = document.getElementById('initiativeLegend');
//var labelInit = listUniqueCat();
 //var gradesInit = listUniquetypeCSS(typecss);
 
//var gradesInit = ["atelier-part", "lieu-echange", "prototype-archi", "patrimoine","reseau","med-paysage"],
//	labelsInit = ["Ateliers participatifs", "Dispositif multi-acteur d'accompagnement des innovations", "Prototype architectural", "Patrimoine", "Mise en réseau d'acteurs", "Médiation paysagère"];
var legendeInit = '';
for (var i = 0; i < gradesInit.length; i++)
{
	legendeInit += '<div class="legend-init '+ gradesInit[i] +'-color-legend">' + labelsInit[i] + '</div>'
}

div2.innerHTML ='<h4>Type d\'innovations</h4>'
+'<div style="display:flex;flex-direction:row;">'
+'<div style="display:flex;max-width:100%;"><div class="map-label" style="position:relative;"><div class="map-label-content">[M]</div><div class="map-label-arrow" ></div></div></div>'
+'<div style="margin : auto auto auto 6px;"><b>Experience Marginov</b></div>'
+'</div>'
+'<div style="max-width:200px;">'+ legendeInit + '</div>';

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
		clusterPane: '635',
		iconCreateFunction: function(cluster)
		{
			var markers = cluster.getAllChildMarkers();
			var n = markers.length;
			var e = n * 6;
			var f = e;
			return L.divIcon(
			{
				html: '<p style="line-height:'+f+'px;margin:auto;">'+markers.length+'</p>',
				className: 'mycluster',
				iconSize: L.point(e, e)
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
				html: '<div class="map-label ' + feature.properties.typecss + ' '+ feature.properties.rang +'"><div class="map-label-content" style="color:black;">'+feature.properties.label+'</div><div class="map-label-arrow"></div></div>'
			});
			//Création du marker
			var marker = L.marker(latlng,
			{
				icon: iconInitiative,
				pane: "630"
			});
			//caractéristiques des popup
			marker.bindPopup('<h4>' + feature.properties.name + '</h4><img src="' + feature.properties.illustre + '" width="90%"><p><b> Type d\'innovation : </b>' + feature.properties.cat + '</p><p><b>Acteurs :</b>' + feature.properties.actors + '</p><p><a href="' + feature.properties.link + '" target="'+feature.properties.target+'" >+ d\'info...</a></p>');
			//Affichage des marqueurs
			return marker;
		},
	});
	//intégration des marqueurs aux clusters
	iconclustersInit.addLayer(initLayerTemp);
	//intégration des clusters à la carte
	//Afficher la couche des initiatives
	//si paramètré dans le HTML
	function displayInitiatives(d){
		if(d === true) {return map.addLayer(iconclustersInit);}
		else{return map.removeLayer(iconclustersInit);}
	}
	displayInitiatives(afficherInitiatives);//paramètré dans le fichier HTML
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
	dispalyLieuxcles(afficherLieuxcles)//paramètré dans le fichier HTML
	displayInitiatives(afficherInitiatives)//paramètré dans le fichier HTML
	
};



/*5. création du controleur de couches*/
/////Controleur des couches
var fond = {
	"Fond de carte en couleurs": osmfr,
	//"Fond de carte en grisaille": bwLayer
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

//Création de la minimap de localisation
var osmMiniMap = new L.TileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {minZoom: 0, maxZoom: 18, attribution: attribMARGINOV });
var miniMap = new L.Control.MiniMap(osmMiniMap, { toggleDisplay:true, minimized: minimizeMinimap,zoomLevelOffset:-5,width:150,height:150, }).addTo(map);

