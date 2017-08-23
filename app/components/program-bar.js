import Ember from 'ember';

const remote = require('electron').remote;

export default Ember.Component.extend(
{

	classNames: ["program-bar"],

	window: Ember.inject.service('window'),

	actions:
	{

		close: function()
		{
			var window = this.get("window");
			window.close();
		},

		minimize: function () 
		{
			var window = this.get("window");
			window.minimize();
		},

		maximize: function () 
		{
			var window = this.get("window");
			window.maximize();
		},

	}

});
