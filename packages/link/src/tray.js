import SysTray from 'systray'
import { directorCore } from './network/mdns'
import { updateStreamdecks } from './streamdeck'
const open = require('open')

const systray = new SysTray({
  menu: {
    // you should using .png icon in macOS/Linux, but .ico format in windows, this is the logo encoded into base64
    icon: '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',
    tooltip: 'BorealDirector Link',
    items: [{
      title: 'Refresh Devices',
      tooltip: 'Refresh Local Controllers',
      checked: false,
      enabled: true
    }, {
      title: 'Open UI',
      tooltip: 'Open the Core UI',
      checked: false,
      enabled: true
    }, {
      title: 'Quit',
      tooltip: 'Close BorealDirector Link',
      checked: false,
      enabled: true
    }]
  },
  debug: false,
  copyDir: true
})

systray.onClick(action => {
  if (action.seq_id === 0) {
    updateStreamdecks({ type: 'refresh' })
  } else if (action.seq_id === 1) {
    open(`http://${directorCore.address}:${directorCore.service.port}`)
  } else if (action.seq_id === 2) {
    updateStreamdecks({ type: 'shutdown' })
    setTimeout(() => {
      systray.kill()
    }, 500)
  }
})
