import Ember from 'ember';

export default Ember.Service.extend(
{

	// - Data update
	refreshRate: 0.1,
	cacheSize: 20,
	dataLenght: Ember.computed("refreshRate", "cacheSize", function()
	{
		return this.get("cacheSize") / this.get("refreshRate");
	}),
	canUpdate: true,

	// - Socket
	socketHandler: null,
	endpointIp: "127.0.0.1",
	endpointPort: 8855,

	// - Status
	connected: true,

	rawData:
	{
			runningGame: "WaveDash",
			engineVersion: "1.0.5",
			runningMode: "Debug",

			system:
			{
				OS: "Windows 10",
				motherBoard: "Asus P8P67 M-PRO rev",
				CPU: "intel i7 2600k 4.1ghz",
				RAM: "16gb 2600mhz",

				videoCard:
				{
					name: "Nvidia GTX970 XFX",
					vendor: "Nvidia",
					openGLVersion: "4.2 Core",
					monitors: 2
				},

				threads:
				[
					{ name: "GraphicsThread", PID: 12314 },
					{ name: "InputThread", PID: 12314 },
					{ name: "PhysicsThread", PID: 12314 }
				]
			},

			graphicsThread:
			{
				state: "running",

				frames: []
			},

			physicsThread:
			{
				state: "running",

				frames: []
			},

			inputThread:
			{
				state: "running",

				frames: []
			}
		},


	init()
	{
		var that = this;

		this.resetData();

		function updater() 
		{
			var data = that.get("rawData");
			var dataLength = that.get("dataLenght");

			var v1 = Math.random() * 15;
			var v2 = Math.random() * 15;
			var v3 = Math.random() * 15 + 20;
			var v4 = 100 - (v1 + v2 + v3);

			data.graphicsThread.frames.pushObject(
			{
				textures: v1, 
				buffers: v2, 
				rendering: v3, 
				swap: v4
			});

			var v1 = 30 + Math.random() * 15;
			var v2 = 10 + Math.random() * 15;
			var v3 = 100 - (v1 + v2);

			data.physicsThread.frames.pushObject(
			{
				update: v1, 
				assets: v2, 
				dependencies: v3,
			});

			var v1 = 30 + Math.random() * 25;
			var v2 = 100 - (v1);

			data.inputThread.frames.pushObject(
			{
				messages: v1, 
				processing: v2,
			});

			that.set("rawData", data);

			that.set("rawData.graphicsThread.frames", data.graphicsThread.frames.slice(Math.max(0, data.graphicsThread.frames.length - dataLength)));
			that.set("rawData.physicsThread.frames", data.physicsThread.frames.slice(Math.max(0, data.physicsThread.frames.length - dataLength)));
			that.set("rawData.inputThread.frames", data.inputThread.frames.slice(Math.max(0, data.inputThread.frames.length - dataLength)));

			setTimeout(updater, that.get("refreshRate") * 1000);

		}

		updater();
	},

	resetData()
	{
		var data = this.get("rawData");
		var dataLenght = this.get("dataLenght");

		for (var i = 0; i < dataLenght; i++) 
		{
			var v1 = Math.random() * 15;
			var v2 = Math.random() * 15;
			var v3 = Math.random() * 15 + 20;
			var v4 = 100 - (v1 + v2 + v3);

			data.graphicsThread.frames.pushObject(
			{
				textures: 1, 
				buffers: 1, 
				rendering: 1, 
				swap: 1
			});
		}

		for (var i = 0; i < dataLenght; i++) 
		{
			var v1 = 30 + Math.random() * 15;
			var v2 = 10 + Math.random() * 15;
			var v3 = 100 - (v1 + v2);

			data.physicsThread.frames.pushObject(
			{
				update: 1, 
				assets: 1, 
				dependencies: 1,
			});
		}

		for (var i = 0; i < dataLenght; i++) 
		{
			var v1 = 30 + Math.random() * 25;
			var v2 = 100 - (v1);

			data.inputThread.frames.pushObject(
			{
				messages: 1, 
				processing: 1,
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
	},

	dataStoreParametersChange: Ember.observer('refreshRate', 'cacheSize', function () 
	{
		this.resetData();
	})

});
