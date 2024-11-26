import * as MI from "@mui/material";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <MI.Container sx={{ bgcolor: "orange", height: "100vh" }}>
      <MI.Typography variant="h2">User Profile</MI.Typography>
      <Link to="/">Home</Link>
    </MI.Container>
  );
};

export default UserProfile;
