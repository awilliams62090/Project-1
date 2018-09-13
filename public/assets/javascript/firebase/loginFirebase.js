        // FirebaseUI config.
        var uiConfig = {
          signInSuccessUrl: 'profile.html',
          signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
          ],
          // tosUrl and privacyPolicyUrl accept either url string or a callback
          // function.
          // Terms of service url/callback.
          tosUrl: '<your-tos-url>',
          // Privacy policy url/callback.
          privacyPolicyUrl: function() {
            window.location.assign('<your-privacy-policy-url>');
          }
        };