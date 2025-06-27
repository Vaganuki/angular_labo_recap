import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private auth = inject(AuthService);
  isLoggedIn = false;
  heure = `${new Date().getHours().toString().padStart(2, '0')} : ${new Date().getMinutes().toString().padStart(2, '0')}`;
  timer = setInterval(() => {
  });

  constructor() {
  }

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.timer = setInterval(() => {
      this.heure = `${new Date().getHours().toString().padStart(2, '0')} : ${new Date().getMinutes().toString().padStart(2, '0')}`;
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
