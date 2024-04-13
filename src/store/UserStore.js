import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._timerSms = 120;
    makeAutoObservable(this); // Call makeAutoObservable in the constructor
  }

  setIsAuth(bool) {
    this._isAuth = bool;
    console.log(this._isAuth)
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
  get timerSms() {
    return this._timerSms;
  }
}
