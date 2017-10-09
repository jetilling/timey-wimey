
class JobsComponent {

  constructor(http, util, render, $, moment) {
    this.http = http;
    this.util = util;
    this.render = render;
    this.$ = $;
    this.moment = moment;
  }

  renderComponent() {
    this.renderHtml(
        `<div class='row center-align'>
        </div>
        <div class="row">
            <div id="jobs"></div>
        </div>
        <div class="container" id="container">
        </div>`
    )
  }

  renderHtml(html) {
    this.$.grabById('main').innerHTML = (html)
  }

  getJobs() {
    this.http.get('http://localhost:9001/', (data) => {
      let response = this.util.parse(data.response)
      // currentWeekTime = response.total_time
      let renderedHtml = this.render.jobs(response.jobs)
      this.$.grabById('jobs').innerHTML = renderedHtml
    })
  }

  listen() {
    let baseUrl = 'http://localhost:9001'

    this.$.on("click", "#clock-in-btn", (event) => {
      let id = this.$.grabAttr('jobid')
      let time = this.moment().format()

      let params = {
        jobId: id,
        time: time
      }

      this.http.post(`${baseUrl}/time/clockIn`, params, (data) => {
        let response = this.util.parse(data.response)

        if(response.success) {
          this.$.setAttr(this.$.grabById('clock-out-btn'), 'timeId', response.timeId)
          this.$.grabById('clock-in-btn').style.display = 'none'
          this.$.grabById('clock-out-btn').style.display = 'inline-block'
        }
      })
    });
  
    this.$.on("click", "#clock-out-btn", (event) => {
      let id = this.$.grabAttr('timeId')
      let time = this.moment().format()

      let params = {
        timeId: id,
        time: time
      }

      this.http.put(`${baseUrl}/time/clockOut`, params, (data) => {
        let response = this.util.parse(data.response)

        if(response.success) {
          this.$.grabById('clock-out-btn').style.display = 'none'
          this.$.grabById('clock-in-btn').style.display = 'inline-block'
        }
      })
    })
  }

}

module.exports = JobsComponent