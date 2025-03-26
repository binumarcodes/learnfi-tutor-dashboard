import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../index.css";

const leaderboardData = [
  { name: "John Doe", score: 95, color: "#FF5733" },
  { name: "Jane Smith", score: 90, color: "#33FF57" },
  { name: "Samuel Johnson", score: 85, color: "#3357FF" },
  { name: "Alice Brown", score: 80, color: "#F3A712" },
  { name: "Michael Lee", score: 75, color: "#9B59B6" },
];

const Leaderboard = () => {
  return (
    <Box sx={{ background: "#F3F7F9", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Leaderboard
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 800 }}>
        {leaderboardData.map((tutor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                background: tutor.color,
                color: "#fff",
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              <Typography variant="h6">{tutor.name}</Typography>
              <Typography variant="h5">{tutor.score}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ width: "80%", mt: 4 }}>
        <Typography variant="h6" textAlign="center" fontWeight="bold">
          Performance Chart
        </Typography>
        <Bar
          data={{
            labels: leaderboardData.map((tutor) => tutor.name),
            datasets: [
              {
                label: "Scores",
                data: leaderboardData.map((tutor) => tutor.score),
                backgroundColor: leaderboardData.map((tutor) => tutor.color),
                borderRadius: 5,
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </Box>
    </Box>
  );
};

export default Leaderboard;
