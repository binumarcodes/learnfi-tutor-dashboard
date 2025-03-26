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
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

// Import UploadVideo component
import UploadVideo from "./UploadVideo";

const drawerWidth = 280;

const StyledButton = styled(Button)({
  textTransform: "none",
  fontSize: "16px",
  padding: "10px 20px",
  borderRadius: "8px",
});

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
    { label: "Settings", icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth, p: 2, textAlign: "center" }}>
      <Avatar sx={{ width: 70, height: 70, mx: "auto", mb: 2 }} />
      <Typography variant="h6">Tutor Dashboard</Typography>
      <Divider sx={{ my: 2 }} />
      <List>
        {sections.map(({ label, icon }) => (
          <ListItem
            button
            key={label}
            onClick={() => setActiveSection(label)}
            sx={{ background: activeSection === label ? "#e0e0e0" : "transparent" }}
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, background: "#1976d2" }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {activeSection}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: { sm: `${drawerWidth}px` }, mt: 8 }}>
        {activeSection === "Dashboard" && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: "center", background: "#f0f0f0" }}>
                <Typography variant="h6">Total Earnings</Typography>
                <Typography variant="h4" color="primary">₦50,000</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: "center", background: "#f0f0f0" }}>
                <Typography variant="h6">Top Video</Typography>
                <Typography variant="body1">"React Hooks Explained" - 12K Views</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: "center", background: "#f0f0f0" }}>
                <Typography variant="h6">Recent Upload</Typography>
                <Typography variant="body1">"Intro to Firebase" - Pending Approval</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeSection === "Upload Video" && <UploadVideo />}
      </Box>
    </Box>
  );
};

export default Dashboard;
