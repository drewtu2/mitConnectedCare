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
      
      }
      
    //else map.panTo(myLatlng);      
  }

  