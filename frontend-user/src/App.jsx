import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Login />
      <Register />
    </div>
  )
}

export default App;