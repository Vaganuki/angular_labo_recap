import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop',
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {

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

}
