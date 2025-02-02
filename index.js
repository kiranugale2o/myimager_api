const express = require("express");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { DatabaseConnection } = require("./src/config/databaseConn");
const { Project } = require("./src/config/models/Project");
const { User } = require("./src/config/models/User");
const { liveDate } = require("./src/utils/liveDate");
const upload = multer().single("file");
const { GoogleGenerativeAI } = require("@google/generative-ai");
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
appExpress.use(bodyParser.urlencoded({ extended: false }));

DatabaseConnection();
// Alternatively, you can configure CORS with options:
// app.use(cors({
//   origin: 'http://your-frontend-domain.com', // Replace with your frontend domain
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

appExpress.get("/", (req, res) => {
  res.send(
    "Welcome To The Myimager !  USE Myimager To manage your website ,app media file with myimager."
  );
});

appExpress.post("/api/imageupload", upload, async (req, res) => {
  try {
    const date = liveDate();
    const project_key = req.body.project_key;
    const client_key = req.body.client_key;
    const file = req.file; // This is the uploaded file
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(client_key),
    });
    if (user) {
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const storageRef = ref(storage, `images/${file.originalname}`);
      await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype, // Set the content type explicitly
      });
      const downloadURL = await getDownloadURL(storageRef);
      const data = {
        name: file?.originalname,
        url: downloadURL,
        size: file?.size / 1024,
        type: file?.mimetype,
        date,
      };
      const project = await Project.findByIdAndUpdate(
        project_key,
        {
          $push: {
            projectData: data, // Push the new post into the "posts" array
          },
        },
        {
          new: true, // Return the updated document
          runValidators: true, // Optionally run validators on the update
        }
      );
      if (project) {
        // Calculate the new total project storage (add the new file size)
        const updatedStorage = project.projectUseStorage + file.size / 1024;

        // Update the project with the new data and the updated storage size
        project.projectUseStorage = updatedStorage;

        // Save the project with the updated values
        await project.save();

        return res.status(200).json({
          data: {
            url: downloadURL,
            image_size: file?.size,
            image_name: file?.originalname,
            type: file?.mimetype / 1024,
          },
          message: "success",
        });
      } else {
        return res.status(400).json({ message: "Project Key Is Invalid" });
      }
    } else {
      return res.status(400).json({ message: "Client Key Is Invalid" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Invalid credentials",
      error: error.message,
    });
  }
});

appExpress.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = await req.body;
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAdtmZj3LdalwG6SRASezWB0Lcc7au5w7k"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return res.json({
      message: result.response.text(),
    });
  } catch (error) {
    return res.json({
      message: error.message,
      status: 500,
    });
  }
});

// Start the server
const PORT = 5000;
appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
