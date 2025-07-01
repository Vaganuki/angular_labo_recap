import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RegisterData } from '../../../interfaces/register.interface';
import { NgIf } from '@angular/common';
import {SoundSystemService} from '../../../services/sound-system.service';

@Component({
  selector: 'app-profil',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgIf,
        RouterOutlet,
    ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  user?: RegisterData;
  volume = 1;

  private userService = inject(UserService);
  private router = inject(Router);
  private _soundSystem = inject(SoundSystemService);

  close(){
    this._soundSystem.playSound('recycle', this.volume);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user
      },
      error: (err) => console.error('Erreur récupération profil:', err)
    });
  }

  deleteProfile(): void {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.");
    if (!confirmation) return;

    const doubleConfirmation = window.confirm("Êtes-vous vraiment sûr ?");
    if (!doubleConfirmation) return;

    const tripleConfirmation = window.confirm("TÈ VRRRRRRÈÈÈÈÈÈÈÈÈMENT SÛR ?");
    if (!tripleConfirmation) return;

    const finalConfirmation = window.confirm("Bon bah d'accord...");
    if (!finalConfirmation) return;

    this.userService.deleteCurrentUser().subscribe({
      next: () => {
        localStorage.removeItem('token');
        void this.router.navigate(['/homepage']);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du profil :', err);
        alert('Une erreur est survenue lors de la suppression du profil.');
      }
    });
  }

}
