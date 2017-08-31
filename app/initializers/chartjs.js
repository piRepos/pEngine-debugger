export function initialize() 
{
	Chart.plugins.register(
	{
		beforeInit: function(chart) 
		{
			
		},

		afterEvent: function(chart, e) 
		{ 
			if (e.type === 'mousemove') 
			{
				if (!chart.options.timeLine.enabled)
				{
					return;
				}				

				if (chart.options.timeLine.onTimeChange != null)
				{
					var currTime = chart.options.timeLine.timeRange * (1.0 - (e.x / chart.chartArea.right));
					chart.options.timeLine.onTimeChange(chart, e.x);
				}

				chart.options.timeLine.currentTime = e.x;

				chart.draw();
			}
		},

		afterDraw: function(chart, easing) 
		{
			if (!chart.options.timeLine.enabled)
			{
				return;
			}

			var ctx = chart.chart.ctx;
			var chartArea = chart.chartArea;
			var x = chart.options.timeLine.currentTime;

			if (!isNaN(x)) 
			{
				ctx.beginPath();
				var old = chart.options.timeLine.color;
				ctx.strokeStyle = chart.options.timeLine.color;
				ctx.lineWidth=2;
				ctx.moveTo(chart.options.timeLine.currentTime, chartArea.bottom);
				ctx.lineTo(chart.options.timeLine.currentTime, chartArea.top);
				ctx.stroke();
				chart.options.timeLine.color = old;
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
