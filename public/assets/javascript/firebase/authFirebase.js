// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

function endSession() {
  firebase.auth().signOut().then(function () {
    console.log('Signed Out');
  }, function (error) {
    console.error('Sign Out Error', error);
  });
}

initApp = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;

      user.getIdToken().then(function (accessToken) {
        document.getElementById('sign-in-status').textContent = 'Welcome,';
        document.getElementById('btn-login').setAttribute("data-target", "#");
        document.getElementById('btn-login').setAttribute("onclick", "endSession()");
        document.getElementById('sign-in').innerHTML = 'Sign out';
        document.getElementById('account-details').textContent = email;
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = '';
      document.getElementById('btn-login').setAttribute("data-target", "#accountModal");
      document.getElementById('btn-login').setAttribute("onclick", "");
      document.getElementById('sign-in').innerHTML = 'Sign in';
      document.getElementById('account-details').textContent = '';
    }
  }, function (error) {
    console.log(error);
  });
};

window.addEventListener('load', function () {
  initApp()
});