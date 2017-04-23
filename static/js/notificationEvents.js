var recList = [{name:"Toscis", location:new google.maps.LatLng(42.363424, -71.099379)},
                 {name:"Ben and Jerys", location:new google.maps.LatLng(42.348133, -71.084497)},
                 {name:"JP Licks", location:new google.maps.LatLng(42.346997, -71.088657)}];
var count = 0;
var recMarkerList= []

function handleNotification(message){
	
	
	if (message == "displayOn") {
		
    } else if (message == "displayOff") {

    } else if (message == "dropLocation") {
    	index = count
    	recMarkerList.push(apiDropMarker(recList[index]))
    	
    	if (count == recList.length - 1){
    		count = 0; 
    	} else{
    		count = count + 1;	
    	}
    } else if (message == "removeMarkers") {
    	setMapOnAll(null);
    	recMarkerList= []
    }
}

function setMapOnAll(map) {
    for (var i = 0; i < recList.length; i++) {
      recMarkerList[i].setMap(map);
    }
  }