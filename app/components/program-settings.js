import Ember from 'ember';

export default Ember.Component.extend(
{

	classNames: ["program-settings"],

	window: Ember.inject.service('window'),

	//open: Ember.computed('window', function() 
	//{
	//	return this.get("window").settings.open;
	//}),

	actions:
	{

	}

});
