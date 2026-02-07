import { Suggestion } from './../../models/suggestion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: "Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.",
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description: "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    },
  ];
  like(index: number) {
    this.suggestions[index].nbLikes++;
  }
  favorites: Suggestion[] = [];
  allSuggestions: Suggestion[] = [];

  ngOnInit() {
    this.allSuggestions = [...this.suggestions];
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
}

