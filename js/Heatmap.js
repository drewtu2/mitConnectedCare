   /*
    * 
	* 
	* Author: Andrew Tu
	* Github: github.com/drewtu2
	*/

  var map;
  var myLatLng
  
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
    var watchId = navigator.geolocation.watchPosition(successCallback, 
                                                      errorCallback,
                                                      {enableHighAccuracy:true,timeout:60000,maximumAge:0});

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
	
    myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    // To be run the first time the callback is called. (Creates the map object)
    if(map == undefined) {
      var myOptions = {
        zoom: 15,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map"), myOptions);
      /* Data points defined as an array of LatLng objects */
      var heatmapData = genHeatMapData();
      console.log(heatmapData)
      console.log([1,2,3])
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        maxIntensity: 100,
        radius: 15
      });
      console.log(heatmap)
      heatmap.setMap(map);
      }
      
    //else map.panTo(myLatlng);      
  }
  
  function genHeatMapData() {
	  listOfLat = filteredData.LAT
	  listOfLong = filteredData.LONG
	  console.log(listOfLat)
	  mapData = []
	  for(var key in listOfLat) {
		  if(listOfLat.hasOwnProperty(key) && listOfLong.hasOwnProperty(key)){
			  mapData.push(loc2GoogleLoc(listOfLat[key], listOfLong[key]))
		  } else {
			  console.log("Invalid")
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

  
