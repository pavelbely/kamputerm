module.exports = {
  login(username, password) {
    let loginData = {
      "username" : username,
      "password" : password
    };
    return sendHttpRequest('auth/login', 'POST', JSON.stringify(loginData));
  },

  ensureAuthenticated() {
    return sendHttpRequest('auth/isLoggedIn', 'GET');
  }
}

function sendHttpRequest(url, type, data) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    if ((type == 'POST' || type == 'PUT') && data !== null) {
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(data);
    } else {
      xhr.send();
    }
  });

}
