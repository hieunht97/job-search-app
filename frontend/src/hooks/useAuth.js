import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
