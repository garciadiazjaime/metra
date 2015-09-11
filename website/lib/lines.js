'use strict';

var metraLines = [
  { 
  	title: 'Union Pacific',
  	location: 'North Line',
  	code: 'UP-N',
  	stations: [
  		{
  			title: 'Kenosha',
        schedule: [
          {
              departure: '14:02',
              arrival: '14:18',
              train: '325',
              id: 1
          },
          {
              departure: '17:21',
              arrival: '17:39',
              train: '324',
              id: 2
          },
          {
              departure: '18:21',
              arrival: '18:27',
              train: '305',
              id: 3
          }
        ],
  			id: 1
  		},
  		{
  			title: 'Winthrop Harbor',
        schedule: [
          {
              departure: '14:02',
              arrival: '14:18',
              train: '325',
              id: 1
          },
          {
              departure: '17:21',
              arrival: '17:39',
              train: '324',
              id: 2
          },
          {
              departure: '18:21',
              arrival: '18:27',
              train: '305',
              id: 3
          }
        ],
  			id: 2
  		}
  	],
    id: 1
  },
  { 
  	title: 'Milwaukee District',
  	location: 'North Line',
  	code: 'MD-N',
  	stations: [
  		{
  			title: 'Fox Lake',
        schedule: [
          {
              departure: '14:02',
              arrival: '14:18',
              train: '325',
              id: 1
          },
          {
              departure: '17:21',
              arrival: '17:39',
              train: '324',
              id: 2
          },
          {
              departure: '18:21',
              arrival: '18:27',
              train: '305',
              id: 3
          }
        ],
  			id: 3
  		},
  		{
  			title: 'Ingleside',
        schedule: [
          {
              departure: '14:02',
              arrival: '14:18',
              train: '325',
              id: 1
          },
          {
              departure: '17:21',
              arrival: '17:39',
              train: '324',
              id: 2
          },
          {
              departure: '18:21',
              arrival: '18:27',
              train: '305',
              id: 3
          }
        ],
  			id: 4
  		}
  	],
    id: 2
  }
];

module.exports = metraLines;
