
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./component/login";
import {Home} from "./component/home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Register } from './component/register';

function App() {
  return (
    <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
