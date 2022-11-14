import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import LandingPage from './components/LandingPage';
import Detail from './components/Detail';
import createDog from './components/DogCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={LandingPage}/>
          <Route exact path={'/home'} component={Home}/>
          <Route exact path={'/about'} component={About}/>
          <Route exact path={'/home/:id'} component={Detail}/>
          <Route exact path={'/create'} component={createDog}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
