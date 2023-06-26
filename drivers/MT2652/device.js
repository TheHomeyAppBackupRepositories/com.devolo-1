'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

// http://products.z-wavealliance.org/products/1143

class DevoloSceneSwitch extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('measure_battery', 'BATTERY');

    this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', report => {
      if (report
        && report.hasOwnProperty('Scene Number')
        && report.hasOwnProperty('Properties1')
        && report.Properties1.hasOwnProperty('Key Attributes')) {
        const button = report['Scene Number'];
        const scene = report.Properties1['Key Attributes'];

        this.homey.flow.getDeviceTriggerCard('mt2652_scene')
          .trigger(this, null, { button, scene })
          .catch(this.error);
      }
    });
  }

}

module.exports = DevoloSceneSwitch;
