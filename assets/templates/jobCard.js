
var jobs = function(dataGroup) {
  let finalHtml = '<div>';
  for (var i = 0; i < dataGroup.length; i++) {
    finalHtml += `<h4>${dataGroup[i].name}</h4><button class="btn" jobId=${dataGroup[i].id} id="clock-in-btn">Clock In</button><button class="btn" jobId=${dataGroup[i].id} id="clock-out-btn">Clock Out</button>`
  }
  finalHtml += '</div>'
  return finalHtml
}

module.exports = {
  jobs: jobs
}