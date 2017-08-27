import Ember from 'ember';

const DataModel = Ember.Object.extend(
{
	pEngine: null,

	init()
	{
		var dataSets = [];
		var labels = [];


		for (var i = 0; i < 201; i++) 
		{
			labels.push((50 - (i / 2.0)) + "s");

			var v1 = (Math.random() * 5) + 0;
			var v2 = (Math.random() * 5) + 0;
			var v3 = (Math.random() * 10) + 10;
			var v4 = (Math.random() * 5) + 20;
			var v5 = (Math.random() * 20) + 10;
			var v6 = (Math.random() * 5) + 5;
			var v7 = (Math.random() * 5) + 5;
			var v8 = (Math.random() * 5) + 5;
			var v9 = 100 -  (v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9);

		}

	},

	engineState: Ember.computed('pEngine.connected',
	{
		get() 
		{
			const pEngine = this.get('pEngine');
			
			if (!pEngine.connected)
				return { 
					state: "pEngine not connected", 
					color: "#777777", 
					textColor: "#555555",
					disabled: true,
					buttonText: "Close"
				};
			else
			{
				return { 
					state: "pEngine open",
					color: "#4CE0D2", 
					textColor: "#6BBFB9",
					disabled: false,
					buttonText: "Close"
				};
			}
		}
	}),

	inputLoopState: Ember.computed('pEngine.connected', 'pEngine.data.inputThread.state', 
	{
		get() 
		{
			const pEngine = this.get('pEngine');
			
			if (!pEngine.connected)
				return { 
					state: "Input loop not started", 
					color: "#777777", 
					textColor: "#555555",
					disabled: true,
					buttonText: "Pause"
				};
			else
			{
				var color, textColor, buttonText;

				switch (pEngine.data.inputThread.state)
				{
					case "running": color = "#ABE050"; textColor = "#80A83C"; buttonText = "Pause"; break;
					case "paused": color = "#F76D36"; textColor = "#C96E4A"; buttonText = "Resume"; break;
				}

				return { 
					state: "Input loop " + pEngine.data.inputThread.state, 
					color: color, 
					textColor: textColor,
					disabled: false,
					buttonText: buttonText
				};
			}
		}
	}),

	physicsLoopState: Ember.computed('pEngine.connected', 'pEngine.data.physicsThread.state', 
	{
		get() 
		{
			const pEngine = this.get('pEngine');
			
			if (!pEngine.connected)
				return { 
					state: "Physics loop not started", 
					color: "#777777", 
					textColor: "#555555",
					disabled: true,
					buttonText: "Pause"
				};
			else
			{
				var color, textColor, buttonText;

				switch (pEngine.data.physicsThread.state)
				{
					case "running": color = "#ABE050"; textColor = "#80A83C"; buttonText = "Pause"; break;
					case "paused": color = "#F76D36"; textColor = "#C96E4A"; buttonText = "Resume"; break;
				}

				return { 
					state: "Physics loop " + pEngine.data.physicsThread.state, 
					color: color, 
					textColor: textColor,
					disabled: false,
					buttonText: buttonText
				};
			}
		}
	}),

	graphicsLoopState: Ember.computed('pEngine.connected', 'pEngine.data.graphicsThread.state', 
	{
		get() 
		{
			const pEngine = this.get('pEngine');
			
			if (!pEngine.connected)
				return { 
					state: "Graphics loop not started", 
					color: "#777777", 
					textColor: "#555555",
					disabled: true,
					buttonText: "Pause"
				};
			else
			{
				var color, textColor, buttonText;

				switch (pEngine.data.graphicsThread.state)
				{
					case "running": color = "#ABE050"; textColor = "#80A83C"; buttonText = "Pause"; break;
					case "paused": color = "#F76D36"; textColor = "#C96E4A"; buttonText = "Resume"; break;
				}

				return { 
					state: "Graphics loop " + pEngine.data.graphicsThread.state, 
					color: color, 
					textColor: textColor,
					disabled: false,
					buttonText: buttonText
				};
			}
		}
	}),

	graphicsChart: Ember.computed('pEngine.connected', 'pEngine.dataLenght', 'pEngine.refreshRate', 'pEngine.data.graphicsThread.frames.@each',
	{
		get() 
		{
			const pEngine = this.get('pEngine');
			
			
			var labels = Array.apply(null, {length: pEngine.dataLenght}).map(Number.call, function (num)
			{
				return Math.round(((pEngine.dataLenght - num) + 1) * pEngine.refreshRate * 100) / 100;
			});

			var color = pEngine.connected ? "#C28AD1" : "#555555";

			function shadeColor(color, percent) 
			{
				var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
				return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
			}

			var that = this;

			var struct =
			{
				data:
				{
					labels: labels,
					datasets: 
					[
						{
							fill: 'origin', 
							label: ["Graphics - Textures"], 
							backgroundColor: [color],
							borderColor: ['rgba(0,0,0,0.3)'],
							borderWidth: 1,
							data: []
						},

						{
							fill: 'origin', 
							label: ["Graphics - Buffers"], 
							backgroundColor: [shadeColor(color, 0.2)],
							borderColor: ['rgba(0,0,0,0.3)'],
							borderWidth: 1,
							data: []
						},

						{
							fill: 'origin', 
							label: ["Graphics - Rendering"], 
							backgroundColor: [shadeColor(color, 0.5)],
							borderColor: ['rgba(0,0,0,0.3)'],
							borderWidth: 1,
							data: []
						},

						{
							fill: 'origin', 
							label: ["Graphics - Swap"], 
							backgroundColor: [shadeColor(color, 0.7)],
							borderColor: ['rgba(0,0,0,0.3)'],
							borderWidth: 1,
							data: []
						}
					]
				},

				settings:
				{
					animation:
					{
						duration: 0
					},

					legend:
					{
						display: false
					},

					layout: 
					{
						padding: 0
					},

					elements: 
					{
						point:
						{
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
				}
			}

			// - Population
			for (var i = 0; i < pEngine.dataLenght; i++) 
			{
				struct.data.datasets[0].data.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".textures"));
				struct.data.datasets[1].data.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".buffers"));
				struct.data.datasets[2].data.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".rendering"));
				struct.data.datasets[3].data.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".swap"));
			}

			return struct;
		}
	}),

});

export default Ember.Route.extend(
{
	pEngine: Ember.inject.service('pengine'),

	model()
	{
		return DataModel.create(
		{ 
			pEngine: this.get("pEngine") 
		});
	},

	actions:
	{

		disconnect: function () 
		{
			var pEngine = this.get("pEngine");
			pEngine.disconnect();
		},

		connect: function () 
		{
			var pEngine = this.get("pEngine");
			pEngine.connect();
		},

		closeEngine: function () 
		{
			var pEngine = this.get("pEngine");
			pEngine.disconnect();
		},

		pauseInput: function () 
		{
			var state = this.get("pEngine.data.inputThread.state");
			this.set("pEngine.data.inputThread.state", state === "paused" ? "running" : "paused");
		},

		pausePhysics: function () 
		{
			var state = this.get("pEngine.data.physicsThread.state");
			this.set("pEngine.data.physicsThread.state", state === "paused" ? "running" : "paused");
		},

		pauseGraphics: function () 
		{
			var state = this.get("pEngine.data.graphicsThread.state");
			this.set("pEngine.data.graphicsThread.state", state === "paused" ? "running" : "paused");
		}

	}

});
