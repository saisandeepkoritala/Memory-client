import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Lost from "./pages/Lost";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="*" element={<Lost />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App