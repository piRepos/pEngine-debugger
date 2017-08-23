import Ember from 'ember';

export default Ember.Route.extend(
{
	pEngine: Ember.inject.service('pengine'),

	model()
	{
		var pEngine = this.get("pEngine");

		var viewModel = 
		{
			pEngine: pEngine
		};

		return viewModel;
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
		}

	}

});
