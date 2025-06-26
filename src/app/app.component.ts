import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ModalService} from './services/popup.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { RouterModule } from '@angular/router'; // <-- Ajoute ceci


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,OverlayModule, PortalModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_labo_recap';
  constructor(private modalService: ModalService) {}

  openSign() {
    this.modalService.openSignInModal();
  }
  openLogin() {
    this.modalService.openLoginModal();
  }
}
