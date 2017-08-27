import Ember from 'ember';

const DataModel = Ember.Object.extend(
{
	pEngine: null,

	init()
	{

	},

	currentTime: 0,

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

			var data = 
			{
				textures: [],
				buffers: [],
				rendering: [],
				swap: []
			};

			// - Population
			for (var i = 0; i < pEngine.dataLenght; i++) 
			{
				data.textures.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".textures"));
				data.buffers.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".buffers"));
				data.rendering.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".rendering"));
				data.swap.pushObject(this.get("pEngine.data.graphicsThread.frames." + i + ".swap"));
			}

			return data;
		}
	}),

	physicsChart: Ember.computed('pEngine.connected', 'pEngine.dataLenght', 'pEngine.refreshRate', 'pEngine.data.physicsThread.frames.@each',
	{
		get() 
		{
			const pEngine = this.get('pEngine');

			var data = 
			{
				update: [],
				assets: [],
				dependencies: []
			};

			// - Population
			for (var i = 0; i < pEngine.dataLenght; i++) 
			{
				data.update.pushObject(this.get("pEngine.data.physicsThread.frames." + i + ".update"));
				data.assets.pushObject(this.get("pEngine.data.physicsThread.frames." + i + ".assets"));
				data.dependencies.pushObject(this.get("pEngine.data.physicsThread.frames." + i + ".dependencies"));
			}

			return data;
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
