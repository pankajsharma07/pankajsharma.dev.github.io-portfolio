// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase Configuration
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

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable submit button to prevent multiple submissions
    const submitButton = contactForm.querySelector('.contact-btn');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Input validation
    if (!name || !email || !message) {
      formMessage.style.color = "var(--text-secondary)";
      formMessage.style.fontSize = "16px";
      formMessage.textContent = "Please fill in all fields.";
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.style.color = "var(--text-secondary)";
      formMessage.style.fontSize = "16px";
      formMessage.textContent = "Please enter a valid email address.";
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
      return;
    }

    try {
      await addDoc(collection(db, "queries"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });

      formMessage.style.color = "var(--accent)";
      formMessage.style.fontSize = "16px";
      formMessage.textContent = "Your message has been sent successfully!";
      contactForm.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      formMessage.style.color = "var(--text-secondary)";
      formMessage.style.fontSize = "16px";
      formMessage.textContent = "Error sending message. Please try again later.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});