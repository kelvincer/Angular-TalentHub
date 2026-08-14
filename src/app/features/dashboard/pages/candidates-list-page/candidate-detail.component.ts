import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CandidateService } from '../../services/CandidatesService';
import { Candidate } from '../../models/Candidate';

@Component({
  selector: 'app-candidate-detail',
  imports: [RouterLink],
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.css',
})
export default class CandidateDetailComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private candidateService = inject(CandidateService)
  readonly candidate = signal<Candidate | null>(null)
  readonly loading = signal<boolean>(true)
  readonly yearsLabel = computed(() => {
    const candidate = this.candidate()
    if (!candidate)
      return ''
    return candidate.yearsExperience === 1 ? '1 año de experiencia' : `${candidate.yearsExperience} años de experiencia`
  })

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('candidateId')
    if (id === null)
      return

    this.candidateService.getCandidates().subscribe({
      next: (candidates) => {
        this.candidate.set(candidates.find((c) => c.id === id) ?? null)
        this.loading.set(false)
      },
      error: () => this.loading.set(false)
    })
  }
}
