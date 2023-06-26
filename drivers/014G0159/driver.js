'use strict';

const Homey = require('homey');

class DevoloThermostatDriver extends Homey.Driver {
  onInit() {
    this.homey.flow.getDeviceTriggerCard('014G0159_btn_1')
      .registerRunListener((args, state) => {
        return args.device === state.device;
      });
  }
}

module.exports = DevoloThermostatDriver;
