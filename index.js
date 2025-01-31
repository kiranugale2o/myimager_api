const express = require("express");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const cors = require("cors");
const firebaseConfig = {
  apiKey: "AIzaSyD9X4hY1a1W9jOI0LedOvOs8L07bhSVGqg",
  authDomain: "studybuddy-5a2fe.firebaseapp.com",
  projectId: "studybuddy-5a2fe",
  storageBucket: "studybuddy-5a2fe.appspot.com",
  messagingSenderId: "481736869337",
  appId: "1:481736869337:web:6fc2c02f44dea61e1245c8",
  measurementId: "G-R8J22FTCV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Express app
const appExpress = express();
appExpress.use(express.json());
// Enable CORS globally for all routes
appExpress.use(cors());

// Alternatively, you can configure CORS with options:
// app.use(cors({
//   origin: 'http://your-frontend-domain.com', // Replace with your frontend domain
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

appExpress.get("/home", (req, res) => {
  console.log("okkkkkkkk");
  res.send("heeeeeeeee");
});
// Function to upload an image to Firebase Storage and generate a short URL
appExpress.post("/api/sendImageOnMyimager", async (req, res) => {
  const { data } = req.body;
  try {
    const storageRef = ref(storage, `images/${file?.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return {
      data: {
        url: downloadURL,
        image_size: file?.size,
        image_name: file?.name,
      },
      message: "success",
    };
  } catch (error) {
    return {
      status: 404,
    };
  }
});

appExpress.listen(5000, (err) => {
  console.log("server runnign successfuly");
});
