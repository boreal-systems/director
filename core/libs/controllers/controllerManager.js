import { connectStreamDecks } from './providers/elgato-streamdeck'
import { controllers } from '../globals'
import { find } from 'lodash'
import text2svg from '../utils/text2svg'
import db from '../db'
const sharp = require('sharp') // See http://sharp.dimens.io/en/stable/ for full docs on this great library!

const debug = require('debug')('BorealDirector:core/libs/controllers')

const controllerManager = () => {} // Empty root Function

controllerManager.handleStreamdecks = () => {
  connectStreamDecks()
    .then(() => {
      controllers.forEach(element => {
        if (element.type === 'streamdeck') {
          element.device.setBrightness(100)
          sharp(text2svg('Test'))
            .flatten() // Eliminate alpha channel, if any.
            .resize(element.device.ICON_SIZE, element.device.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
            .raw() // Give us uncompressed RGB.
            .toBuffer()
            .then(buffer => {
              element.device.fillImage(2, buffer)
            })
            .catch(err => {
              debug('Sharp: ', err)
            })

          element.device.on('down', keyIndex => { // Handle button presses
            element.device.fillColor(keyIndex, 0, 0, 255)
            debug('Controller', element.uuid, 'button', keyIndex, 'pressed')
          })

          element.device.on('up', keyIndex => { // Handle button releases
            element.device.fillColor(keyIndex, 0, 255 - (keyIndex * 7), keyIndex * 7)
            debug('Controller', element.uuid, 'button', keyIndex, 'released')
          })

          element.device.on('error', error => { // Handle Errors
            debug('Controller Error', error)
          })
        }
      })
    })
}

controllerManager.initControllers = () => {
  controllerManager.handleStreamdecks()
}

controllerManager.setBrightness = (uuid, brightness) => {
  var controller = find(controllers, { uuid: uuid })
  switch (controller.type) {
    case 'streamdeck':
      controller.device.setBrightness(brightness)
      db.put('controllers')
  }
}

controllerManager.handleExit = () => { // TODO: make this work
  controllers.forEach(element => {
    if (element.type === 'streamdeck') {
      element.device.clearAllKeys() // Clear everything at startup
    }
  })
}

export default controllerManager
