import Ember from 'ember';

export default Ember.Component.extend(
{

	classNames: ["program-settings"],

	window: Ember.inject.service('window'),
	pEngine: Ember.inject.service('pengine'),

	// - General settings
	refreshRate: 0,
	closeEngine: false,
	disableAudio: false,
	
	// - Connection settings
	ip: "",
	port: 0,
	batching: false,


	setup: Ember.observer("window.settings.open", function()
	{
		var pEngine = this.get("pEngine");

		this.setProperties(
		{
			refreshRate: pEngine.refreshRate,
			ip: pEngine.endpointIp,
			port: pEngine.endpointPort
		});

    }),

	actions:
	{

		save: function () 
		{
			var window = this.get("window");

			this.setProperties(
			{
				"pEngine.refreshRate": this.get("refreshRate"),
				"pEngine.endpointIp": this.get("ip"),
				"pEngine.endpointPort": this.get("port")
			});

			window.toggleSettings();
		},

		close: function () 
		{
			var window = this.get("window");
			window.toggleSettings();
		}
	}

});
