import * as MI from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <MI.Container sx={{ bgcolor: "orange", height: "100vh" }}>
      <MI.Typography variant="h2">Home</MI.Typography>
      <Link to="/user">User Profile</Link>
    </MI.Container>
  );
};

export default Home;
