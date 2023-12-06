export const mapService = {
  initMap,
  addMarker,
  panTo,
  codeAddress,
}

// Var that is used throughout this Module (not global)
var gMap
var infoWindow
var geocoder
var marker

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    geocoder = new google.maps.Geocoder();
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })

    // Create an InfoWindow without position initially
    infoWindow = new google.maps.InfoWindow({
      content: 'Click the map to get Lat/Lng!',
    })

    // Configure the click listener.
    gMap.addListener('click', (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close()
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      })
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      )
      infoWindow.open(gMap)
      //   return mapsMouseEvent.latLng.toJSON()
      let name = prompt("What's this location?")
      createPlace(name, lat, lng)
    })
  })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}


function codeAddress(address) {
    // var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        gMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: gMap,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }