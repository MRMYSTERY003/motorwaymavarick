import {auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from './fbase.js';

const mail = document.getElementById("mail");
const pass = document.getElementById("password");

const signin = document.getElementById("signin");
const signwithgoogle = document.getElementById("withg");







signin.addEventListener("click", function() {

  signInWithEmailAndPassword(auth, mail.value, pass.value)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      if(user) {
          window.location = 'overview.html'; //After successful login, user will be redirected to home.html
        }
      // ...
      console.log("Success! Account created.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });

});


signwithgoogle.addEventListener('click',function(){
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        if(user) {
            window.location = 'overview.html'; //After successful login, user will be redirected to home.html
            signin.removeEventListener('click');
          }
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
})











