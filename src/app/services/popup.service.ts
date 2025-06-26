// Indique que ce fichier utilise les décorateurs et l'injection de dépendances Angular
import { Injectable } from '@angular/core';

// Importe les classes nécessaires pour créer et gérer des overlays (modales) avec Angular CDK
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

// Importe ComponentPortal pour pouvoir afficher dynamiquement un composant dans l'overlay
import { ComponentPortal } from '@angular/cdk/portal';

// Importe le composant de la modale de login à afficher
import {LoginInScreenComponent} from '../components/user/login-in-screen/login-in-screen.component';
import {SignInScreenComponent} from '../components/user/sign-in-screen/sign-in-screen.component';

// Déclare ce service comme injectable à la racine de l'application (singleton)
@Injectable({ providedIn: 'root' })
export class ModalService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  openLoginModal(): void {
    this.openModal(LoginInScreenComponent);
  }

  openSignInModal(): void {
    this.openModal(SignInScreenComponent);
  }

  private openModal<T>(component: new (...args: any[]) => T): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    const portal = new ComponentPortal<T>(component);
    const componentRef = this.overlayRef.attach(portal);
    (componentRef.instance as T & { overlayRef?: OverlayRef }).overlayRef = this.overlayRef;

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
