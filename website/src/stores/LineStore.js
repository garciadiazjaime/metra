const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../dispatcher/AppDispatcher');
const LineConstants = require('../constants/LineConstants');
const LineActions = require('../actions/LineActions');
import MetraAPI from '../utils/MetraAPIUtils';

const CHANGE_EVENT = 'change';

const _data = {
  lines: []
};

const LineStore = assign({}, EventEmitter.prototype, {

  getLines() {
    return _data.lines;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

function setLines(lines){
  _data.lines = lines;
}

AppDispatcher.register(function(action){
  switch(action.actionType) {
    case LineConstants.REQUEST_LINES:
        MetraAPI.getAllLines().then(function (response) {
          LineActions.setLines(response.data);
        })
        .catch(function (response) {
          console.log(response);
        });
      break;
    case LineConstants.SET_LINES:
        setLines(action.lines);
        LineStore.emitChange();
      break;
    default:
      // no op
  }
});

export default LineStore;