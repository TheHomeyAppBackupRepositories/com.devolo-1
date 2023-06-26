'use strict';

const Homey = require('homey');

class DevoloSceneSwitchDriver extends Homey.Driver {
  onInit() {
    this.homey.flow.getDeviceTriggerCard('mt2652_scene')
      .registerRunListener((args, state) => {
        // Cast the args.button to a number since it's a String.
        return (Number(args.button) === state.button && args.scene === state.scene);
      });
  }
}

module.exports = DevoloSceneSwitchDriver;
