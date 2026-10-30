// Paste the config from Firebase console → Project settings → Your apps → Web app.
// These values are safe to publish; the security rules (firestore.rules) are what protect the data.
export const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

// The Google account you'll use to sign in to admin.html. Must match the email in firestore.rules.
export const ADMIN_EMAIL = "PASTE_YOUR_GMAIL_HERE";
