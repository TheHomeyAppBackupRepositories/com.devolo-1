'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

// http://products.z-wavealliance.org/products/1130

const TAMPER_TIMEOUT = 30 * 1000;

class DevoloContactSensor extends ZwaveDevice {

  onMeshInit() {
    this.setCapabilityValue('alarm_tamper', false);

    this.registerCapability('alarm_contact', 'SENSOR_BINARY');
    this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL');
    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
    this.registerCapability('measure_battery', 'BATTERY');

    this.registerReportListener('SENSOR_BINARY', 'SENSOR_BINARY_REPORT', report => {
      if (report
        && report.hasOwnProperty('Sensor Value')
        && report.hasOwnProperty('Sensor Type')
        && report['Sensor Type'] === 'Tamper'
        && report['Sensor Value'] === 'detected an event') {
        this.setCapabilityValue('alarm_tamper', true)
          .catch(this.error);

        if (this.tamperTimeOut) this.homey.clearInterval(this.tamperTimeOut);
        this.tamperTimeOut = this.homey.setTimeout(() => {
          this.setCapabilityValue('alarm_tamper', false)
            .catch(this.error);
        }, TAMPER_TIMEOUT);
      }

      this.registerSetting('basic_set_level', input => Buffer.from([(input >= 100 && input < 255) ? 255 : input]));
    });
  }

}

module.exports = DevoloContactSensor;
