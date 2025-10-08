import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
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