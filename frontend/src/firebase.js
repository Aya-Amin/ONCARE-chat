// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZlzpiD50A5yT24b6YLpZaXOag79bXGgk",
  authDomain: "chat-frontend-6f2a1.firebaseapp.com",
  projectId: "chat-frontend-6f2a1",
  storageBucket: "chat-frontend-6f2a1.firebasestorage.app",
  messagingSenderId: "728271172715",
  appId: "1:728271172715:web:ce9760c4910c450696ad2e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Function to request permission for notifications
export const requestFirebaseToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied");
    }
  } catch (error) {
    console.error("FCM Token error:", error);
  }
};

// Listen for messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
});
