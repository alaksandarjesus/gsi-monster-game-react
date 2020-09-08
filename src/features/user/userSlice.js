import { createSlice } from '@reduxjs/toolkit';
import API from '../../app/api';
import { get, clone, isEmpty } from 'lodash';
import * as jwt_decode from 'jwt-decode';
const initialState = {
  loggedIn: false,
  loginError: '',
  registerError: '',
  token: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, action.payload);
    },
    reject: (state, action) => {
      localStorage.removeItem('token');
      return Object.assign({}, state, action.payload);
    },
    logout: (state, action) => {
      localStorage.removeItem('token')
      return Object.assign({}, state, initialState);
    },
    hasLoggedIn: (state, action) => {
      if (!state.token) {
        const token = localStorage.getItem('token');
        if (!isEmpty(token)) {
          let payload = clone(initialState);
          payload.token = token;
          payload.loggedIn = true;
          return Object.assign({}, state, payload);

        }
      }
    }
  },
});

export const { set, reject, logout, hasLoggedIn } = userSlice.actions;

export const verify = user => dispatch => {
  let payload = clone(initialState);
  API.post('login', user).then(function (res) {
    if (res.data.success) {
      payload.token = get(res.data, 'token');
      payload.loggedIn = true;
      dispatch(set(payload));
    } else {
      let message = get(res.data, 'message');
      if (!message) {
        message = 'Server error. Contact Administrator';
      }
      payload.loginError = message;
      dispatch(reject(payload));
    }
  }).catch(function (res) {
    let message = get(res.data, 'message');
    if (!message) {
      message = 'Server error. Contact Administrator';
    }
    payload.loginError = message;
    dispatch(reject(payload))
  });
};

export const register = user => dispatch => {
  let payload = clone(initialState);
  API.post('register', user).then(function (res) {
    if (res.data.success) {
      payload.token = get(res.data, 'token');
      payload.loggedIn = true;
      dispatch(set(payload));
    } else {
      let message = get(res.data, 'message');
      if (!message) {
        message = 'Server error. Contact Administrator';
      }
      payload.registerError = message;
      dispatch(reject(payload));
    }
  }).catch(function (res) {
    let message = get(res.data, 'message');
    if (!message) {
      message = 'Server error. Contact Administrator';
    }
    payload.registerError = message;
    dispatch(reject(payload))
  });
};

export const isLoggedIn = state => state.user.loggedIn;
export const loginError = state => state.user.loginError;
export const registerError = state => state.user.registerError;
export const token = state => state.user.token;

export const userInfo = (state)=>{
  if(!state.user.token){
    return {};
  }
  return (jwt_decode(state.user.token));
}

export default userSlice.reducer;
