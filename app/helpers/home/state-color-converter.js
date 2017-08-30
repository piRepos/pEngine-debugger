import Ember from 'ember';

export function homeStateColorConverter(params) 
{
	var state = params[1] ? params[2] : "stopped";
	var color = "";

	switch (state)
	{
		case "running": color = params[0]; break;
		case "paused": color = "#C4562B"; break;
		case "stopped": color = "#444444"; break;
	}

	return color;
}

export default Ember.Helper.helper(homeStateColorConverter);
