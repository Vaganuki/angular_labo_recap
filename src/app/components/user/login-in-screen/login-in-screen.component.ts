import {Component, Input} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-login-in-screen',
  imports: [],
  templateUrl: './login-in-screen.component.html',
  styleUrl: './login-in-screen.component.scss'
})
export class LoginInScreenComponent {
  @Input() overlayRef!: OverlayRef;

  close() {
    this.overlayRef?.dispose();
  }
}
