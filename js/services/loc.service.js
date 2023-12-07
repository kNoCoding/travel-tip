import { storageService } from './async-storage.service.js'
import { utils } from './utils.service.js'

export const locService = {
  getLocs,
  getLoc,
  createLoc,
  deleteLoc,
}

const DB_KEY = 'locationsDB'


function getLocs() {
  // Assume storageService.query returns a Promise
  return storageService
    .query(DB_KEY)
    .then((res) => {
      // Check if there is data in the result
      if (res && res.length > 0) {
        // If there is data, return it
        return res
      } else {
        return []
      }
    })
    .catch((err) => {
      console.log('err', err)
      // Handle the error as needed
      throw err // Rethrow the error or handle it accordingly
    })
}

function createLoc(name, lat, lng) {
  let loc = {
    name,
    lat,
    lng,
  }
  return Promise.resolve(storageService.post(DB_KEY, loc))
}

function getLoc(id) {
  console.log('test')
  return storageService.get(DB_KEY, id)
}

function deleteLoc(id) {
    return getLoc(id)
      .then((loc) => {
        console.log('Deleting loc:', loc);
        return storageService.remove(DB_KEY, id);
      })
      .then(() => {
        console.log('Location deleted');
      })
      .catch((error) => {
        console.error('Error deleting location:', error);
        throw error;
      });
  }
