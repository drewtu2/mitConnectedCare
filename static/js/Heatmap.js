   /*
    * 
	* 
	* Author: Andrew Tu
	* Github: github.com/drewtu2
	*/

  var map;
  var myLatLng;
  
  // Global Map only to be used in special occasions
  var SuperSecretMap;
  
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
  
  var recList = [{name:"Toscis", location:new google.maps.LatLng(42.363424, -71.099379)},
                 {name:"Ben and Jerys", location:new google.maps.LatLng(42.348133, -71.084497)},
                 {name:"JP Licks", location:new google.maps.LatLng(42.346997, -71.088657)}];
  
  var friendList = [{name:"Mark Hunter", location:new google.maps.LatLng(42.351007, -71.084591)},
                    {name:"Paul Langton", location:new google.maps.LatLng(42.357802, -71.053808)},
                    {name:"Andrew Tu", location:new google.maps.LatLng(42.359042, -71.095111)}];
  
  var testObj = {name:"Andrew Tu", location:new google.maps.LatLng(42.359042, -71.095111)};
  
  
  $(document).ready(function(){
	
  });
  
/*
 * initGeolocation()
 * Starts the geolocation funcitons. 
 *  
 */  
  function initGeolocation() {
	  console.log("Hello world");	
	
    if (navigator && navigator.geolocation) {
    /*var watchId = navigator.geolocation.watchPosition(successCallback, 
                                                      errorCallback,
                                                      {enableHighAccuracy:true,timeout:60000,maximumAge:0});*/
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
	
    //myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	  myLatLng = new google.maps.LatLng(42.354430, -71.064871);
    // To be run the first time the callback is called. (Creates the map object)
    if(map == undefined) {
      var myOptions = {
        zoom: 14,
        center: myLatLng,
        zoomControl: true,
        mapTypeControl: false,
        scaleContro: false,
        fullscreenControl: false,
        rotateControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map_box"), myOptions);
      SuperSecretMap = map;
      addHeatmap(map);
      //setListMarkers(map, recList, "../images/wine.png");
      setListMarkers(map, friendList, "../images/friend.png");
      //setMarker(map, testObj, "../images/friend.png")
      }
      
    //else map.panTo(myLatlng);      
  }
  
  function addHeatmap(map){
	  /* Data points defined as an array of LatLng objects */
	  var heatmapData = genHeatMapData();
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        maxIntensity: 100,
        radius: 15
      });
      heatmap.setMap(map);
  }
  
  function genHeatMapData() {
	  listOfLat = filteredData.LAT
	  listOfLong = filteredData.LONG
	  //console.log(listOfLat)
	  mapData = []
	  for(var key in listOfLat) {
		  if(listOfLat.hasOwnProperty(key) && listOfLong.hasOwnProperty(key)){
			  mapData.push(loc2GoogleLoc(listOfLat[key], listOfLong[key]))
		  } else {
			  console.log("Invalid Data")
		  }

	  }
	  //mapData.push({location: myLatLng, weight: 150000})
	  
	  return mapData
	  //return mapData
  }
  
  function loc2GoogleLoc(latIn, longIn) {
	  latlng = new google.maps.LatLng(latIn, longIn)
	  //latlng = {"lat": lat, "long": long}
	  return latlng
  }
  
  function setListMarkers(map, listOfStuff, url){
	  //console.log(listOfStuff)
	  for(index in listOfStuff){
		setMarker(map, listOfStuff[index], url)  
	  }
  }
  
  function apiDropMarker(inObj) {
	  moveMap(inObj.location)
	  return setMarker(SuperSecretMap, inObj, "../images/wine.png");
  }
  
  function setMarker(map, inObj, imageUrl) {
	  //console.log(inObj)
	  var markerPlace = {
			  location: inObj.location,
			  query: inObj.name 
	  }
	  var markerOptions = {
			  title: inObj.name,
			  position: inObj.location,
			  place: markerPlace,
	    	  map: map,
	    	  animation: google.maps.Animation.DROP,
	    	  icon: imageUrl
	  }
      var marker = new google.maps.Marker(markerOptions)
	  
	  // Pop up window with more information about the printers
	  var windowOptions = {
		  content: inObj.name,
		  position: inObj.location
	  }
	  var infoWindow = new google.maps.InfoWindow(windowOptions);
	  
	  marker.addListener('click', function() {
		    infoWindow.open(map, marker);
		  });
	  return marker
  }
  
  function moveMap(location) {
	  if(location == "home"){
		  SuperSecretMap.setCenter(myLatLng)  
	  } else {
		  SuperSecretMap.setCenter(location)
	  }
  }
  
  function setMapOnAll(map) {
	    for (var i = 0; i < recList.length; i++) {
	      recMarkerList[i].setMap(map);
	    }
	  }