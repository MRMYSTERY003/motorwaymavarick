import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from './fbase.js';

const mail = document.getElementById("mail");
const pass = document.getElementById("password");

const signin = document.getElementById("signin");
const signwithgoogle = document.getElementById("withg");




// onAuthStateChanged(auth, (user) => {
//   if (user) {

//     const uid = user.uid;
//     console.log(uid);
//     localStorage.setItem('MM-user', JSON.stringify(user));
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     console.log("not logined!")
//   }
// });

function storeuser(data, mode) {
  if (mode == 1) {
    localStorage.setItem('MM-user', JSON.stringify(data));
  } else {
    localStorage.setItem('MMG-user', JSON.stringify(data));
  }

}



// var userData = localStorage.getItem('MM-user');
// console.log(userData)

// if (userData) {
//   var user = JSON.parse(userData);
//   var username = user.displayName;
//   var email = user.email;
//   console.log(email)
//   // Access other user properties as needed
// } else {
//   // User data not found, handle accordingly (e.g., redirect to login page)
// }




signin.addEventListener("click", function () {

  signInWithEmailAndPassword(auth, mail.value, pass.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      if (user) {
        window.location = 'overview.html'; //After successful login, user will be redirected to home.html
        console.log("logedin")
        storeuser(user, 1);
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


signwithgoogle.addEventListener('click', function () {
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
      if (user) {
        window.location = 'overview.html'; //After successful login, user will be redirected to home.html
        storeuser(user, 2)
        console.log("done")
      }
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})










