import Ember from 'ember';

export default Ember.Route.extend(
{


	model()
	{
		return {
			chartData:
			{
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		        datasets: 
		        [
		            {fill: 'origin', label: "Dog", data: [12, 19, 3, 5, 2, 3]}
		        ]
			}
		}
	}

});
