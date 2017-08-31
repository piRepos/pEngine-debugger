import Ember from 'ember';

const vis = require("vis");

export default Ember.Component.extend(
{

	tagName: 'div',

	options:
	{

	},

	chartData:
	{
		labels: ["Errors"],
		datasets:
		[
			{ time: 2.1, description: "Sei troppo gay! ahahah." }
		]
	},

	didInsertElement()
	{
		this._super(...arguments);

		var items = new vis.DataSet(
		[
			{id: 1, content: 'item 1', start: '2013-04-20'},
			{id: 2, content: 'item 2', start: '2013-04-14'},
			{id: 3, content: 'item 3', start: '2013-04-18'},
			{id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
			{id: 5, content: 'item 5', start: '2013-04-25'},
			{id: 6, content: 'item 6', start: '2013-04-27'}
		]);

		var ctx = document.getElementById(this.elementId);
		var chart = new vis.Timeline(ctx, items, { height: '80px'});

		this.set("handler", chart);
	},

});
