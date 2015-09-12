const apiURL = 'http://127.0.0.1:8000/api/metra/lines/';

export default {
  
  getAllLines() {
    return axios.get(apiURL);
  }

};