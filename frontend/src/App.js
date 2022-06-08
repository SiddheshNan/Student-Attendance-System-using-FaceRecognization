import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ViewStud from "./pages/ViewStud";
import AdminPage from "./pages/AdminPage";

function App(props) {
  const [state, setState] = React.useState({
    isLoggedin: false,
    email: "",
    name: "",
    password: "",
    subject: "",
  });

  React.useEffect(() => {
    const app_state_attn = localStorage.getItem("app_state_attn");
    if (app_state_attn) {
      setState(JSON.parse(app_state_attn));
    }
  }, []);

  return (
    <HashRouter>
      <Switch>

         <Route
            exact
            path="/admin"
            render={(props) => (
              <AdminPage
                {...props}
              />
            )}
          />



        {!state.isLoggedin ? (
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginPage
                {...props}
                setLoginStatus={(data) => {
                  setState({ ...data });
                  localStorage.setItem("app_state_attn", JSON.stringify(data));
                }}
                isLoggedin={state.isLoggedin}
              />
            )}
          />
        ) : (
          <Route path="/login" exact>
            <Redirect to="/dashboard" />
          </Route>
        )}

        {state.isLoggedin ? (
          <>
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <DashboardPage {...props} isLoggedin={state.isLoggedin} state={state} setState={setState} />
              )}
            />

          <Route
              exact
              path="/stud"
              render={(props) => (
                <ViewStud subj={state.subject} {...props} isLoggedin={state.isLoggedin} state={state} setState={setState} />
              )}
            />



          </>
        ) : (
          <Route path="*" exact>
            <Redirect to="/login" />
          </Route>
        )}

        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
