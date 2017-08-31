import Ember from 'ember';

export default Ember.Component.extend(
{

	classNames: ["index-indicator"],

	/**
	 * Indicator title.
	 * @type {String}
	 */
	title: "Frame drop",

	/**
	 * Current first numeric value.
	 * @type {Number}
	 */
	firstValue: 0,

	/**
	 * Current second numeric value.
	 * @type {Number}
	 */
	secondValue: 0,

	/**
	 * Warning filter for percentile data
	 * @param  {Function} value Current percentile value
	 * @return {Function}       True if warning section
	 */
	warningTreshold: (value) => value > 1 || value < -1,

	/**
	 * Warning filter for percentile data
	 * @param  {Function} value Current percentile value
	 * @return {Function}       True if warning section
	 */
	dangerTreshold: (value) => value > 2 || value < -2,

	index: Ember.computed('firstValue', 'secondValue', function () 
	{
		var firstValue = this.get("firstValue");
		var secondValue = this.get("secondValue");

		return Math.round(((firstValue / secondValue) - 1 ) * 10) / 10;
	}),

	color: Ember.computed('index', 'warningTreshold', 'dangerTreshold', function () 
	{
		var index = this.get("index");
		var warningTreshold = this.get("warningTreshold");
		var dangerTreshold = this.get("dangerTreshold");

		if (dangerTreshold(index))
			return "background: #E55E5E";
		if (warningTreshold(index))
			return "background: #EADC62";
		return "background: #55E06E";
	}),

	arrows: Ember.computed('index', function () 
	{
		var index = this.get("index");

		var down = "<span style='color: #55E06E'>▼</span>";
		var up = "<span style='color: #E55E5E'>▲</span>";
		var eq = "<span style='color: #55E06E'>●</span>";

		if (index > 0)
			return { first: up, second: down };
		else if (index > 0)
			return { first: down, second: up };
		else
			return { first: eq, second: eq };
		
	}),
});
