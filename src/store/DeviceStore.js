import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._selectedBrand = {}
    this._selectedType = {}
    makeAutoObservable(this); // Call makeAutoObservable in the constructor
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedBrand(brand){
    this._selectedBrand = brand
  }
  setSelectedType(type){
    this._selectedType = type
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
  get selectedBrand() {
    return this._selectedBrand;
  }
  get selectedType() {
    return this._selectedType;
  }
}
