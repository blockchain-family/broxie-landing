import { makeAutoObservable } from 'mobx';

export class LandingStore {
  constructor() {
    makeAutoObservable(this);
  }
}
