import AppDispatcher from '../dispatcher/AppDispatcher';
import LineConstants from '../constants/LineConstants';


export default {

  // ---- LINES
  requestLines() {
    AppDispatcher.dispatch({
      actionType: LineConstants.REQUEST_LINES
    });
  },

  // ---- STATIONS
  requestSations(line) {
    AppDispatcher.dispatch({
      actionType: LineConstants.REQUEST_STATIONS,
      line: line
    })
  }

};