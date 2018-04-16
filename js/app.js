/** The model for app. These are the midnight eateries listings that will
be shown to the user.*/

var initialSpaces = [
{
  "name": "Jungle Cafe",
  "location": {"lat": 28.5010413, "lng": 77.1855449},
  "res_id": "18232132"
},
{
  "name": "Glued Entertainment",
  "location": {"lat": 28.5614733, "lng": 77.3607146},
  "res_id": "8977"
},
{
  "name": "Taj Cafe Coffee Day",
  "location": {"lat": 28.5951278963, "lng": 77.1719860286},
  "res_id": "600",
  "shortUrl": "https://b.zmtcdn.com/data/pictures/0/600/5dba72f2db93f57096549a9958a59ac9.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
},
{
  "name": "The Forestta",
  "location": {"lat": 28.4392450000, "lng": 77.1039910000},
  "res_id": "18594230"
},
{
  "name": "RBG - Park Inn by Radisson",
  "location": {"lat": 28.6187263098, "lng": 77.2873790190},
  "res_id": "310379"
},
{
  "name": "Throttle Shrottle",
  "location": {"lat": 28.4281428920, "lng": 77.1427831426},
  "res_id": "311615"
},
{
  "name": "Kitchen Cafe",
  "location": {"lat": 28.6410129514, "lng": 77.2130027041},
  "res_id": "310444"
},
{
  "name": "Penta Cafe",
  "location": {"lat": 28.6992230326, "lng": 77.1916197985},
  "res_id": "18034044"
},
{
  "name": "Thok (The House of Kakori)",
  "location": {"lat": 28.5616244277, "lng": 77.2496141866},
  "res_id": "18252362"
},
{
  "name": "Sandwhich King",
  "location": {"lat": 28.6139471261, "lng": 77.3612762243},
  "res_id": "3939"
},
{
  "name": "All Time Cafe",
  "location": {"lat": 28.4203344709, "lng": 77.0510626584},
  "res_id": "18450874"
},
{
  "name": "Moonlight Adda",
  "location": {"lat": 28.4611250000, "lng": 77.0792220000},
  "res_id": "18618271",
  "shortUrl": "https://b.zmtcdn.com/data/reviews_photos/18b/9376e26af795a44fa5a2d40df47cb18b_1513348983.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
},
{
  "name": "Horn Please",
  "location": {"lat": 28.5374450285, "lng": 77.2565295920},
  "res_id": "17953899"
},
{
  "name": "Mukesh Dhaba",
  "location": {"lat": 28.4935634000, "lng": 77.0858484000},
  "res_id": "312266",
  "shortUrl": "https://b.zmtcdn.com/data/pictures/6/312266/c46a8c46cdf026f23d4a77e2ac20e21f.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
},
{
  "name": "Spooky Sky",
  "location": {"lat": 28.6403314621, "lng": 77.2106943280},
  "res_id": "313371",
  "shortUrl": "https://b.zmtcdn.com/data/pictures/1/313371/64675cd6b6dbac99992a7870157b8883.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
},
{
  "name": "The Millionare Express",
  "location": {"lat": 28.4255028008, "lng": 77.0573215932},
  "res_id": "18429397"
},
{
  "name": "Billu's Hut Night Express",
  "location": {"lat": 28.6947748518, "lng": 77.1533560753},
  "res_id": "18633190",
  "shortUrl": "https://b.zmtcdn.com/data/pictures/0/18633190/ba392a7a5c652b4ad621f18a1a9143de.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
},
{
  "name": "Cafe 24 - Hotel City Park",
  "location": {"lat": 28.7059030363, "lng": 77.1432612464},
  "res_id": "3951"
},
{
  "name": "Pakode's Ki Dukaan",
  "location": {"lat": 28.6530768745, "lng": 77.1943600103},
  "res_id": "306071",
  "shortUrl": "https://b.zmtcdn.com/data/pictures/1/306071/bd78e6c6b8f91013d85b16c5207c6a01.jpg?fit=around%7C200%3A2007&crop=200%3A200%3B%2A%2C%2A"
},
{
  "name": "Yellow Brick Road - Taj Vivanta",
  "location": {"lat": 28.6012063809, "lng": 77.2294463217},
  "res_id": "4404"
},
]

// Zomato API Url parameters in global scope
var BaseUrl = "https://developers.zomato.com/api/v2.1/restaurant?apikey=02ed7625552ed337a4e732c77e802515&res_id=";

// Create global variables to use in google maps
var pos;
var map,
  infowindow,
  bounds;


//googleSuccess() is called when page is loaded
function googleSuccess() {
  "use strict";

  //Google map elements - set custom map marker
  var image = {
    "url": "img/32x32.png",
    // This marker is 32 pixels wide by 32 pixels high.
    "size": new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    "origin": new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    "anchor": new google.maps.Point(0, 32)
  };

  //Google map elements - set map options
  var mapOptions = {
    "center": {
      "lat": 28.60892,
      "lng": 77.218969
    },
    zoom: 11,
    styles: [
    {
      "featureType": "landscape",
      "stylers": [
        { "hue": "#FFBB00"},
        {"saturation": 43.400000000000006},
        {"lightness": 37.599999999999994},
        {"gamma": 1}
      ]
    },{
      "featureType": "road.highway",
      "stylers": [
        {"hue": "#FFC200"},
        {"saturation": -61.8},
        {"lightness": 45.599999999999994},
        {"gamma": 1}
      ]
    },{
      "featureType": "road.arterial",
      "stylers": [
        {"hue": "#FF0300"},
        {"saturation": -100},
        {"lightness": 51.19999999999999},
        {"gamma": 1}
      ]
    },{
      "featureType": "road.local",
      "stylers": [
        {"hue": "#FF0300"},
        {"saturation": -100},
        {"lightness": 52},
        {"gamma": 1}
      ]
    },{
      "featureType": "water",
      "stylers": [
        {"hue": "#0078FF"},
        {"saturation": -13.200000000000003},
        {"lightness": 2.4000000000000057},
        {"gamma": 1}
      ]
    },{
      "featureType": "poi",
      "stylers": [
        {"visibility": "off"}
      ]
    }],
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infowindow = new google.maps.InfoWindow({
    maxWidth: 225,
    content: ""
  });
  bounds = new google.maps.LatLngBounds();

  // Close infowindow when clicked elsewhere on the map
  map.addListener("click", function(){
    infowindow.close(infowindow);
  });

  // Recenter map upon window resize
  window.onresize = function () {
    map.fitBounds(bounds);
  };


  //Creating Space object
  var Space = function (data, id, map) {
    var self = this;
    this.name = ko.observable(data.name);
    this.location = data.location;
    this.marker = "";
    this.markerId = id;
    this.res_id = data.res_id;
    this.shortUrl = data.shortUrl;
    this.photoUrl = "";
    this.avgcost = "";
    this.cuisines= "";
    this.rating ="";
  }

  // Get contect infowindows
  function getContent(space) {
    var contentString ="<h3>" + space.name +
      "</h3><br><div style='width:200px;min-height:120px'><img src=" + '"' +
      space.shortUrl + '"></div><br><h3>Cost For Two: '+space.avgcost+'</h3><br><h3>Cuisines: '+space.cuisines+'</h3><br><h3>Rating: '+space.rating+'</h3><button type="button" class="btn btn-success" id="btnDirection">Get direction</button>';
    var errorString = "Oops,content not available."
    if (space.name.length > 0) {
      return contentString;
      } else {
      return errorString;
      }
  }

  // Bounce effect on marker
  function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 700);
    }
  };

// Getting the user's current location

    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.60892, lng: 77.218969},
    zoom: 11
		});

var infoWindow = new google.maps.InfoWindow({map: map});
	
	var myloc = new google.maps.Marker({
          map:map
        });

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
         pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log(pos);
        myloc.setPosition(pos);
        map.setCenter(pos);
        google.maps.event.addListener(myloc,'click',function() {
            var infowindow = new google.maps.InfoWindow({
            content:"You Are Here!"
        });
            infowindow.open(map,myloc);
});
    }, function() {
        handleLocationError(true, myloc, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, myloc, map.getCenter());
}

function handleLocationError(browserHasGeolocation, myloc, def) {
    myloc.setPosition(def);
    pos = def;
    console.log(pos);
     google.maps.event.addListener(myloc,'click',function() {
        var infowindow = new google.maps.InfoWindow({
        content:"This is Default Location"
    });
        infowindow.open(map,myloc);
    });
        
}
   


 function displayDirections(destination) {
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();

      console.log("origin : " + pos)
      console.log("destination : " + destination)
      directionsService.route(
        {
          origin: pos,
          destination: destination,
          travelMode: "DRIVING"
        },
        function(response, status) {
        	console.log(status);
        	console.log(response);
          if (status === "OK") {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
   			    directionsDisplay.setPanel(document.getElementById('menu2'));
            
            let directionsPane = document.getElementsByClassName('directions-pane')[0];
            directionsPane.style.display = 'block';
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  
 function ViewModel() {
    var self = this;

    // Nav button control
    this.isNavClosed = ko.observable(false);
    this.navClick = function () {
      this.isNavClosed(!this.isNavClosed());
    };

    // Creating list elements from the spaceList
    this.spaceList = ko.observableArray();
    initialSpaces.forEach(function(item){
      self.spaceList.push(new Space(item));
    });

    

    // Create a marker per space item
    this.spaceList().forEach(function(space) {
      var marker = new google.maps.Marker({
        map: map,
        position: space.location,
        icon: image,
        animation: google.maps.Animation.DROP
      });
      space.marker = marker;
      // Extend the boundaries of the map for each marker
      bounds.extend(marker.position);
      // Create an onclick event to open an infowindow and bounce the marker at each marker
      marker.addListener("click", function(e) {
        //pan down infowindow by 200px to keep whole infowindow on screen
        map.panBy(0, -200)
        infowindow.setContent(getContent(space));
        infowindow.open(map, marker);
        toggleBounce(marker);
        $('#btnDirection').bind('click', function() {          
				displayDirections(space.location)
				
			});
    });
  });

    // API request
    self.getData = ko.computed(function(){
      self.spaceList().forEach(function(space) {

        // Set initail variables to build the correct URL for each space
        var  venueId = space.res_id;
        var dataUrl = BaseUrl + venueId;
        // AJAX call to Foursquare
        $.ajax({
          type: "GET",
          url: dataUrl,
          dataType: "json",
          cache: false,
          success: function(data) {
                space.name = data.name;
                if(data.thumb !==""){
                space.shortUrl = data.thumb;    
                }
                console.log(space.shortUrl);
                space.avgcost = data.average_cost_for_two;
                space.cuisines = data.cuisines;
                space.rating = data.user_rating.aggregate_rating;
          }
        });
      });
    });

    // Creating click for the list item
    this.itemClick = function (space) {
      var markerId = space.markerId;
      google.maps.event.trigger(space.marker, "click");
    }

    // Filtering the Space list
    self.filter = ko.observable("");

    this.filteredSpaceList = ko.dependentObservable(function() {
      var q = this.filter().toLowerCase();
      //var self = this;
      if (!q) {
      // Return self.spaceList() the original array;
      return ko.utils.arrayFilter(self.spaceList(), function(item) {
        item.marker.setVisible(true);
        return true;
      });
      } else {
        return ko.utils.arrayFilter(this.spaceList(), function(item) {
          if (item.name.toLowerCase().indexOf(q) >= 0) {
          return true;
          } else {
            item.marker.setVisible(false);
          return false;
          }
        });
      }
    }, this);
  };

 // Activates knockout.js
ko.applyBindings(new ViewModel());
}