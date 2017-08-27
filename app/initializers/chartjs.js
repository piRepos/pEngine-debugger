export function initialize() 
{
	Chart.plugins.register(
	{
		afterInit: function(chart) 
		{

		},

		afterEvent: function(chart, e) 
		{ 
			if (e.type === 'mousemove') 
			{
				if (chart.options.timeLine === undefined || !chart.options.timeLine.enabled)
				{
					return;
				}				

				if (chart.options.timeLine.onTimeChange !== undefined)
				{
					var currTime = chart.options.timeLine.timeRange * (1.0 - (e.x / chart.chartArea.right));
					chart.options.timeLine.onTimeChange(chart, currTime);
				}

				chart.options.timeLine.currentTime = e.x;
			}
		},

		afterDraw: function(chart, easing) 
		{
			if (chart.options.timeLine === undefined || !chart.options.timeLine.enabled)
			{
				return;
			}

			var ctx = chart.chart.ctx;
			var chartArea = chart.chartArea;
			var x = chart.options.timeLine.currentTime;

			if (!isNaN(x)) 
			{
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = chart.options.timeLine.color;
				ctx.moveTo(chart.options.timeLine.currentTime, chartArea.bottom);
				ctx.lineTo(chart.options.timeLine.currentTime, chartArea.top);
				ctx.stroke();
			}
		}
	});

	Chart.Tooltip.positioners.side = function(elements, position) 
	{
		if (!elements.length) 
		{
			return false;
		}

		return {

			x: 10,
			y: 0
		};
	};
}

export default {
  name: 'chartjs',
  initialize
};
