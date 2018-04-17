/** The model for app. These are the midnight eateries listings that will
be shown to the user.*/

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