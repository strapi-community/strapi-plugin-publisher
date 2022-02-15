'use strict';

module.exports = [
	{
		method: 'GET',
		path: '/dates',
		handler: 'publishDateController.find',
	},
	{
		method: 'POST',
		path: '/dates',
		handler: 'publishDateController.create',
	},
	{
		method: 'DELETE',
		path: '/dates/:id',
		handler: 'publishDateController.delete',
	},
	{
		method: 'PUT',
		path: '/dates/:id',
		handler: 'publishDateController.update',
	},
];
