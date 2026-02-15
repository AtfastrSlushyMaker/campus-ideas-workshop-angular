import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SUGGESTIONS } from '../suggestions.data';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion?: Suggestion;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      this.suggestion = SUGGESTIONS.find((item) => item.id === id);
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
