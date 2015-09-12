import AppDispatcher from '../dispatcher/AppDispatcher';
import LineConstants from '../constants/LineConstants';


export default {

  requestLines() {
    AppDispatcher.dispatch({
      actionType: LineConstants.REQUEST_LINES
    });
  },

  setLines(lines) {
  	AppDispatcher.dispatch({
  		actionType: LineConstants.SET_LINES,
  		lines: lines
  	})
  }

};