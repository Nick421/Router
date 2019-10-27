import * as Auth0 from "auth0-js";
import * as Config from "../../config/config";


const auth0 = new Auth0.WebAuth({
  clientID: Config.CLIENT_ID,
  domain: Config.DOMAIN,
  responseType: Config.RESPONSE_TYPE,
  audience: Config.AUDIENCE,
  redirectUri: Config.CALLBACK_URL,
  scope: Config.SCOPE,
});

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
    returnTo: Config.LOGOUT_URL,
  });
}

export function renewToken() {
  return new Promise((resolve, reject) => {
    if(localStorage.getItem(authFlag) !== "true") {
      reject(Error("user is not logged in"));
      return;
    }
    auth0.checkSession({}, renewTokenCallBack(resolve, reject));
  })
}

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

export function parseLogin() {
  return new Promise((resolve, reject) => {
    auth0.parseHash({ hash: window.location.hash }, renewTokenCallBack(resolve, reject));
  });
}
