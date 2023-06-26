'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

const SENSOR_MULTILEVEL = 0x31;
const SENSOR_MULTILEVEL_REPORT = 0x05;
const SENSOR_VALUE_OFFSET = 4;

class DevoloRadiatorThermostat extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('measure_battery', 'BATTERY', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('target_temperature', 'THERMOSTAT_SETPOINT', {
      getOpts: {
        getOnOnline: true,
      },
    });

    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');

    // Our Radiator Thermostat doesn't report the SENSOR_MULTILEVEL commandclass as supported
    // However it actually does report values using it.
    this.node.on('unknownReport', reportBuffer => {
      this.log('Unknown report received', reportBuffer);
      if (
        Buffer.isBuffer(reportBuffer) &&
        reportBuffer[0] === SENSOR_MULTILEVEL &&
        reportBuffer[1] === SENSOR_MULTILEVEL_REPORT
      ) {
        const sensorValue = reportBuffer.readInt16BE(SENSOR_VALUE_OFFSET) / 100;
        this.setCapabilityValue('measure_temperature', sensorValue)
          .catch(this.error);
        this.log('Measured temperature', sensorValue);

      }
    });
  }

}

module.exports = DevoloRadiatorThermostat;
