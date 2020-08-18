// import db from '../db'
import log from '../utils/log'
import { registerController } from '../controllers'
import { uniqBy } from 'lodash'

let bridges = []

const initBridges = () => {}

const registerBridge = (_bridge) => {
  if (_bridge.controllers) {
    _bridge.controllers.map((controller) => {
      registerController(controller)
    })
  }
  bridges.push(_bridge)
  bridges = uniqBy(bridges, (bridge) => { return bridge.address })
  log('info', 'core/lib/bridges', `Updated Bridge ${_bridge.type} with ${_bridge.controllers.length} controllers`)
  return `Updated Bridge ${_bridge.type} with ${_bridge.controllers.length} controllers`
}

export { initBridges, registerBridge, bridges }
