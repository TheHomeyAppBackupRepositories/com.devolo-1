'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

const triggerMap = {
  1: 'btn1_single',
  2: 'btn2_single',
  6: 'btn2_double',
  5: 'btn3_single',
  4: 'btn4_single',
  8: 'btn4_double',
};

// http://www.cd-jackson.com/index.php/zwave/zwave-device-database/zwave-device-list/devicesummary/341

class DevoloKeyFobDevice extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('measure_battery', 'BATTERY');

    this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', report => {
      if (report
        && report.hasOwnProperty('Scene Number')) {
        this.homey.flow.getDeviceTriggerCard(`mt2653_${triggerMap[report['Scene Number']]}`)
          .trigger(this)
          .catch(this.error);
      }
    });
  }

}

module.exports = DevoloKeyFobDevice;
