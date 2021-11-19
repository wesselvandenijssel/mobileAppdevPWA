//function that gets the location and returns it
function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  }
  //function that retrieves the position
  function showPosition(position) {
    var location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    console.log(location)
  }
  //request for location
  getLocation();
  function locationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable."
            break;
        case error.TIMEOUT:
            return "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred."
            break;
    }
}
navigator.geolocation.getCurrentPosition((position) => {
  console.log("latitude: " + position.coords.latitude)
  console.log("longitude: " + position.coords.longitude)
  console.log("speed: " + position.coords.speed)
  console.log("accuracy: " + position.coords.accuracy)
  console.log("heading: " + position.coords.heading)
  document.getElementById("location").innerHTML = "<p>latitude: " + position.coords.latitude + "<br>"
  + "longitude: " + position.coords.longitude + "<br>" + "speed: " + position.coords.speed + "<br>" 
  + "accuracy: " + position.coords.accuracy + "<br>" + "heading: " + position.coords.heading +"</p>";
})