import Ember from 'ember';

export default Ember.Component.extend(
{

	classNames: ["percentile-indicator"],

	/**
	 * Indicator title.
	 * @type {String}
	 */
	title: "Frame drop",

	/**
	 * Name of the measure unit.
	 * @type {String}
	 */
	measure: "frames",

	/**
	 * Current numeric value.
	 * @type {Number}
	 */
	value: 0,

	/**
	 * Max value that can assume value property.
	 * @type {Number}
	 */
	maximum: 70000,

	/**
	 * Minimum value that can assume value property.
	 * @type {Number}
	 */
	minimum: 0,

	/**
	 * Warning filter for percentile data
	 * @param  {Function} value Current percentile value
	 * @return {Function}       True if warning section
	 */
	warningTreshold: (value) => value > 20,

	/**
	 * Warning filter for percentile data
	 * @param  {Function} value Current percentile value
	 * @return {Function}       True if warning section
	 */
	dangerTreshold: (value) => value > 50,

	percentile: Ember.computed('value', 'maximum', 'minimum', function () 
	{
		var value = this.get("value");
		var maximum = this.get("maximum");
		var minimum = this.get("minimum");

		return Math.round(((value - minimum) / (maximum - minimum)) * 100 * 10) / 10;
	}),

	color: Ember.computed('percentile', 'warningTreshold', 'dangerTreshold', function () 
	{
		var percentile = this.get("percentile");
		var warningTreshold = this.get("warningTreshold");
		var dangerTreshold = this.get("dangerTreshold");

		if (dangerTreshold(percentile))
			return "background: #E55E5E";
		if (warningTreshold(percentile))
			return "background: #EADC62";
		return "background: #55E06E";
	})
});
