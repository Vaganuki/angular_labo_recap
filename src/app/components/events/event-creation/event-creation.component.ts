import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  )
  {
    this.createEventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      userId: ['', Validators.required],
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

    const EventData: EventData = this.createEventForm.value;

    this.http.post('http://localhost:3000/events', EventData)
      .subscribe({
        next: () => {
          alert('Événement créé avec succès !');
          this.router.navigate(['/main-page']);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l’événement:', err);
          alert('Une erreur est survenue lors de la création de l’événement. Veuillez réessayer.');
        }
      })

  }


}
