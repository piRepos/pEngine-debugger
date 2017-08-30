import Ember from 'ember';

const DataModel = Ember.Object.extend(
{
	pEngine: null,

	physicsThread: Ember.computed.alias("pEngine.rawData.physicsThread"),
	graphicsThread: Ember.computed.alias("pEngine.rawData.graphicsThread"),
	inputThread: Ember.computed.alias("pEngine.rawData.inputThread"),

	init()
	{

	},

	currentTime: 0,

	statesColorEngine:
	[
		{ state: 'running', color: '#4CE0D2', buttonText: "Close", buttonIcon: "", disabled: false },
		{ state: 'stopped', color: '#777777', buttonText: "Resume", buttonIcon: "", disabled: true }
	],

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
