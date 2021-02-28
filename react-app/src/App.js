import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage/homePage"
import ProjectPage from "./components/ProjectPage/projectPage"
import { authenticate } from './store/session';
import CreateProject from './components/CreateProject/CreateProject';
import DiscoverPage from './components/DiscoverPage/discoverPage.js';
import Footer from './components/Footer/Footer.js';

const App = () => {
  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute>

          <Route path="/" exact={true} authenticated={authenticated}>
            <HomePage setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/discover" exact={true} authenticated={authenticated}>
            <DiscoverPage setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/new-project" exact={true} authenticated={authenticated}>
            <CreateProject setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/:projectId" exact={true} authenticated={authenticated}>
            <ProjectPage setAuthenticated={setAuthenticated} />
          </Route>
        </Switch>
      <Footer/>
    </>
  );
};

export default App;
