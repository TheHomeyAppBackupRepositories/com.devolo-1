'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DevoloMeteringPlug extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = DevoloMeteringPlug;
