const apiURL = 'http://127.0.0.1:8000/api/metra/';

export default {
  
  getAllLines() {
    return axios.get(apiURL + 'lines');
  },

  getStationsFromLine(line) {
  	return axios.get(apiURL + 'stations?line=' + line);
  },

  getSchedule() {
  	const metraApi = 'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_train_data.json?line=NCS&origin=ANTIOCH&destination=LAKEVILLA&date=09/14/2015&futureOnly=false';
  	return axios.get(metraApi);
  }

};