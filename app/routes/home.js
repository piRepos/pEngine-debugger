import Ember from 'ember';

const DataModel = Ember.Object.extend(
{
	pEngine: null,

	init()
	{

	},

	currentTime: 0,

	statesColorEngine:
	[
		{ state: 'running', color: '#4CE0D2', buttonText: "Close", buttonIcon: "", disabled: false },
		{ state: 'stopped', color: '#777777', buttonText: "Resume", buttonIcon: "", disabled: true }
	],

	dataToSeriesConverter(rawData)
	{
		if (rawData.length <= 0)
			return [];

		var fieldsCount = Object.keys(rawData[0]).length;

		var data = {};

		for (var i = 0; i < rawData.length; i++)
		{
			for (var field in rawData[i]) 
			{
				if (rawData[i].hasOwnProperty(field)) 
				{
					if (data[field] === undefined)
						data[field] = [];

					data[field].push(rawData[i][field]);
				}
			}
		}

		return data;
	},

	sideInformations: Ember.computed('pEngine.rawData.{}', function () 
	{
		var data = 
		[
			{
				title: "Informations",
				data:
				[
					{ name: "Game name", value: this.get("pEngine.rawData.runningGame") },
					{ name: "Engine version", value: this.get("pEngine.rawData.engineVersion") },
					{ name: "Runtime mode", value: this.get("pEngine.rawData.runningMode") },
					{ name: "Active threads", value: this.get("pEngine.rawData.system.threads.length") }
				]
			},

			{
				title: "System informations",
				data:
				[
					{ name: "Platform", value: this.get("pEngine.rawData.system.OS") },
					{ name: "Motherboard", value: this.get("pEngine.rawData.system.motherBoard") },
					{ name: "CPU", value: this.get("pEngine.rawData.system.CPU") },
					{ name: "RAM", value: this.get("pEngine.rawData.system.RAM") },
					{ name: "GPU", value: this.get("pEngine.rawData.system.videoCard.name") }
				]
			},

			{
				title: "Video informations",
				data:
				[
					{ name: "Graphics card", value: this.get("pEngine.rawData.system.videoCard.name") },
					{ name: "Vendor", value: this.get("pEngine.rawData.system.videoCard.vendor") },
					{ name: "OpenGL version", value: this.get("pEngine.rawData.system.videoCard.openGLVersion") },
					{ name: "Monitors", value: this.get("pEngine.rawData.system.videoCard.monitors") }
				]
			}
		];

		return data;
	}),

	graphicsChart: Ember.computed('pEngine.connected', 'pEngine.rawData.graphicsThread.state', 'pEngine.rawData.graphicsThread.frames.[]',
	{
		get() 
		{
			const rawData = this.get('pEngine.rawData.graphicsThread.frames');
			var state = this.get("pEngine.connected") ? this.get("pEngine.rawData.graphicsThread.state") : "stopped";
			var color = "";

			switch (state)
			{
				case "running": color = "#C28AD1"; break;
				case "paused": color = "#C4562B"; break;
				case "stopped": color = "#444444"; break;
			}

			return { data: this.dataToSeriesConverter(rawData), color: color };
		}
	}),

	physicsChart: Ember.computed('pEngine.connected', 'pEngine.rawData.physicsThread.state', 'pEngine.rawData.physicsThread.frames.[]',
	{
		get() 
		{
			const rawData = this.get('pEngine.rawData.physicsThread.frames');
			var state = this.get("pEngine.connected") ? this.get("pEngine.rawData.physicsThread.state") : "stopped";
			var color = "";

			switch (state)
			{
				case "running": color = "#8ACDD1"; break;
				case "paused": color = "#C4562B"; break;
				case "stopped": color = "#444444"; break;
			}

			return { data: this.dataToSeriesConverter(rawData), color: color };
		}
	}),

	inputChart: Ember.computed('pEngine.connected', 'pEngine.rawData.inputThread.state', 'pEngine.rawData.inputThread.frames.[]',
	{
		get() 
		{
			const rawData = this.get('pEngine.rawData.inputThread.frames');
			var state = this.get("pEngine.connected") ? this.get("pEngine.rawData.inputThread.state") : "stopped";
			var color = "";

			switch (state)
			{
				case "running": color = "#5CC970"; break;
				case "paused": color = "#C4562B"; break;
				case "stopped": color = "#444444"; break;
			}

			return { data: this.dataToSeriesConverter(rawData), color: color };
		}
	})

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
