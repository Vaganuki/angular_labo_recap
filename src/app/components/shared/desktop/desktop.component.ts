import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {SoundSystemService} from '../../../services/sound-system.service';

@Component({
  selector: 'app-desktop',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {

  constructor(
    private router: Router,
  ) {}


  private _soundSystem = inject(SoundSystemService);

  volume = 1;

  heure = `${new Date().getHours().toString().padStart(2, '0')} : ${new Date().getMinutes().toString().padStart(2, '0')}`;
  timer  = setInterval(() => {});

  ngOnInit() {
   this.timer = setInterval(() => {
     this.heure = `${new Date().getHours().toString().padStart(2, '0')} : ${new Date().getMinutes().toString().padStart(2, '0')}`;
   }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  error(){
    this._soundSystem.playSound('error', this.volume);
    this.volume++;
  }

  viouwm(){
    this._soundSystem.playSound('microsoft', this.volume);
  }

  logout(){
      localStorage.removeItem('token');
      void this.router.navigate(['/homepage']);
  }
}
