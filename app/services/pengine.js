import Ember from 'ember';

export default Ember.Service.extend(
{

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
		var data = 
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
		};

		for (var i = 0; i < 200; i++) 
		{
			var v1 = Math.random() * 15;
			var v2 = Math.random() * 15;
			var v3 = Math.random() * 15 + 20;
			var v4 = 100 - (v1 + v2 + v3);

			data.graphicsThread.frames.push(
			{
				textures: v1, 
				buffers: v2, 
				rendering: v3, 
				swap: v4
			});
		}

		for (var i = 0; i < 200; i++) 
		{
			var v1 = 30 + Math.random() * 15;
			var v2 = 10 + Math.random() * 15;
			var v3 = 100 - (v1 + v2);

			data.physicsThread.frames.push(
			{
				update: v1, 
				assets: v2, 
				dependencies: v3,
			});
		}

		this.set("rawData", data);
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
