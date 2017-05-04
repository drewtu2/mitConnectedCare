/*
 * MIT Connected Care Hackathon 2017
 * April 2017
 * Author: Andrew Tu
 * Github: github.com/drewtu2
 */

/*
 * JS that handles creation of heatmap and all other map related functions
 */

// Global Map only to be used in special occasions
var SuperSecretMap;

var map;
var myLatLng;

/*
 * List of Friends
 * [{name:"John Smith", location:(0,0)},
 * {name:"John Smith", location:(0,0)},
 * {name:"John Smith", location:(0,0)}]
 */

/*
 * List of Recommendations  
 * [{name:"Ben and Jerys", location:(0,0)},
 * {name:"Ben and Jerys", location:(0,0)},
 * {name:"Ben and Jerys", location:(0,0)}]
 */

// List of recommendations given by the friends (test data)
var recList = [ {
	name : "Toscis",
	location : new google.maps.LatLng(42.363424, -71.099379)
}, {
	name : "Ben and Jerys",
	location : new google.maps.LatLng(42.348133, -71.084497)
}, {
	name : "JP Licks",
	location : new google.maps.LatLng(42.346997, -71.088657)
} ];
// List of friends that are near by (test data)
var friendList = [ {
	name : "Mark Hunter",
	location : new google.maps.LatLng(42.351007, -71.084591)
}, {
	name : "Paul Langton",
	location : new google.maps.LatLng(42.357802, -71.053808)
}, {
	name : "Andrew Tu",
	location : new google.maps.LatLng(42.359042, -71.095111)
} ];
// A single friend who is nearby (test data)
var testObj = {
	name : "Andrew Tu",
	location : new google.maps.LatLng(42.359042, -71.095111)
};

$(document).ready(function() {

});

/*
 * initGeolocation()
 * Starts the geolocation function
 * Call back kicks off map creation.   
 */
function initGeolocation() {
	console.log("Hello world");

	if (navigator && navigator.geolocation) {
		// Have map track current position, update continuously
		/*var watchId = navigator.geolocation.watchPosition(successCallback, 
		                                              errorCallback,
		                                              {enableHighAccuracy:true,timeout:60000,maximumAge:0});*/
		// Just initiate with current position
		var watchId = navigator.geolocation.getCurrentPosition(successCallback,
				errorCallback);

	} else {
		console.log('Geolocation is not supported');
	}
}

function errorCallback() {
	console.log("Error with locaiton tracking...")
}

/*
 * Callback function for the navigator.geolocation.watchPosition() function. 
 */
function successCallback(position) {

	// Initiate map with my current position
	//myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	//Initiate map centered on Boston Commons (better for demonstration purposes)
	myLatLng = new google.maps.LatLng(42.354430, -71.064871);

	// To be run the first time the callback is called. (Creates the map object)
	if (map == undefined) {

		var myOptions = {
			zoom : 14,
			center : myLatLng,
			zoomControl : true,
			mapTypeControl : false,
			scaleControl : false,
			fullscreenControl : false,
			rotateControl : false,
			streetViewControl : false,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}

		// Create the actual map and place on page
		map = new google.maps.Map(document.getElementById("map_box"), myOptions);
		// Create the global map so other functions can access map function 
		SuperSecretMap = map;

		addHeatmap(map);

		// Add the nearby friends to the map (demo data)
		setListMarkers(map, friendList, "../images/friend.png");

		//setMarker(map, testObj, "../images/friend.png")
		//setListMarkers(map, recList, "../images/wine.png");
	}
	//else map.panTo(myLatlng);      
}

/*
 * Produces the heatmap from the map object and the json of crime data.
 */
function addHeatmap(map) {
	/* Data points defined as an array of LatLng objects */
	var heatmapData = genHeatMapData();
	var heatmap = new google.maps.visualization.HeatmapLayer({
		data : heatmapData,
		maxIntensity : 100,
		radius : 15
	});
	heatmap.setMap(map);
}

/*
 * Converts the json data into a list of Google Locations
 */
function genHeatMapData() {
	listOfLat = filteredData.LAT
	listOfLong = filteredData.LONG
	//console.log(listOfLat)
	mapData = []
	for ( var key in listOfLat) {
		if (listOfLat.hasOwnProperty(key) && listOfLong.hasOwnProperty(key)) {
			mapData.push(loc2GoogleLoc(listOfLat[key], listOfLong[key]))
		} else {
			console.log("Invalid Data")
		}

	}
	//mapData.push({location: myLatLng, weight: 150000})

	return mapData
}

/*
 * Converts a Lat and Lng into a Google LatLng
 */
function loc2GoogleLoc(latIn, longIn) {
	latlng = new google.maps.LatLng(latIn, longIn)
	//latlng = {"lat": lat, "long": long}
	return latlng
}

/*
 * Plots a list of Objects on a given map with the given image as the marker icon
 */
function setListMarkers(map, listOfStuff, imgUrl) {
	//console.log(listOfStuff)
	for (index in listOfStuff) {
		setMarker(map, listOfStuff[index], imgUrl)
	}
}

/*
 * Drops a specified recommendation object onto the map. Triggered by the dashboard buttons. 
 * Uses with wine glass marker.
 */
function apiDropMarker(inObj) {
	moveMap(inObj.location)
	return setMarker(SuperSecretMap, inObj, "../images/wine.png");
}

/*
 * Places an object on a given map with a given image url as the marker. 
 */
function setMarker(map, inObj, imageUrl) {
	//console.log(inObj)
	var markerPlace = {
		location : inObj.location,
		query : inObj.name
	}
	var markerOptions = {
		title : inObj.name,
		position : inObj.location,
		place : markerPlace,
		map : map,
		animation : google.maps.Animation.DROP,
		icon : imageUrl
	}
	var marker = new google.maps.Marker(markerOptions)

	// Pop up window with more information about the printers
	var windowOptions = {
		content : inObj.name,
		position : inObj.location
	}
	var infoWindow = new google.maps.InfoWindow(windowOptions);

	marker.addListener('click', function() {
		infoWindow.open(map, marker);
	});
	return marker
}

/*
 * Move map to a specified location. 
 */
function moveMap(location) {
	if (location == "home") {
		SuperSecretMap.setCenter(myLatLng)
	} else {
		SuperSecretMap.setCenter(location)
	}
}

/*
 * Associates a map to a list of markers.
 */
function setMapOnAll(map) {
	for (var i = 0; i < recList.length; i++) {
		recMarkerList[i].setMap(map);
	}
}