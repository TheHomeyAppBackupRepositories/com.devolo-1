'use strict';

const Homey = require('homey');

class DevoloApp extends Homey.App {
	onInit() {
        console.log(`${Homey.manifest.id} running...`);
    }
}

module.exports = DevoloApp;
