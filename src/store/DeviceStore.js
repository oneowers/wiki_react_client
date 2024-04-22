import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._popularDevices = []
    this._selectedBrand = {}
    this._selectedType = {}
    this._page = 1
    this._limit = 9
    makeAutoObservable(this); // Call makeAutoObservable in the constructor
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setPopularDevices(devices) {
    this._devices = devices;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedBrand(brand){
    this.setPage(1)
    this._selectedBrand = brand
  }
  setSelectedType(type){
    this.setPage(1)
    this._selectedType = type
  }
  setPage(page){
    this._page = page
  }

  get isAuth() {
    return this._isAuth;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get popularDevices() {
    return this._popularDevices;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedType() {
    return this._selectedType;
  }
  get limit() {
    return this._limit;
  }
  get page() {
    return this._page;
  }
}
