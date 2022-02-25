'use strict';

const { registerCronTasks } = require('./config/cron-tasks');

module.exports = ({ strapi }) => {
	// register action check
	registerCronTasks({ strapi });
};
