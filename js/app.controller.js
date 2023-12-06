import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const main = {
  onMapClick,
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch
window.onGoto = onGoto
window.onDelete = onDelete
window.onMyLoc = onMyLoc

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  renderLocs()
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
}

function onSearch(ev) {
  ev.preventDefault()
  const elSeachBar = document.querySelector('.search-bar')
  var address = elSeachBar.value
  mapService.codeAddress(address)
}

function onMyLoc() {
  getPosition()
    .then((pos) => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude)
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onGoto(id) {
  console.log('Goto', id)
  let loc = locService.getLoc(id)
  mapService.panTo(loc.lat, loc.lng)
}

function onDelete(id) {
  console.log('Delete', id)
  locService.deleteLoc(id)
  renderLocs()
}

function onMapClick() {
  renderLocs()
}

function renderLocs() {
  locService.getLocs().then((locs) => {
    let locsHTML = locs
      .map((loc) => {
        return `
                <span class="loc">${loc.name}<button onclick="onGoto('${loc.id}')">goto</button><button onclick="onDelete('${loc.id}')">delete</button></span>
                `
      })
      .join('')
    console.log('Locations:', locs)
    document.querySelector('.locs').innerHTML = locsHTML
  })
}
