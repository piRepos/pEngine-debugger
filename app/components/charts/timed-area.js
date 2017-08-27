import Ember from 'ember';

function shadeColor(color, percent) 
{
	var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export default Ember.Component.extend(
{

	/**
	 * Chart data binding
	 * @type {struct}
	 */
	data: {},

	/**
	 * Current selected time in seconds
	 * @type {double}
	 */


	/**
	 * Time range displayed on the chart in seconds
	 * @type {double}
	 */
	timeRange: 5,

	currentTime: 0,

	/**
	 * Chart data color
	 * @type {string}
	 */
	color: "#44444",

	height: 200,

	chart : null,

	options: {
				responsive: true,
				maintainAspectRatio: false,

				// - Set animation properties
				animation:
				{
					duration: 0
				},

				// - Timeline settings
				timeLine: 
				{
					enabled: true,
					currentTime: 0,
					timeRange: 20,
					color: "rgba(0,0,0,0.3)"
				},

				legend:
				{
					display: false
				},

				tooltips:
				{
					enabled: true,
					intersect: false,
					mode: "index",
					position: "side",
					displayColors: false,
					caretSize: 0,
					filter: function(item) 
					{
						item.yLabel = Math.round(item.yLabel * 100) / 100
						item.xLabel = "Time: " + item.xLabel;
						return item;
					}
				},

				layout: 
				{
					padding: 0
				},

				elements: 
				{
					point:
					{
						backgroundColor: 'rgba(0,0,0,0)',
						borderColor: 'rgba(0,0,0,0)',
						radius: 0
					},
					line: 
					{
						tension: 0,
					}
				},

				scales:
				{
					yAxes:
					[
						{
							stacked: true,
							display: false
						}
					],
					xAxes:
					[
						{
							display: false,
						}
					]
				}
			},

	init()
	{
		this._super(...arguments);

		var that = this;

		this.set("options.timeLine.onTimeChange", function (chart, time) 
					{
						that.set("currentTime", time);
						that.set("chart", chart);
					});
	},

	currentTimeChanged: Ember.observer('currentTime', function ()
	{
		this.set("options.timeLine.currentTime", this.get("currentTime"));
		var c = this.get("chart");
			//if (c != null)
			//	{c.draw();
			//}
	}),


	timeChanged: Ember.observer('timeRange', function() 
	{
		// deal with the change
		this.set("options.timeLine.timeRange", this.get('timeRange'));
	}),

	chartData: Ember.computed('data', 'color', 'timeRange',
	{
		get()
		{
			var data = this.get("data");
			var dataFieldCount = Object.keys(data).length
			var currFieldIndex = 0;

			var datasets = [];

			var dataLenght =  this.get("timeRange") * 10;
			var labels = Array.apply(null, {length: dataLenght}).map(Number.call, function (num)
			{
				return Math.round((((dataLenght - num) + 1) / 10) * 100) / 100 + "s";
			});

			for (var field in data) 
			{
				if (data.hasOwnProperty(field)) 
				{
					var setColor = shadeColor(this.get('color'), (currFieldIndex++ / dataFieldCount) * 0.9);

					datasets.push(
					{
						fill: 'origin', 
						label: [field], 
						backgroundColor: [setColor],
						borderColor: ['rgba(0,0,0,0.3)'],
						borderWidth: 1,
						data: data[field]
					});
				}
			}

			var finalData =
			{
				labels: labels,
				datasets: datasets
			};

			return finalData;
		}
	})

});
