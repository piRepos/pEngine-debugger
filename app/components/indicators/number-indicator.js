import Ember from 'ember';

export default Ember.Component.extend(
{

	classNames: ["number-indicator"],

	/**
	 * Indicator title.
	 * @type {String}
	 */
	title: "Frame drop",

	/**
	 * Name of the measure unit.
	 * @type {String}
	 */
	description: "frames",

	/**
	 * Current numeric value.
	 * @type {Number}
	 */
	value: 0
});
