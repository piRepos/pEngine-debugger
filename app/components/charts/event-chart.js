import Ember from 'ember';

const vis = require("vis");

export default Ember.Component.extend(
{

	tagName: 'div',
	classNames: ["event-chart"],

	/**
	 * Start time in the visible range.
	 * @type {Struct/String}
	 */
	startRange: null,

	/**
	 * End time in the visible range.
	 * @type {Struct/String}
	 */
	endRange: null,

	/**
	 * Current selected item.
	 * @type {Struct}
	 */
	selectedElement: null,

	/**
	 * Chart data.
	 * @type {Array}
	 */
	data: [],

	/**
	 * Chart options.
	 * @type {Struct}
	 */
	options:
	{
		//height: '150px',
		width: '100%',
		height: '86px',
		align: 'left',
		verticalScroll: false,
		stack: false,

		min: new Date(2010,9,23,12,0,0),
		max: new Date(2010,9,23,12,1,0)
	},

	didInsertElement()
	{
		this._super(...arguments);

		var min = new Date();
		var max = new Date(); 
		min.setTime(this.get("startRange"));
		max.setTime(this.get("endRange"));
		this.set("options.max", max);
		this.set("options.min", min);

		var ctx = document.getElementById(this.elementId);
		var chart = new vis.Timeline(ctx, this.get("chartData"), this.get('options'));

		var that = this;

		// - Add event listener
		chart.on('select', function (e) 
		{
			if (e.items.length > 0)
				that.set("selectedElement", e.items[0]);
		});

		this.set("handler", chart);
	},

	willDestroyElement()
	{
		this._super(...arguments);

		var chart = this.get("handler");

		// - Add event listener
		chart.off('select', this.onSelect);

		chart.destroy();
	},

	didUpdateAttrs()
	{
		this._super(...arguments);

		var chart = this.get("handler");

		if (chart == null || chart == undefined)
			return;

		var window = chart.getWindow();
		var endCursor = window.end.getTime() == this.get("options.max").getTime();

		var min = new Date();
		var max = new Date(); 
		min.setTime(this.get("startRange"));
		max.setTime(this.get("endRange"));
		this.set("options.max", max);
		this.set("options.min", min);

		chart.setOptions(this.get("options"));

		var start = new Date();
		start.setTime(max.getTime());
		start.setSeconds(start.getSeconds() - 20);

		console.log(min > start ? min : start + "|" +  max);

		if (endCursor)
		{
			if (min > start)
				chart.setWindow(start, max);
			else chart.moveTo(max);
		}
	},

	chartData: Ember.observer('data.[]', function () 
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

			var date = new Date();
			date.setTime(this.get("startRange"));
			date.setMilliseconds(date.getMilliseconds() + data[i].start * 1000);

			items.push(
			{
				id: data.length - i,
				content: content,
				start: date,
				className: data[i].type,
				style: "z-index: " + (data.length - i)
			});
		}

		console.log(items);
		var chart = this.get("handler"); 
		chart.setItems(new vis.DataSet(items));
	})

});
