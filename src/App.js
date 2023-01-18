import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import WeatherApi from './WeatherApi';
import ForExApi from './ForExApi';
import PPPConverter from './PPPCoverter';
import Page404 from './Page404';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path='/' element={<PPPConverter />}></Route>
            <Route path='/ppp' element={<PPPConverter />}></Route>
            <Route path='/forexapi' element={<ForExApi />}></Route>
            <Route path='/forex' element={<ForExApi />}></Route>
            <Route path='/weatherapi' element={<WeatherApi />}></Route>
            <Route path='/weather' element={<WeatherApi />}></Route>
            <Route path='*' element={<Page404 />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
