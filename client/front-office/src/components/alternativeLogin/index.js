import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/creators';

const AlternativeLogin = () => {
  const [fields, setFields] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const sessionData = useSelector((store) => store.authReducers.sessionData);

  const handleChange = (e) => {
    const newFields = { ...fields, [e.target.name]: e.target.value };
    setFields(newFields);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    action.doLogin(fields, dispatch);
  };

  useEffect(() => {
    if (sessionData.loggedIn) {
      action.redirect(dispatch, '/');
    }
    return () => {
      action.redirect(dispatch, false);
    };
  }, [sessionData, dispatch]);

  const clickhandler = (e) => {
    axios
      .get('http://localhost:3001/api/fo/wallet/', { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err.message));
  };

  const logout = () => {
    action.logout(dispatch);
  };

  return (
    <>
      <form action="" onSubmit={submitHandler} style={{ margin: '6rem' }}>
        <div>
          <label htmlFor="email">Name</label>
          <input
            onChange={handleChange}
            id="email"
            type="text"
            name="email"
            required
            value={fields.email}
          />
        </div>
        <div>
          <label htmlFor="password">Pass</label>
          <input
            onChange={handleChange}
            id="password"
            type="text"
            name="password"
            required
            value={fields.password}
          />
        </div>
        <input type="submit" value="submit" />
      </form>
      <label htmlFor="getWllets">wallets</label>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button id="getWllets" type="button" onClick={clickhandler}>
        get wallets
      </button>
      <button id="logout" type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};
export default AlternativeLogin;
