// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let http = require('./assets/js/serverCalls.js')
let util = require('./assets/js/utilities.js')
let render = require('./assets/templates/jobCard.js')
let $ = require('./assets/js/eventHandlers.js')
let moment = require('./vendor/moment.js')

let JobsComponent = require('./components/jobs.js');
let jobs = new JobsComponent(http, util, render, $, moment)

jobs.renderComponent()
jobs.getJobs()
jobs.listen()


let updateCurrentTime = (currentTime) => {
  $.grabById('currentTime').innerHTML = moment().format('h:mm')
  $.grabById('currentSeconds').innerHTML = moment().format(':ss a')
}

// // let updateCurrentWeekTime = (currentWeekTime) => {
// //   $.grabById('currentWeekTime').innerHTML = currentWeekTime
// //   $.grabById('currentWeekSeconds').innerHTML = moment().format(':ss a')
// // }

// // let updateCurrentWeekTimeSeconds = (currentWeekTime) => {
// //   currentWeekTime += 1
// //   $.grabById('currentWeekTime').innerHTML = currentWeekTime
// //   $.grabById('currentWeekSeconds').innerHTML = moment().format(':ss a')
// // }

setInterval(
  function() {
    updateCurrentTime(currentTime)
  }, 1000)




