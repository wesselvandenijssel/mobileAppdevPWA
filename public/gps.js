if ("geolocation" in navigator) { 
} else { 

}
if ( navigator.geolocation ) { 
    
    navigator.geolocation.getCurrentPosition( setCurrentPosition, positionError, { 
        enableHighAccuracy: false, 
        timeout: 15000, 
        maximumAge: 0 
    } );
} 

function setCurrentPosition( position ) { 

    document.querySelector( '.accuracy' ).innerHTML = position.coords.accuracy; 
    document.querySelector( '.altitude' ).innerHTML = position.coords.altitude; 
    document.querySelector( '.altitudeAccuracy' ).innerHTML = position.coords.altitudeAccuracy; 
    document.querySelector( '.heading' ).innerHTML = position.coords.heading; 
    document.querySelector( '.latitude' ).innerHTML = position.coords.latitude; 
    document.querySelector( '.longitude' ).innerHTML = position.coords.longitude; 
    document.querySelector( '.speed' ).innerHTML = position.coords.speed;
}