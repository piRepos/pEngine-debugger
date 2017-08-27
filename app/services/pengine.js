import Ember from 'ember';

export default Ember.Service.extend(
{

	data:
	{
		runningGame: "WaveDash",
		engineVersion: "1.0.5",

		graphicsThread:
		{
			state: "running",

			frames: 
			[
			]
		},

		physicsThread:
		{
			state: "paused",

			frames: 
			[
			]
		},

		inputThread:
		{
			state: "running"
		}
	},

	// - Data update
	refreshRate: 0.4,
	dataLenght: 200,
	canUpdate: true,

	// - Socket
	socketHandler: null,
	endpointIp: "127.0.0.1",
	endpointPort: 8855,

	// - Status
	connected: true,

	init()
	{
		var vframes = [];

		for (var i = 0; i < 200; i++) 
		{
			var v1 = Math.random() * 15;
			var v2 = Math.random() * 15;
			var v3 = Math.random() * 15 + 20;
			var v4 = 100 - (v1 + v2 + v3);

			vframes.push(
			{
				textures: v1, 
				buffers: v2, 
				rendering: v3, 
				swap: v4
			});
		}

		var fframes = [];

		for (var i = 0; i < 200; i++) 
		{
			var v1 = 30 + Math.random() * 15;
			var v2 = 10 + Math.random() * 15;
			var v3 = 100 - (v1 + v2);

			fframes.push(
			{
				update: v1, 
				assets: v2, 
				dependencies: v3,
			});
		}

		this.set("data.graphicsThread.frames", vframes);
		this.set("data.physicsThread.frames", fframes);
	},

	disconnect()
	{
		this.set("connected", false);
	},

	connect()
	{
		this.set("connected", true);
	}

});
