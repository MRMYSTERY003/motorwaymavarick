import { auth, onAuthStateChanged } from './fbase.js';

// Function to check authentication state and redirect to login if not authenticated
export function checkAuthentication() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // User is not authenticated, redirect to login page
      window.location = 'login.html';
    }
  });
}
