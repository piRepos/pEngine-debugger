import Ember from 'ember';

export default Ember.Component.extend(
{

	// - Style
	classNames: ["connection-manager"],

	// - Data
	connected: false,
	refreshRate: 0.4,

	actions:
	{

		connectToggle: function () 
		{
			var connected = this.get("connected");

			if (connected)
			{
				this.sendAction("disconnect");
			}
			else 
			{
				this.sendAction("connect");
			}
		}

	}

});
