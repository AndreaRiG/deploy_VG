import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form'








const App = () => {
  return (
    <BrowserRouter>
      <Route>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route path="/detail/:id"  component={Detail}/>
        <Route path="/create"component={Form}/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
