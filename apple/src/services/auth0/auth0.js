import * as Auth0 from "auth0-js";

/**
 * Initialise a new auth0 instance
 */

const auth0 = new Auth0.WebAuth({
  clientID: process.env.REACT_APP_CLIENT_ID,
  domain: process.env.REACT_APP_DOMAIN,
  responseType: process.env.REACT_APP_RESPONSE_TYPE,
  audience: process.env.REACT_APP_AUDIENCE,
  redirectUri: process.env.REACT_APP_CALLBACK_URL,
  scope: process.env.REACT_APP_SCOPE,
});

let idToken;
let user = null;
let authFlag = "isLoggedIn";
let accessToken = null;

export function isLoggedin() {
  return localStorage.getItem(authFlag) === "true";
};

function saveLocalLogin(authResult) {
  localStorage.setItem(authFlag, "true");
  idToken = authResult.idToken;
  user = authResult.idTokenPayload;
  accessToken = authResult.accessToken;
}

function removeLocalLogin() {
  localStorage.removeItem(authFlag);
  user = null;
  accessToken = "";
}

export function getAccessToken() {
  return accessToken;
}

export function getUser() {
  return user;
}

export function userLogin() {
  auth0.authorize();
}

export function userLogout() {
  removeLocalLogin();
  auth0.logout({
    returnTo: process.env.REACT_APP_LOGOUT_URL,
  });
}

/**
 * Renew the authentication token and save the new valid login information
 * to local storage with the callback function
 */

export function renewToken() {
  return new Promise((resolve, reject) => {
    if(localStorage.getItem(authFlag) !== "true") {
      reject(Error("user is not logged in"));
      return;
    }
    auth0.checkSession({}, renewTokenCallBack(resolve, reject));
  })
}

/**
 * Save local login information from the authentication result object
 */

function renewTokenCallBack(resolve, reject) {
  return (err, authResult) => {
    if (err !== null) {
      return reject(err);
    }
    if (authResult == null) {
      return reject(Error("Empty response"));
    }
    saveLocalLogin(authResult);
    return resolve(authResult);
  }
}

/**
 * Intercept the auth0 callback hash from window url and validate the hash
 */

export function parseLogin() {
  return new Promise((resolve, reject) => {
    auth0.parseHash({ hash: window.location.hash }, renewTokenCallBack(resolve, reject));
  });
}
