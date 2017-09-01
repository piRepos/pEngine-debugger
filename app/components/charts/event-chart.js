import Ember from 'ember';

const vis = require("vis");

export default Ember.Component.extend(
{

	tagName: 'div',
	classNames: ["event-chart"],

	height: Ember.computed.alias('options.height'),
	width: Ember.computed.alias('options.width'),

	startRange: Ember.computed.alias('options.min'),
	endRange: Ember.computed.alias('options.max'),

	options:
	{
		//height: '150px',
		width: '100%',

		min: new Date(2010,9,23,12,0,0),
		max: new Date(2010,9,23,12,1,0)
	},

	data:
	[
		{ start: 2.1, title: "pEngine started." },
		{ start: 2.2, title: "Loading audio device." },
		{ start: 2.7, title: "Loading renderer module." },
		{ start: 3.1, title: "Starting Wave Dash." },
		{ start: 3.2, title: "Element loading.", description: "The element #24212 takes too much time to load.", type: "warning" },
		{ start: 3.3, title: "Element loading.", description: "The element #24212 takes too much time to load.", type: "warning" },
		{ start: 3.4, title: "Element loading.", description: "The element #24212 takes too much time to load.", type: "warning" },
		{ start: 5.2, title: "Send network request.", description: "Connection started to 192.168.0.1." },
		{ start: 7.2, title: "Network request failed.", description: "A request to 192.168.0.1 is aborted due to timeout.", type: "error" }
	],

	chartData: Ember.computed('data', function () 
	{
		var data = this.get("data");
		var start = this.get("startRange");

		var items = [];

		for (var i = 0; i < data.length; i++) 
		{
			var content = "<div class='title'>";

			switch (data[i].type)
			{
				case 'warning': content += '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>'; break;
				case 'error': content += '<i class="fa fa-times" aria-hidden="true"></i>'; break;
				default: content += '<i class="fa fa-info" aria-hidden="true"></i>'; break;
			}

			content += data[i].title + "</div>";

			if (data[i].description != undefined)
				content += "<span class='description'>" + data[i].description + "</span>";

			var date = this.get("startRange");
			date = new Date(date.getTime() + data[i].start * 1000);

			items.push(
			{
				id: i,
				content: content,
				start: date,
				className: data[i].type
			});
		}

		console.log(items);

		return new vis.DataSet(items);
	}),

	didInsertElement()
	{
		this._super(...arguments);

		var ctx = document.getElementById(this.elementId);
		var chart = new vis.Timeline(ctx, this.get("chartData"), this.get('options'));

		this.set("handler", chart);
	},

});
