module.exports = {
  login(username, password) {
    let loginData = {
      "username" : username,
      "password" : password
    };
    return fetch('auth/login', {
        method : 'POST',
        body : JSON.stringify(loginData),
        headers: new Headers({
      		'Content-Type': 'application/json'
      	}),
        credentials: 'include'
      });
  },

  ensureAuthenticated() {
    return fetch('auth/isLoggedIn', { credentials: 'include' });
  }
}
