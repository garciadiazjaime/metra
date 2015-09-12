const AppDispatcher = require('../dispatcher/AppDispatcher');
const LineConstants = require('../constants/LineConstants');


const LineActions = {

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

module.exports = LineActions;