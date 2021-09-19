import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Home from "./components/home";
import About from "./components/about";
import userService from "./services/userService";
import Logout from "./components/logout";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignupBiz from "./components/signupBiz";
import CreateCard from "./components/createCard";
import MyCards from "./components/myCards";
import EditCard from "./components/editCard";
import PageHeader from "./components/common/pageHeader";
import ProtectedRoute from "./components/common/protectedRoute";

// import userService, { logout } from "./services/userService";
// import Footer from "./components/footer";

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.setState({
      data: userService.getCurrentUser(),
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={data} />
        </header>
        <main className="container flex-fill ">
          <Switch>
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/my-cards"
              component={MyCards}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/my-cards/edit-card/:id"
              component={EditCard}
              biz={true}
              exact
            />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/signupBiz" component={SignupBiz} exact />
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} exact />
            <Route path="/pageNotFound" exact>
              <PageHeader title="Error 404 - Page Not Found sorry try again please..." />
            </Route>
            <Redirect to="/pageNotFound" />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
