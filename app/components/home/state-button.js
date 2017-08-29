import Ember from 'ember';

function shadeColor(color, percent) 
{
	var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export default Ember.Component.extend(
{

	classNames: ["state-button"],

	/**
	 * Current state
	 * @type {String}
	 */
	currentState: "",

	/**
	 * The state text
	 * @type {String}
	 */
	text: "",

	/**
	 * List of pair state - color
	 * @type {List}
	 */
	statesColor: 
	[
		{ state: 'running', color: '#ABE050', buttonText: "Pause", buttonIcon: "", disabled: false },
		{ state: 'paused', color: '#F76D36', buttonText: "Resume", buttonIcon: "", disabled: false },
		{ state: 'stopped', color: '#777777', buttonText: "Resume", buttonIcon: "", disabled: true }
	],

	buttonText: Ember.computed('statesColor', 'currentState', function () 
	{
		var colors = this.get("statesColor");
		var currentState = this.get("currentState");

		var state = colors.find((x) => x.state === currentState);

		if (state === undefined)
			return "";

		return state.buttonText;
	}),

	buttonIcon: Ember.computed('statesColor', 'currentState', function () 
	{
		var colors = this.get("statesColor");
		var currentState = this.get("currentState");

		var state = colors.find((x) => x.state === currentState);

		if (state === undefined)
			return "";

		return state.buttonIcon;
	}),

	stateColor: Ember.computed('statesColor', 'currentState', function () 
	{
		var colors = this.get("statesColor");
		var currentState = this.get("currentState");

		var state = colors.find((x) => x.state === currentState);

		if (state === undefined)
			return "#000000";

		return state.color;
	}),

	textColor: Ember.computed('stateColor', function () 
	{
		return shadeColor(this.get("stateColor"), -0.2);
	}),

	disabled: Ember.computed('statesColor', 'currentState', function () 
	{
		var colors = this.get("statesColor");
		var currentState = this.get("currentState");

		var state = colors.find((x) => x.state === currentState);

		if (state === undefined)
			return true;

		return state.disabled;
	}),

	actions:
	{

		click: function () 
		{
			this.sendAction("onClick");
		}

	}

});
