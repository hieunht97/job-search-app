// import axios from "../api/axios";
// import useAuth from "./useAuth";

// const useRefreshToken = () => {
//   const { setAuth } = useAuth();

//   const refresh = async () => {
//     console.log("refresh");
//     const response = await axios.get("/refresh", {
//       withCredentials: true,
//     });
//     setAuth((prev) => {
//       console.log(JSON.stringify(prev));
//       console.log(response.data.accessToken);
//       return {
//         ...prev,
//         accessToken: response.data.accessToken,
//       };
//     });
//     return response.data.accessToken;
//   };
//   return refresh;
// };

// export default useRefreshToken;

import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      console.log("Attempting token refresh...");
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log("Previous Auth State:", prev);
        console.log("New Access Token:", response.data.accessToken);
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error.response || error);
      throw error;
    }
  };
  return refresh;
};

export default useRefreshToken;
