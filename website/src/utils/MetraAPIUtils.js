const apiURL = 'http://127.0.0.1:8000/api/metra/';

export default {
  
  getAllLines() {
    return axios.get(apiURL + 'lines');
  },

  getStationsFromLine(line) {
  	return axios.get(apiURL + 'stations?line=' + line);
  },

  getSchedule() {
  	return axios.get(apiURL + 'rides?line=UP-N&station_from=KENOSHA&station_to=WINTHROP&day=1');
  }

};