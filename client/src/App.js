import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import NavBar from "./components/layout/NavBar";
import Login from "./components/auth/Login";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import AuthAlert from "./components/layout/AuthAlert";
//check for token
if (localStorage.getItem("jwtToken")) {
  //set auth token header auth
  setAuthToken(localStorage.getItem("jwtToken"));
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <AuthAlert />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/" component={Posts}></Route>
            <Route exact path="/post/:id" component={Post}></Route>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
