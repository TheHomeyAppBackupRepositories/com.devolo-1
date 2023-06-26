'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

// Documentation: http://heating.danfoss.com/PCMPDF/44035v01.pdf
// https://www.devolo.de/fileadmin/Web-Content/DE/products/hc/hc-raumthermostat/documents/de/Home_Control_Raumthermostat_0916_de_online.pdf

class DevoloThermostat extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('measure_battery', 'BATTERY', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('target_temperature', 'THERMOSTAT_SETPOINT', {
      getOpts: {
        getOnOnline: true,
      },
    });

    this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', report => {
      if (report && report['Scene Number'] === 1) {
        this.homey.flow.getDeviceTriggerCard('014G0159_btn_1')
          .trigger(this)
          .catch(this.error);
      }
    });
  }

}

module.exports = DevoloThermostat;
