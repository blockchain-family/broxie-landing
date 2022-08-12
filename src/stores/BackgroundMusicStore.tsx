import { makeAutoObservable, runInAction } from 'mobx';

import bg_music from 'assets/audio/broxie-128.mp3';

export class BackgroundMusicStore {
  constructor() {
    makeAutoObservable(this);

    this.currentAudio = new Audio(bg_music);
    this.currentAudio.volume = this.defaultVolume;
    this.currentAudio.loop = true;
  }

  private currentAudio: HTMLAudioElement;
  private defaultVolume: number = 0.1;

  playing: boolean = false;

  async play() {
    try {
      await this.currentAudio.play();

      runInAction(() => {
        this.playing = true;
      });
    } catch {}
  }

  async pause() {
    this.currentAudio.pause();

    runInAction(() => {
      this.playing = false;
    });
  }
}
