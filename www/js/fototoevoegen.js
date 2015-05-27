/* jshint
browser: true,
devel: true,
jquery: true
*/
/*
global device
*/
var pictureSource; // picture source
var destinationType; // sets the format of returned value 

$(document).ready(function () {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) && typeof device !== "undefined") {
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		onDeviceReady();
	}
});

function onDeviceReady() {
	//alert('deviceready');
	document.getElementById("add_photo").addEventListener("click", takePicture, false);
	//alert('jo');
}

function takePicture(e) {
	if (!navigator.camera) {
		alert("no camera!");
	} else {
		navigator.camera.getPicture(onSuccess, onFail, {
			quality: 40,
			destinationType: navigator.camera.DestinationType.DATA_URL,
			allowEdit: true,
			correctOrientation: true
		});
	}
}

function onSuccess(imageData) {

	
	
	/*Functie android crop rights reserved Ben de Greef*/
    if(/android/i.test(navigator.userAgent)){
    var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var imageObj = document.getElementById("myImage");
	var width;
	
	imageObj.src = "data:image/jpeg;base64," + imageData;
	
	width = imageObj.width; //breedte van afbeelding nemen
	canvas.setAttribute('width', width); //canvas breedte instellen
	canvas.setAttribute('height', width); //canvas hoogte instellen
	context.drawImage(imageObj, 0, 0, width, width, 0, 0, width, width); //afbeelding tekenen
	var dataURL = canvas.toDataURL(); //dataURL vullen 
	document.getElementById("defImg").setAttribute('crossOrigin', 'anonymous');
	document.getElementById("defImg").src = dataURL; //afbeelding toekennen
    }
    else if(/(iphone)|(ipad)/i.test(navigator.userAgent)){
        var image = document.getElementById('defImg');
    	image.src = "data:image/jpeg;base64," + imageData;
    }
}

function onFail(message) {
	//setTimeout(function () {}, 0);

}