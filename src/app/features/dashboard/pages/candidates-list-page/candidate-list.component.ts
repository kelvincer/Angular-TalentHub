import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/CandidatesService';
import { Candidate } from '../../models/Candidate';
import { CandidateCardComponent } from "../../../../shared/candidate-card/candidate-card.component";
import { UsersService } from '../../services/UsersService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  imports: [FormsModule, CandidateCardComponent],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css',
})
export default class CandidateListComponent implements OnInit {

  private readonly router = inject(Router)
  private candidateService = inject(CandidateService)
  private userService = inject(UsersService)
  readonly candidates = signal<Candidate[]>([])
  readonly search = model('')
  readonly userId = computed(() => this.userService.currentUser()?.id)
  readonly filteredCandidates = computed(() => {
    const lowerSearch = this.search().toLocaleLowerCase()
    return this.candidates().filter((c) => c.fullName.toLocaleLowerCase().includes(lowerSearch)
      || c.email.toLocaleLowerCase().includes(lowerSearch)
      || c.title.toLocaleLowerCase().includes(lowerSearch)
      || c.summary.toLocaleLowerCase().includes(lowerSearch))
  })

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe({
      next: (data) => { this.candidates.set(data) },
      error: (error) => console.log(error)
    })
  }

  navigateNewCandidate() {
    const userId = this.userId()
    if (!userId)
      return

    this.router.navigate(['/dashboard', userId, 'candidates', 'new'])
  }
}
