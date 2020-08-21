import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Auth, Register, Dashboard } from "./pages";

const App = () => {
  return (
      <Router>
        <Route path="/" exact component={Auth} />
        <Route path="/register" exact component={Register} />
          <Route path="/dashboard" exact component={Dashboard} />
      </Router>
  )
}

export default App;
