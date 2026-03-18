import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._timerSms = 120;
    this._loading = true;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setLoading(bool) {
    this._loading = bool;
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

  get loading() {
    return this._loading;
  }
}
