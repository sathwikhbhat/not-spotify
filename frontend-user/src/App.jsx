import AuthWrapper from "./components/AuthWrapper.jsx";
import Display from "./components/Display.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthWrapper>
        <Display />
      </AuthWrapper>
    </>
  )
}

export default App;