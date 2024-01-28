import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, uploadBytes, ref } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWkxC3rjnrUZeWbh9hYnxtA7u9oYZzwnI",
  authDomain: "wardrobe-45d83.firebaseapp.com",
  projectId: "wardrobe-45d83",
  storageBucket: "wardrobe-45d83.appspot.com",
  messagingSenderId: "472416652373",
  appId: "1:472416652373:web:0d922f3ebc3c35c95a18dc",
  measurementId: "G-L8S5KHL6M7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const storageReg = ref(storage);

const imagesRef = ref(storage, 'images');

function App() {
  const [file, setFile] = useState(null);

  // Function to handle file selection
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle file upload
  const onFileUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Create a reference to 'images/your-file-name'
    const imagesRef = ref(storage, `images/${file.name}`);

    // Upload the file to Firebase
    uploadBytes(imagesRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      alert(`File uploaded successfully: ${file.name}`);
    }).catch((error) => {
      console.error("Error uploading file:", error);
      alert(`Error uploading file: ${error.message}`);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload to Firebase</button>
      </header>
    </div>
  );
}

export default App;

