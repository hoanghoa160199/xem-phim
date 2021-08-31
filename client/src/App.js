import 'antd/dist/antd.css';
// import Login from './Page/loginPage/login';
import LoginAdmin from './Page/loginAdminpage/loginAdmin';
import Login from './Page/loginPage/login';
import Register from './Page/registerPage/register';
import Home from './Page/homePage/home';
import Admin from './Page/adminPage/admin';
import DetailMovie from './Page/DetailMoive/detailMovie'
import { BrowserRouter as Router, Route } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/loginAdmin" component={LoginAdmin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path='/detail-movie/:id' component={DetailMovie} />
      </Router>
    </div>
  );
}
export { App as default };
