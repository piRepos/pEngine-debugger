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
	currentTime: 0,

	/**
	 * Time range displayed on the chart in seconds
	 * @type {double}
	 */
	timeRange: 20,

	/**
	 * Chart data color
	 * @type {string}
	 */
	color: "#44444",

	/**
	 * Chartjs handler
	 * @type {object}
	 */
	handler: null,

	/**
	 * Chart options.
	 * @type {struct}
	 */
	options: null,

	/**
	 * Control initializer
	 */
	init()
	{
		this._super(...arguments);

		var that = this;
		
		this.set("options", 
		{
			responsive: true,
			maintainAspectRatio: false,

			animation:
			{
				duration: 0
			},

			timeLine: 
			{
				enabled: true,
				currentTime: 0,
				timeRange: 20,
				color: "rgba(0,0,0,0.4)",
				onTimeChange: function (chart, time)
				{
					that.set("currentTime", time);
				}
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
		});
	},

	didInsertElement()
	{
		this._super(...arguments);

		var that = this;


		var ctx = this.get("element").children;
		var chart = new Chart(ctx, {type: "line", data: this.get("chartData"), options: this.get("options")});

		this.set("handler", chart);
	},

	willDestroyElement()
	{
		var chart = this.get("handler");
		chart.destroy();
	},

	willUpdate()
	{
		var chart = this.get("handler");
		chart.draw();
	},

	didReceiveAttrs()
	{
		this._super(...arguments);
		this.updateProperties();
	},

	didUpdateAttrs()
	{
		this._super(...arguments);
		this.updateProperties();
	},

	updateProperties()
	{
		var options = this.get("options");

		options.timeLine.color = shadeColor(this.get("color"), -0.2);
		options.timeLine.currentTime = this.get("currentTime");

		this.set("options", options);

		var chart = this.get("handler");


		if (chart != null)
		{
			Object.assign(options, chart.options);
			chart.draw(0);
		}

	},

	dataTrigger: Ember.observer('data', 'color', 'timeRange', function () 
	{
		var chart = this.get("handler");
		chart.data = this.get("chartData");
		chart.update();
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
