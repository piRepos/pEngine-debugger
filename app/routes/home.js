import Ember from 'ember';

const DataModel = Ember.Object.extend(
{
	pEngine: null,

	init()
	{

	},

	currentTime: 0,

	statesColorThreads:
	[
		{ state: 'running', color: '#ABE050', buttonText: "Pause", buttonIcon: "", disabled: false },
		{ state: 'paused', color: '#F76D36', buttonText: "Resume", buttonIcon: "", disabled: false },
		{ state: 'stopped', color: '#777777', buttonText: "Resume", buttonIcon: "", disabled: true }
	],

	statesColorEngine:
	[
		{ state: 'running', color: '#4CE0D2', buttonText: "Pause", buttonIcon: "", disabled: false },
		{ state: 'stopped', color: '#777777', buttonText: "Resume", buttonIcon: "", disabled: true }
	],

	graphicsChart: Ember.computed('pEngine.connected', 'pEngine.dataLenght', 'pEngine.rawData.graphicsThread.state', 'pEngine.rawData.graphicsThread.frames.@each',
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
				data.textures.pushObject(this.get("pEngine.rawData.graphicsThread.frames." + i + ".textures"));
				data.buffers.pushObject(this.get("pEngine.rawData.graphicsThread.frames." + i + ".buffers"));
				data.rendering.pushObject(this.get("pEngine.rawData.graphicsThread.frames." + i + ".rendering"));
				data.swap.pushObject(this.get("pEngine.rawData.graphicsThread.frames." + i + ".swap"));
			}

			var color = "#444444";
			var state = this.get('pEngine.connected') ? this.get('pEngine.rawData').graphicsThread.state : 'stopped';

			switch (state)
			{
				case "running": color = "#C28AD1"; break;
				case "paused": color = "#C4562B"; break;
				case "stopped": color = "#444444"; break;
			}

			return { data: data, color: color };
		}
	}),

	physicsChart: Ember.computed('pEngine.connected', 'pEngine.dataLenght', 'pEngine.rawData.physicsThread.state', 'pEngine.rawData.physicsThread.frames.@each',
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
				data.update.pushObject(this.get("pEngine.rawData.physicsThread.frames." + i + ".update"));
				data.assets.pushObject(this.get("pEngine.rawData.physicsThread.frames." + i + ".assets"));
				data.dependencies.pushObject(this.get("pEngine.rawData.physicsThread.frames." + i + ".dependencies"));
			}

			var color = "#444444";
			var state = this.get('pEngine.connected') ? this.get('pEngine.rawData').physicsThread.state : 'stopped';

			switch (state)
			{
				case "running": color = "#8ACDD1"; break;
				case "paused": color = "#C4562B"; break;
				case "stopped": color = "#444444"; break;
			}

			return { data: data, color: color };
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
			var state = this.get("pEngine.rawData.inputThread.state");
			this.set("pEngine.rawData.inputThread.state", state === "paused" ? "running" : "paused");
		},

		pausePhysics: function () 
		{
			var state = this.get("pEngine.rawData.physicsThread.state");
			this.set("pEngine.rawData.physicsThread.state", state === "paused" ? "running" : "paused");
		},

		pauseGraphics: function () 
		{
			var state = this.get("pEngine.rawData.graphicsThread.state");
			this.set("pEngine.rawData.graphicsThread.state", state === "paused" ? "running" : "paused");
		}

	}

});
