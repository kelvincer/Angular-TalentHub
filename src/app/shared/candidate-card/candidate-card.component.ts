import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../features/dashboard/models/Candidate';
import { UsersService } from '../../features/dashboard/services/UsersService';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrl: './candidate-card.component.css',
})
export class CandidateCardComponent {
  private readonly router = inject(Router)
  private userService = inject(UsersService)
  readonly candidate = input.required<Candidate>()
  yearsLabel = computed(() =>
    this.candidate().yearsExperience === 1 ? '1 año de experiencia' : `${this.candidate().yearsExperience} años de experiencia`
  );
  private readonly avatarColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-info", "bg-success", "bg-warning", "bg-error"]
  readonly avatarBgColor = signal(this.avatarColors[Math.floor(Math.random() * this.avatarColors.length)])

  seeProfile() {
    const userId = this.userService.currentUser()?.id
    if (!userId)
      return

    this.router.navigate(['/dashboard', userId, 'candidates', this.candidate().id])
  }
}
