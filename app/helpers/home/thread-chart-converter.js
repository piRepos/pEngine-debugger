import Ember from 'ember';

function dataToSeriesConverter(rawData)
{
	if (rawData.length <= 0)
		return [];

	var fieldsCount = Object.keys(rawData[0]).length;

	var data = {};

	for (var i = 0; i < rawData.length; i++)
	{
		for (var field in rawData[i]) 
		{
			if (rawData[i].hasOwnProperty(field)) 
			{
				if (data[field] === undefined)
					data[field] = [];

				data[field].push(rawData[i][field]);
			}
		}
	}

	return data;
}

export function homeThreadChartConverter(params) 
{
	var frames = params[0];

	return dataToSeriesConverter(frames);
}

export default Ember.Helper.helper(homeThreadChartConverter);
