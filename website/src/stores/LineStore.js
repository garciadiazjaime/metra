const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../dispatcher/AppDispatcher');
const LineConstants = require('../constants/LineConstants');
const LineActions = require('../actions/LineActions');
import MetraAPI from '../utils/MetraAPIUtils';

const CHANGE_EVENT = 'change';

const _data = {
  cacheStations: {},
  selectedLine: null,
  lines: [],
  stations: []
};

let LineStore = assign({}, EventEmitter.prototype, {

  getLines() {
    return _data.lines;
  },

  getSelectedLine() {
    return _data.selectedLine;
  },

  getStations() {
    return _data.stations;
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

function setSelectedLine(line){
  _data.selectedLine = line;
}

function cacheStations(line, stations) {
  if(!_data.cacheStations[line]){
    _data.cacheStations[line] = stations;
  }
}

function setStations(stations) {
  _data.stations = stations ? stations : [];
}

AppDispatcher.register(function(action){

  switch(action.actionType) {
    // ---- LINES
    case LineConstants.REQUEST_LINES:
    if(!_data.lines.length){
      MetraAPI.getAllLines()
        .then(function (response) {
          setLines(response.data);
          LineStore.emitChange();
          LineActions.requestSations(response.data[0].id);
          setSelectedLine(response.data[0].id);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
    break;

    // ---- STATIONS
    case LineConstants.REQUEST_STATIONS:
      setSelectedLine(action.line);
      if(action.line && !_data.cacheStations[action.line]){
        MetraAPI.getStationsFromLine(action.line)
          .then(function (response) {
            cacheStations(action.line, response.data);
            setStations(response.data);
            LineStore.emitChange();
          })
          .catch(function (response) {
            console.log(response);
          });
      }
      else{
        setStations(_data.cacheStations[action.line]);
        LineStore.emitChange();
      }
    break;

    // ---- SCHEDULE
    case LineConstants.REQUEST_SCHEDULE:
      MetraAPI.getSchedule()
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {

        });

    default:
      // no op
  }
});

export default LineStore;