
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./pages/login";
import {Home} from "./pages/home";
import {Navigation} from './component/navigation';
import {Logout} from './pages/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Register } from './pages/register';
import { DisplayClub } from './pages/displayClub';

function App() {
  return (
    <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          
          <Route path="/:username/:clubName" element={<DisplayClub/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
