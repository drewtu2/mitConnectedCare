/*
 * MIT Connected Care Hackathon 2017
 * April 2017
 * Author: Andrew Tu
 * Github: github.com/drewtu2
 */

/* Handles the display of notification components and facebank components*/

// Some global variables....
// Demo data to pull from for recommendations (Ice cream places nearby)
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
var count = 0;
var recMarkerList = [];
var currentNotification;
var faceBank = {};

// Handle a notification message passed in from the sockets.
function handleNotification(message) {
	activateDog()
	try {
		if (message == "center") {
			moveMap("home");
		} else if (message == "danger") {
			// Alert to Danger!
			notif = createNotification("Warning",
					"You are nearing a high crime area!",
					"../images/warning64.png")
			activateNotif("notificationarea", notif)
		} else if (message == "food") {
			index = count
			newMarker = apiDropMarker(recList[index])
			recMarkerList.push(newMarker)
			notif = createNotification("Try this!",
					"Mom thought you might be interested in some ice-cream!",
					"../images/ice-cream.png")
			activateNotif("notificationarea", notif)
			if (count == recList.length - 1) {
				count = 0;
			} else {
				count = count + 1;
			}
		} else if (message == "weather") {
			notif = createNotification("Weather Alert!",
					"Looking a little Rainy today!", "../images/cloud.png")
			activateNotif("notificationarea", notif)
		} else if (message == "removeMarkers") {
			setMapOnAll(null);
			recMarkerList = []
		} else if (message == "removeFacebank") {
			wipeFacebank();
		} else if (message == "homeAlert") {
			notif = createNotification("Home Alert!",
					"Garage door just opened!", "../images/house.png")
			activateNotif("notificationarea", notif)
		} else if (message == "childAlert") {
			notif = createNotification("Jacob's Home",
					"Jacob just got home from school!", "../images/boy.png")
			activateNotif("notificationarea", notif)
		} else if (message == "displayManual") {
			displayFacebank();
		} else if (message.substring(0, 12) == "image_match_") {// is a facedata
																// from message!
			console.log("ELSE CASE: " + message)
			// jsonstuff = JSON.parse(message);
			// addToFacebank(jsonstuff["data"][0], "", jsonstuff["data"][1])
			addToFacebank(message.substring(12))
			displayFacebank();
			/*
			 * window.setTimeout(displayFacebank, 3000);
			 * window.setTimeout(displayFacebank, 5000);
			 * window.setTimeout(displayFacebank, 7000);
			 */
		}
	} catch (error) {
		console.log(error);
	}
}

/* Cause Mr. Puggles to run around in a circle. Stop after 5 seconds */
function activateDog() {
	document.getElementById("dog").src = "../images/dogmoving.gif";
	window.setTimeout(deactivateDog, 5000);
}
// Cause Mr. Puggles to stand still.
function deactivateDog() {
	document.getElementById("dog").src = "../images/dogstatic.png";
}

// Display a notifcation on the screen for 10 seconds before disappearing.
function activateNotif(id, notifModel) {
	console.log(id);
	document.getElementById(id).innerHTML = viewNotif(notifModel);
	window.setTimeout(function() {
		deactivateNotif(id)
	}, 10000);
}

// Cause notification to disappear.
function deactivateNotif(id) {
	document.getElementById(id).innerHTML = "";
}

/*
 * A notification is a { title:<string>, description:<string>, url:<url> }
 */

/*
 * Creates and returns a notification object
 */
function createNotification(title, description, url) {
	obj = {
		"title" : title,
		"description" : description,
		"url" : url
	}

	return obj
}

/*
 * Adds/updates a person to the faceBank Also uses super hacky method of
 * preventing browser from caching photos
 */
function addToFacebank(name) {

	// <Prevent browser caching>
	max = 9999999999999999;
	min = 1000000000000000;
	var id = Math.floor(Math.random() * (max - min)) + min;
	var url = "../data/facebank/" + name + "Banked.jpg?id=" + id;
	// </ Prevent Browser Caching>

	// Hard Code a bunch of descriptions in for the people found by the face
	// tracker.
	description = "";
	switch (name) {
	case "Andrew":
		description = "Northeastern Student"
		break;
	case "Mark":
		description = "Northeastern Student"
		break;
	case "Paul":
		description = "Northeastern Student"
		break;
	case "Nick":
		description = "Northeastern Student"
		break;
	case "Meg":
		description = "MIT Design student and Mentor"
		break;
	case "Federico":
		description = "Director of MIT Media Labs"
		break;
	default:
		descripion = "New Challenger!"
	}
	faceBank[name] = createNotification(name, description, url);
	console.log("ADDED TO FACEBANK");
}

/*
 * Write the facebank to the website (Display it on the screen)
 */
function displayFacebank() {
	var fullString = "";
	for ( var key in faceBank) {
		fullString += viewNotif(faceBank[key])
		document.getElementById("facebankContainer").innerHTML = fullString;
	}
}

/*
 * Remove the facebank notifications. (Erase HTML on website, wipe facebank
 * object)
 */
function wipeFacebank() {
	faceBank = {};
	document.getElementById("facebankContainer").innerHTML = "";
}

/*
 * Writes the HTML of a given notification and returns it to the caller.
 */
function viewNotif(notifModel) {
	var notifView = "<div class=\"row notification\">\
	<div class=\"col-md-3\">\
		<div class=\"picture\">\
			<img src="
			+ notifModel["url"]
			+ "></src>\
		</div>\
	</div>\
	<div class=\"col-md-9 text_notifaction\">\
		<strong>"
			+ notifModel["title"]
			+ "</strong><br> <span>"
			+ notifModel["description"] + "</span>\
	</div>\
	</div>"

	console.log(notifView)
	return notifView

}
