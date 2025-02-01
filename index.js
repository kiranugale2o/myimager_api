const express = require("express");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer().single("file"); // This handles single file upload under "file" key

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

// Use body-parser to parse JSON bodies
appExpress.use(bodyParser.json());

// Use body-parser to parse URL-encoded bodies
appExpress.use(bodyParser.urlencoded({ extended: true }));

// Alternatively, you can configure CORS with options:
// app.use(cors({
//   origin: 'http://your-frontend-domain.com', // Replace with your frontend domain
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

appExpress.get("/", (req, res) => {
  console.log("okkkkkkkk");
  res.send("new version ");
});
appExpress.post("/api", upload, async (req, res) => {
  console.log(req);

  const file = req.file; // This is the uploaded file
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const storageRef = ref(storage, `images/${file.originalname}`);
    await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype, // Set the content type explicitly
    });
    const downloadURL = await getDownloadURL(storageRef);

    return res.status(200).json({
      data: {
        url: downloadURL,
        image_size: file.size,
        image_name: file.originalname,
      },
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
});

// Start the server
const PORT = 5000;
appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
