import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion?: Suggestion;
  suggestionList: Suggestion[] = [];

  constructor(private route: ActivatedRoute, private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      this.suggestionService.getSuggestionById(id).subscribe({
        next: (s) => this.suggestion = s,
        error: () => { /* handle error or leave undefined */ }
      });
    }
  }

  getCategoryClass(category: string): string {
    const normalized = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return `category-${normalized}`;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      acceptee: 'ACCEPTEE',
      refusee: 'REFUSEE',
      en_attente: 'EN ATTENTE'
    };
    return labels[status] || status.toUpperCase();
  }

}
