let get = (url, cb) => {
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

let post = (url, data, cb) => {
  var xhttp;
  var paramString;

  for (prop in data) {
    if (paramString && paramString.length > 0) paramString += `&${prop}=${data[prop]}`
    else paramString = `${prop}=${data[prop]}`
  }

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(this);
    }
 };
 console.log(url)
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(paramString);
}

let put = (url, data, cb) => {
  var xhttp;
  var paramString;
  
  for (prop in data) {
    if (paramString && paramString.length > 0) paramString += `&${prop}=${data[prop]}`
    else paramString = `${prop}=${data[prop]}`
  }
  
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(this);
    }
 };
 console.log(url)
  xhttp.open("PUT", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(paramString);
}

module.exports = {
  get: get,
  post: post,
  put: put
}