import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipationService } from '../../../services/participation.service';
import { EventData } from '../../../interfaces/event.interface';

@Component({
  selector: 'app-event-creation',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './event-creation.component.html',
  styleUrl: './event-creation.component.scss'
})
export class EventCreationComponent {

  createEventForm: FormGroup;
  userId= localStorage.getItem('userId');

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private participationService: ParticipationService
  )
  {
    this.createEventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      userId: [ this.userId || '', Validators.required],
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if(this.createEventForm.invalid){
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }


    this.isSubmitting = true;

    const eventData: EventData = this.createEventForm.value;

    this.http.post<EventData>('http://localhost:3000/events', eventData)
      .subscribe({
        next: (createdEvent) => {
          // Création automatique de la participation du créateur
          this.participationService.createParticipation({
            eventId: createdEvent.id,
            userId: +this.userId!
          }).subscribe({
            next: () => {
              alert('Événement créé et participation enregistrée !');
              this.isSubmitting = false;
              void this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Erreur lors de la participation automatique :', err);
              alert('L\'événement a été créé mais la participation a échoué.');
              this.isSubmitting = false;
              void this.router.navigate(['/']);
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la création de l’événement:', err);
          alert('Une erreur est survenue lors de la création de l’événement. Veuillez réessayer.');
          this.isSubmitting = false;
        }
      });

  }

}
