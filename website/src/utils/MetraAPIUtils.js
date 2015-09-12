const apiURL = 'http://127.0.0.1:8000/api/metra/';

export default {
  
  getAllLines() {
    return axios.get(apiURL + 'lines');
  },

  getStationsFromLine(line) {
  	return axios.get(apiURL + 'stations?line=' + line);
  }

};