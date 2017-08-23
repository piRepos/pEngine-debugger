import Ember from 'ember';

var electron = require("electron");

export default Ember.Service.extend(Ember.Evented,
{

	handler: null,

	init()
	{
		this._super(...arguments);
		this.set('handler', electron.remote.getCurrentWindow())
	},

	getHandler()
	{
		return this.get("handler");
	},

	close()
	{
		var window = this.get("handler");

		this.trigger('closing');

		window.close();
	},

	minimize()
	{
		var window = this.get("handler");

		this.trigger('minimizing');

		window.minimize();
	},

	maximize()
	{
		var window = this.get("handler");

		if (window.isMaximized())
		{
			this.trigger('unmaximizing');
			window.unmaximize();
		}
		else
		{
			this.trigger('maximizing');
			window.maximize();
		}
	}

});
