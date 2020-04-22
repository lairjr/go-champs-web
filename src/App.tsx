import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountHome from './Pages/AccountHome';
import Home from './Pages/Home';
import Search from './Pages/Search';
import TournamentEdit from './Pages/TournamentEdit';
import TournamentHome from './Pages/TournamentHome';
import NavTopToolbar from './Shared/UI/NavTopToolbar';
import store from './store';
import OrganizationHome from './Pages/OrganizationHome';
import UseAsApp from './Pages/UseAsApp';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import PasswordRecovery from './Pages/PasswordRecovery';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <NavTopToolbar />

          <div className="hero is-fullheight-with-navbar">
            <section className="section">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    sensitive
                    path="/Account"
                    component={AccountHome}
                  />
                  <Route
                    exact
                    sensitive
                    path="/UseAsApp"
                    component={UseAsApp}
                  />
                  <Route
                    exact
                    sensitive
                    path="/Account/*"
                    component={AccountHome}
                  />
                  <Route exact sensitive path="/SignIn" component={SignIn} />
                  <Route exact sensitive path="/SignUp" component={SignUp} />
                  <Route
                    exact
                    sensitive
                    path="/PasswordRecovery"
                    component={PasswordRecovery}
                  />
                  <Route
                    exact
                    sensitive
                    path="/Organization/:organizationSlug"
                    component={OrganizationHome}
                  />
                  <Route
                    exact
                    sensitive
                    path="/Organization/:organizationSlug/*"
                    component={OrganizationHome}
                  />
                  <Route exact sensitive path="/Search" component={Search} />
                  <Route
                    path="/:organizationSlug/:tournamentSlug/*"
                    component={TournamentHome}
                  />
                  <Route
                    path="/:organizationSlug/:tournamentSlug"
                    component={TournamentHome}
                  />
                  <Route
                    exact
                    sensitive
                    path="/:organizationSlug/:tournamentSlug/TournamentEdit"
                    component={TournamentEdit}
                  />
                </Switch>
              </div>
            </section>

            <div className="hero-foot">
              <footer className="footer">
                <div className="content has-text-centered">
                  <p>
                    <strong>Go Champs!</strong>
                    &nbsp; by Lair Júnior. The source code is licensed &nbsp;
                    <a
                      href="https://github.com/lairjr/go-champs-web/blob/master/LICENSE"
                      style={{ color: '#970c10' }}
                    >
                      MIT
                    </a>
                    . The website content is licensed &nbsp;
                    <a
                      href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                      style={{ color: '#970c10' }}
                    >
                      CC BY NC SA 4.0
                    </a>
                    .
                  </p>

                  <p>
                    Build: <em>0.0.{process.env.REACT_APP_BUILD_NUMBER}</em>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </DndProvider>
      </Router>
    </Provider>
  );
};

export default App;
