import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { storage, db } from "../util/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useDropzone } from "react-dropzone";

const UploadVideo = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [quiz, setQuiz] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [uploading, setUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
    multiple: false,
  });

  const handleUpload = async () => {
    if (!video || !title || !subject || !language || !quiz || options.some((opt) => !opt) || !correctAnswer) {
      setSnackbarMessage("Please fill all fields before uploading.");
      setSnackbarOpen(true);
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `videos/${video.name}`);
    const uploadTask = uploadBytesResumable(storageRef, video);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        setSnackbarMessage("Upload failed. Try again.");
        setSnackbarOpen(true);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "videos"), {
          title,
          subject,
          language,
          quiz,
          options,
          correctAnswer,
          videoUrl: downloadURL,
          uploadedAt: new Date(),
        });
        setUploading(false);
        setSnackbarMessage("Video uploaded successfully!");
        setSnackbarOpen(true);
        setVideo(null);
        setVideoPreview(null);
        setTitle("");
        setSubject("");
        setLanguage("");
        setQuiz("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("");
      }
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: "#012b11", marginBottom: 5, fontWeight: "600"}}>
          Content Upload
        </Typography>
        <Grid container spacing={3}>
          {/* Left Side Form */}
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />

            <TextField fullWidth select label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} sx={{ mb: 2 }}>
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </TextField>

            <TextField fullWidth select label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ mb: 2 }}>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Yoruba">Yoruba</MenuItem>
              <MenuItem value="Hausa">Hausa</MenuItem>
              <MenuItem value="Igbo">Igbo</MenuItem>
            </TextField>

            <TextField fullWidth label="Quiz Question" value={quiz} onChange={(e) => setQuiz(e.target.value)} sx={{ mb: 2 }} />

            {/* Quiz Options */}
            {options.map((option, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                sx={{ mb: 2 }}
              />
            ))}

            {/* Correct Answer Selection */}
            <Typography variant="h6" gutterBottom>
              Select Correct Answer
            </Typography>
            <RadioGroup value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
              {options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </Grid>

          {/* Right Side: Video Upload + Preview */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center" gutterBottom>
              Upload Video
            </Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed gray",
                borderRadius: 2,
                padding: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
            >
              <input {...getInputProps()} />
              <Typography>Drag & Drop Video Here or Click to Upload</Typography>
            </Box>

            {/* Video Preview */}
            {videoPreview && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" align="center">
                  Video Preview
                </Typography>
                <video src={videoPreview} controls width="100%" style={{ borderRadius: 10 }} />
              </Box>
            )}

            {/* Upload Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              disabled={uploading}
              sx={{ mt: 3, background: "gold", color: "#012b11", fontWeight: "600", borderRadius: 3, padding: 2 }}
            >
              {uploading ? <CircularProgress size={24} /> : "Upload Content"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar Notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </Box>
  );
};

export default UploadVideo;
