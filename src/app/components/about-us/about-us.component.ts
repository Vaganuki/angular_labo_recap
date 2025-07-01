import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SoundSystemService} from '../../services/sound-system.service';

@Component({
  selector: 'app-about-us',
  imports: [
    RouterLink
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  private _soundSystem = inject(SoundSystemService);
  volume = 1;

  close(){
    this._soundSystem.playSound('recycle', this.volume);
  }

  clic(){
    this._soundSystem.playSound('start', this.volume);
  }

}
