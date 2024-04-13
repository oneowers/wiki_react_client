import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._selectedBrand = {}
    this._selectedType = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 3
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
  setTotalCount(count){
    this._totalCount = count
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
  get totalCount() {
    return this._totalCount;
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
