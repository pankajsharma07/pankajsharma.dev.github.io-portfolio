// Import Firebase SDKs (loaded from CDN automatically)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ----------------------
// Firebase Configuration
// ----------------------
const firebaseConfig = {
  apiKey: "AIzaSyB6Ywvc0OyueClhJDQNtsW76OskyaGEYq4",
  authDomain: "pankajsharmaportfolio-32030.firebaseapp.com",
  projectId: "pankajsharmaportfolio-32030",
  storageBucket: "pankajsharmaportfolio-32030.firebasestorage.app",
  messagingSenderId: "870337285089",
  appId: "1:870337285089:web:d0faea53280293b12760a0",
  measurementId: "G-8BZETQGXTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ----------------------
// Form Submission
// ----------------------
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please enter a valid email.";
    return;
  }

  try {
    await addDoc(collection(db, "queries"), {
      name,
      email,
      message,
      timestamp: serverTimestamp(),
    });

    formMessage.style.color = "green";
    formMessage.textContent = "Your query has been sent successfully!";
    contactForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    formMessage.style.color = "red";
    formMessage.textContent = "Error sending message. Please try again later.";
  }
});
