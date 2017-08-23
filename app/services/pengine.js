import Ember from 'ember';

export default Ember.Service.extend(
{

	data:
	{
		runningGame: "WaveDash",
		engineVersion: "1.0.5"
	},

	refreshRate: 0.4,
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
