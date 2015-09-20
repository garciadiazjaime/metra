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
  stations: [],
  ride: [],
  stationFrom: null,
  stationTo: null,
  day: new Date().getDay() || 7
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

  getSelectedStations() {
    return {
      stationFrom: _data.stationFrom,
      stationTo: _data.stationTo,
      day: _data.day
    };
  },

  getRide() {
    return _data.ride;
  },

  resetRide() {
    _data.ride = [];
  },

  setStation(ref, value) {
    _data[ref] = value;
  },

  setDay(value) {
    _data.day = value;
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
  _data['stationFrom'] = stations ? stations[0].id : null;
  _data['stationTo'] = stations ? stations[ stations.length - 1 ].id : null;
}

function setRide(ride) {
  _data.ride = ride;
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
            const lineID = action.line ? action.line : response.data[0].id;
            LineActions.requestSations(lineID);
            setSelectedLine(lineID);
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
      MetraAPI.getSchedule(action.line, action.station_from, action.station_to, action.day)
        .then(function (response) {

          // cacheRides(action.line, response.data);
          setRide(response.data);
          LineStore.emitChange();

          const bits = response.data[0].line.split('/');
          const lineID = bits[ bits.length - 2 ];
          LineActions.requestLines(lineID);

        })
        .catch(function (response) {
          console.log(response);
        });
    break;

    default:
      // no op
  }
});

export default LineStore;