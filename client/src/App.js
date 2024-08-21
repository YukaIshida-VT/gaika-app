import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/user')
      .then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    axios.get('/logout')
      .then(() => setUser(null));
  };

  return (
    <Router>
      <div>
        <h1>Twitter Login App</h1>
        <nav>
          {user ? (
            <>
              <Link to="/apply">Apply for a Company</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <a href="/auth/twitter">Login with Twitter</a>
          )}
        </nav>
        <Switch>
          <Route path="/apply">
            {user ? <ApplyForCompany /> : <p>Please log in first</p>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const ApplyForCompany = () => {
  const [url, setUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [appliedDate, setAppliedDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/applied-companies', { url, company_name: companyName, applied_date: appliedDate })
      .then(response => {
        console.log('Company applied:', response.data);
      })
      .catch(error => {
        console.error('Error applying for company:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company URL:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <div>
        <label>Company Name:</label>
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
      </div>
      <div>
        <label>Applied Date:</label>
        <input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} required />
      </div>
      <button type="submit">Apply</button>
    </form>
  );
};

export default App;
