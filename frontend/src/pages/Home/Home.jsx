import * as MI from "@mui/material";
import { Link } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";

const Home = () => {
  const refresh = useRefreshToken();

  return (
    <MI.Container sx={{ bgcolor: "orange", height: "100vh" }}>
      <MI.Typography variant="h2">Home</MI.Typography>
      <Link to="/user">User Profile</Link>
      <button onClick={() => refresh()}>Refresh</button>
    </MI.Container>
  );
};

export default Home;
