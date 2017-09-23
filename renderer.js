// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//let $ = require('./vendor/jquery-3.2.1.min.js');
let request = require('./assets/js/serverCalls.js')
let util = require('./assets/js/utilities.js')
let card = require('./assets/templates/jobCard.js')

  request.get('http://localhost:9001/', function(data) {
    let response = util.parse(data.response)
    console.log(response)
    let finalHtml = '';
    for (var i = 0; i < response.jobs.length; i++) {
      finalHtml += "<div>" + response.jobs[i].name + "<div>"
      document.getElementById('container').innerHTML = card.renderCard(response.jobs[i].name, "I'm a description")
    }
    document.getElementById('jobs').innerHTML = finalHtml
  })
