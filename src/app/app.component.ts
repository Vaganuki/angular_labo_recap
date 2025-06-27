import {Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'angular_labo_recap';
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.openLogin();
  }

  openSign() {
    this.modalService.openSignInModal();
  }
  openLogin() {
    this.modalService.openLoginModal();
  }

  openAllUsers() {
    this.modalService.openAllUsersModal();
  }

  openAllEvents() {
    this.modalService.openAllEventsModal();
  }
}
