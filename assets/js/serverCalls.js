function get(url, cb) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(this);
    }
 };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function post(url, cb) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(this);
    }
 };
  xhttp.open("POST", url, true);
  xhttp.send();
}

module.exports = {
  get: get,
  post: post
}