var recList = [{name:"Toscis", location:new google.maps.LatLng(42.363424, -71.099379)},
                 {name:"Ben and Jerys", location:new google.maps.LatLng(42.348133, -71.084497)},
                 {name:"JP Licks", location:new google.maps.LatLng(42.346997, -71.088657)}];
var count = 0;
var recMarkerList= [];
var currentNotification;
var faceBank = {};

function handleNotification(message){
	activateDog()
	if (message == "center") {
    	moveMap("home");
    } else if (message == "danger") {
		// Alert to Danger!
    	notif = createNotif("Warning", "You are nearing a high crime area!", "../images/warning64.png")
    	activateNotif("notificationarea", notif)
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
    } else {// is a facedata from message!
    	jsonstuff = JSON.parse(message); 
    	addToFacebank(jsonstuff["data"][0], "", jsonstuff["data"][1])
	}
}

function activateDog(){
	document.getElementById("dog").src="../images/dogmoving.gif";
	window.setTimeout(deactivateDog, 5000);
}

function deactivateDog(){
	document.getElementById("dog").src="../images/dogstatic.png";
}

function activateNotif(id, notifModel){
	document.getElementById(id).appendChild(viewNotif(notifModel));
	window.setTimeout(function(){deactivateNotif(id)}, 5000);
}

function deactivateNotif(id){
	document.getElementById(id).appendChild(emptyNotif);
}

/* 
 * A notification is a
 * {
 * 	title:<string>,
 * 	description:<string>,
 * 	url:<url>
 * }
 */

/*
 * Adds/updates a person to the faceBank
 */
function addToFacebank(name, descripion, url){
	switch(name) {
    case "Andrew":
    	descripion = "Northeastern Student"
        break;
    case "Mark":
    	descripion = "Northeastern Student"
        break;
    case "Paul":
    	descripion = "Northeastern Student"
        break;
    case "Nick":
    	descripion = "Northeastern Student"
        break;
    case "Meg":
    	descripion = "MIT Design student and Mentor"
        break;
    case "Federico":
    	descripion = "Director of MIT Media Labs"
        break;
    default:
    	descripion = "New Challenger!"
	}
	faceBank[name] = createNotification(name, description, url);
}

/*
 * Creates and returns a notification object
 */
function createNotification(title, description, url){
	obj = {"title":title, 
			"description": description,
			"url": url}
	
	return obj
}

function displayFacebank(){
	faceBank.forEach(function(value, index, array){displayFace(value)})
}

//TODO: Finish this function
function viewNotif(notifModel)
{
	notifModel["title"],
	notifModel["description"],
	notifModel["url"]
}