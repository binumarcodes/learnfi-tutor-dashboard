import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Divider,
  Avatar,
  Button,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LeaderboardIcon from "@mui/icons-material/EmojiEvents";
import UploadVideo from "./UploadVideo";
import "../index.css";
import Leaderboard from "./LeaderBoard";

const drawerWidth = 280;

const StyledButton = styled(Button)({
  textTransform: "none",
  fontSize: "16px",
  padding: "10px 20px",
  borderRadius: "8px",
});

const leaderboardData = [
  { name: "Alice Johnson", rank: 1, earnings: 200, color: "#FF5733" },
  { name: "Bob Williams", rank: 2, earnings: 180, color: "#33FF57" },
  { name: "Charlie Brown", rank: 3, earnings: 160, color: "#3357FF" },
  { name: "You", rank: 5, earnings: 150, color: "#FFD700" }, // Highlight user's position
  { name: "Diana Prince", rank: 4, earnings: 120, color: "#FF33A1" },
];

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sections = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Upload Video", icon: <VideoLibraryIcon /> },
    { label: "My Content", icon: <VideoLibraryIcon /> },
    { label: "Earnings & Payouts", icon: <AttachMoneyIcon /> },
    { label: "Leaderboard", icon: <LeaderboardIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth, p: 2, textAlign: "center", background: "#fff", minHeight: "100vh" }}>
      <Avatar sx={{ width: 70, height: 70, mx: "auto", mb: 2 }} />
      <Typography variant="h6" sx={{ color: "#012b11", fontWeight: "800" }}>
        Tutor Dashboard
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List>
        {sections.map(({ label, icon }) => (
          <ListItem
            button
            key={label}
            onClick={() => setActiveSection(label)}
            sx={{ background: activeSection === label ? "gold" : "transparent", cursor: "pointer" }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <StyledButton variant="contained" color="error" startIcon={<LogoutIcon />}>
        Logout
      </StyledButton>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", background: "#F3F7F9", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#fff",
          boxShadow: "none",
          borderBottom: "3px solid #EDF0F2",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ color: "#012b11" }}>
            {activeSection}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}>
        {drawer}
      </Drawer>
      <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }} open>
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: { sm: `${drawerWidth}px` }, mt: 8 }}>
        {activeSection === "Dashboard" && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 3, textAlign: "center", background: "#fff", borderRadius: 3 }}>
                  <Typography variant="h6">Total Earnings (Xion Tokens)</Typography>
                  <Typography variant="h4" color="primary" sx={{ color: "#012b11" }}>
                    Ξ150
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 3, textAlign: "center", background: "#fff", borderRadius: 3 }}>
                  <Typography variant="h6">Top Video</Typography>
                  <Typography variant="body1">"Yoruba Arithmetic" - 20K Views</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 3, textAlign: "center", background: "#fff", borderRadius: 3 }}>
                  <Typography variant="h6">Leaderboard Rank</Typography>
                  <Typography variant="body1">#5 (Top Educator in Yoruba Physics)</Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Leaderboard Chart */}
            <Box sx={{ mt: 4, p: 3, background: "#fff", borderRadius: 3 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "600", mb: 2 }}>
                Tutor Leaderboard
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leaderboardData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="earnings" fill="#3f51b5" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}

        {activeSection === "Upload Video" && <UploadVideo />}
        {activeSection === "Leaderboard" && <Leaderboard />}
      </Box>
    </Box>
  );
};

export default Dashboard;
