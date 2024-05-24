import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./Components/Pages/Home"
import Registration from "./Components/Users/Registration"
import Login from "./Components/Users/Login"; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
