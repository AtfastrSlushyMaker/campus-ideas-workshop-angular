
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  // fallback local list (used if backend unavailable)
  suggestionList: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journee team building',
      description:
        "Suggestion pour organiser une journee de team building pour renforcer les liens entre les membres de l'equipe.",
      category: 'Evenements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Ameliorer le systeme de reservation',
      description:
        'Proposition pour ameliorer la gestion des reservations en ligne avec un systeme de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Creer un systeme de recompenses',
      description:
        "Mise en place d'un programme de recompenses pour motiver les employes et reconnaitre leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description:
        "Refonte complete de l'interface utilisateur pour une meilleure experience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  // backend URL (assignment expects this)
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  // Returns Observable from backend
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<any>(this.suggestionUrl + '/' + id);
  }

  addSuggestion(suggestion: Partial<Suggestion>): Observable<any> {
    return this.http.post<any>(this.suggestionUrl, suggestion);
  }

  updateSuggestion(id: number, suggestion: Partial<Suggestion>): Observable<any> {
    return this.http.put<any>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.suggestionUrl}/${id}`);
  }

  // Use backend like endpoint to increment likes
  updateLikes(id: number, nbLikes: number): Observable<any> {
    // backend exposes POST /:id/like to increment; use that for atomic increment
    return this.http.post<any>(`${this.suggestionUrl}/${id}/like`, null);
  }
}
