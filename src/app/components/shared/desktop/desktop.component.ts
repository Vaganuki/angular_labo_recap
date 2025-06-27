import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {SoundSystemService} from '../../../services/sound-system.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-desktop',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {

  constructor(
    private router: Router,
  ) {}


  private _soundSystem = inject(SoundSystemService);
  private _authService = inject(AuthService);
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

  logout() {
    const confirmLogout = window.confirm('🔒 Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      this._authService.logout();
      void this.router.navigate(['/welcome']);
    }
  }
}
