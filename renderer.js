// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let http = require('./assets/js/serverCalls.js')
let util = require('./assets/js/utilities.js')
let render = require('./assets/templates/jobCard.js')
let $ = require('./assets/js/eventHandlers.js')
let moment = require('./vendor/moment.js')

let baseUrl = 'http://localhost:9001'
let currentWeekTime;

http.get('http://localhost:9001/', function(data) {
  let response = util.parse(data.response)
  currentWeekTime = response.total_time
  let renderedHtml = render.jobs(response.jobs)
  $.grabById('jobs').innerHTML = renderedHtml
})

let updateCurrentTime = (currentTime) => {
  $.grabById('currentTime').innerHTML = moment().format('h:mm')
  $.grabById('currentSeconds').innerHTML = moment().format(':ss a')
}

// let updateCurrentWeekTime = (currentWeekTime) => {
//   $.grabById('currentWeekTime').innerHTML = currentWeekTime
//   $.grabById('currentWeekSeconds').innerHTML = moment().format(':ss a')
// }

// let updateCurrentWeekTimeSeconds = (currentWeekTime) => {
//   currentWeekTime += 1
//   $.grabById('currentWeekTime').innerHTML = currentWeekTime
//   $.grabById('currentWeekSeconds').innerHTML = moment().format(':ss a')
// }

setInterval(
  function() {
    updateCurrentTime(currentTime)
  }, 1000)

// setInterval(
//   function() {
//     updateCurrentWeekTime(currentTime)
//   }, 60000)

$.on("click", "#clock-in-btn", (event) => {
  let id = $.grabAttr('jobid')
  let time = moment().format()

  params = {
    jobId: id,
    time: time
  }

  http.post(`${baseUrl}/time/clockIn`, params, (data) => {
    let response = util.parse(data.response)

    if(response.success) {
      $.setAttr($.grabById('clock-out-btn'), 'timeId', response.timeId)
      $.grabById('clock-in-btn').style.display = 'none'
      $.grabById('clock-out-btn').style.display = 'inline-block'
    }
  })
});

$.on("click", "#clock-out-btn", (event) => {
  let id = $.grabAttr('timeId')
  let time = moment().format()

  params = {
    timeId: id,
    time: time
  }

  http.put(`${baseUrl}/time/clockOut`, params, (data) => {
    let response = util.parse(data.response)

    if(response.success) {
      $.grabById('clock-out-btn').style.display = 'none'
      $.grabById('clock-in-btn').style.display = 'inline-block'
    }
  })
})



