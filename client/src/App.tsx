import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="w-full p-6">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;