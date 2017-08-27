import Ember from 'ember';

export default Ember.Component.extend(
{

	classNames: ["state-button"],

	// - Data settings
	currentState: "",
	stateColor: "",
	textColor: "",

	// - Button settings
	disabled: false,
	buttonText: "",
	buttonIcon: "",

	actions:
	{

		click: function () 
		{
			this.sendAction("onClick");
		}

	}

});
