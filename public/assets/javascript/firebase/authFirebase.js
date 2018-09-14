// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: 'home.html',
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            var credential = authResult.credential;
            var isNewUser = authResult.additionalUserInfo.isNewUser;
            var providerId = authResult.additionalUserInfo.providerId;
            var operationType = authResult.operationType;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        signInFailure: function (error) {
            // Some unrecoverable error occurred during sign-in.
            // Return a promise when error handling is completed and FirebaseUI
            // will reset, clearing any UI. This commonly occurs for error code
            // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
            // occurs. Check below for more details on this.
            return handleUIError(error);
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            // document.getElementById('loader').style.display = 'none';
        }
    },
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

var userID = '';

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
            var profileImg = user.providerData[0].photoURL;

            user.getIdToken().then(function (accessToken) {
                document.getElementById('sign-in-status').textContent = 'Welcome,';
                document.getElementById('btn-login').setAttribute("data-target", "#");
                document.getElementById('btn-login').setAttribute("onclick", "endSession()");
                document.getElementById('sign-in').innerHTML = 'Sign out';
                document.getElementById('account-details').textContent = displayName;
                document.getElementById('profile-img').innerHTML = '<img class ="img-fluid" src="' + profileImg + '">'
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
    // Get current userID
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userID = firebase.auth().currentUser.uid;
            provData = user.providerData[0].uid;
            console.log('UserID: ' + userID);
            console.log ('Provider data: ' + provData);
            console.log(user);
        } else {
            console.log('err: not logged in?');
        }
    });
});

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);