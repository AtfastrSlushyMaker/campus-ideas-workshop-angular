import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SUGGESTIONS } from '../suggestions.data';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [];
  searchTerm = '';
  like(index: number) {
    this.suggestions[index].nbLikes++;
  }
  favorites: Suggestion[] = [];
  allSuggestions: Suggestion[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.suggestions = [...SUGGESTIONS];
    this.allSuggestions = [...SUGGESTIONS];
  }

  addToFavorites(suggestion: Suggestion) {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
      alert('Suggestion ajoutée aux favoris !');
    }
    else
      alert('Suggestion déjà dans les favoris !');
  }

  searchTitleCategory(searchTerm: string): void {
    if (!searchTerm) {
      this.suggestions = [...this.allSuggestions];
      return;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.suggestions = this.allSuggestions.filter((suggestion: Suggestion) =>
      suggestion.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      suggestion.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  getCategoryClass(category: string): string {
    const normalized = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/\s+/g, '-');
    return `category-${normalized}`;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'acceptee': 'ACCEPTÉE',
      'refusee': 'REFUSÉE',
      'en_attente': 'EN ATTENTE'
    };
    return labels[status] || status.toUpperCase();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

}

