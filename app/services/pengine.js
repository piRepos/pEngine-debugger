import Ember from 'ember';

export default Ember.Service.extend(
{

	data:
	{
		runningGame: "WaveDash",
		engineVersion: "1.0.5"
	},

	// - Data update
	refreshRate: 0.4,
	canUpdate: true,

	// - Socket
	socketHandler: null,
	endpointIp: "127.0.0.1",
	endpointPort: 8855,

	// - Status
	connected: true,

	init()
	{

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
