const apiURL = 'http://127.0.0.1:8000/api/metra/';

export default {
  
  getAllLines() {
    return axios.get(apiURL + 'lines');
  },

  getStationsFromLine(line) {
  	return axios.get(apiURL + 'stations/?line=' + line);
  },

  getSchedule(line, station_from, station_to, day) {
  	return axios.get(apiURL + 'rides/?line=' + line + '&station_from=' + station_from + '&station_to=' + station_to + '&day=' + day);
  }

};