import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Home></Home>
        <About></About>
      </div>
    </BrowserRouter>
  );
}

export default App;
