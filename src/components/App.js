import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './Home';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard';
import SignInForm from './SignInForm';
import TransactionForm from './TransactionForm';
import ByeUser from './ByeUser';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/sign_up" component={SignUpForm} />
      <Route exact path="/sign_in" component={SignInForm} />
      <Route exact path="/transaction" component={TransactionForm} />
      <Route exact path="/logout" component={ByeUser} />
    </Switch>
  );
}

export default App;
