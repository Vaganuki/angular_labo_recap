import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DevComponent} from './components/dev/dev.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_labo_recap';
}
