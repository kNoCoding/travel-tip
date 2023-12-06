import { storageService } from './async-storage.service.js'
import { utils } from './utils.service.js'

export const locService = {
  getLocs,
  getLoc,
  createLoc,
  deleteLoc,
}

let locs = [
  { id: 'abc123', name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { id: 'aaBb11', name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}

function createLoc(name, lat, lng) {
  let loc = {
    name,
    lat,
    lng,
    id: utils.getRandomId(),
  }
  locs.push(loc)
  //   storageService.post(locsDB, loc)
}

function getLoc(id) {
    console.log('test');
    return locs.find((loc) => loc.id === id)
}

function deleteLoc(id) {
    locs = locs.filter((loc) => loc.id!== id)
}