import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SoundSystemService {

  private soundFiles: { [key: string]: string } = {
    chimes: '/sounds/CHIMES.WAV',
    error: '/sounds/CHORD.WAV',
    ding: '/sounds/DING.WAV',
    sofian: '/sounds/JUNGLE_CRITICAL_STOP.WAV',
    logoff: '/sounds/LOGOFF.WAV',
    notify: '/sounds/NOTIFY.WAV',
    recycle: '/sounds/RECYCLE.WAV',
    windows_exit: '/sounds/ROBOTZ_WINDOWS_EXIT.WAV',
    windows_start: '/sounds/ROBOTZ_WINDOWS_START.WAV',
    start: '/sounds/START.WAV',
    tada: '/sounds/TADA.WAV',
    microsoft: '/sounds/THE_MICROSOFT_SOUND.WAV',
  };

  private audioContext: AudioContext;
  private audioMap: Map<string, AudioBuffer> = new Map();

  constructor() {
    this.audioContext = new AudioContext();
    this.preloadSounds().catch(err => {
      console.log(err);
    });
  }

  private async preloadSounds() {
    for (const name in this.soundFiles) {
      const path = this.soundFiles[name];
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioMap.set(name, audioBuffer);
    }
  }

  playSound(name: string, volume: number = 1) {
    const sound = this.audioMap.get(name);
    if (!sound) {
      console.warn('No sound with name "' + name + '" 🔇');
      return;
    } else {

      const source = this.audioContext.createBufferSource();
      source.buffer = sound;

      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume;

      source.connect(gainNode).connect(this.audioContext.destination);
      source.start();
    }
  }
}
