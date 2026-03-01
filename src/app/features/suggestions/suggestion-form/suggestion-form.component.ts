import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  form!: FormGroup;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(private fb: FormBuilder, private router: Router, private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[A-Z][a-zA-Z]*$')
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: this.formatDate(new Date()), disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newSuggestion: Partial<Suggestion> = {
      title: this.f['title'].value,
      description: this.f['description'].value,
      category: this.f['category'].value,
      status: 'en_attente'
    };

    this.suggestionService.addSuggestion(newSuggestion).subscribe({
      next: (res) => {
        console.log('Add suggestion response:', res);
        const ok = res && (res.success || res.id || res.insertId);
        if (ok) {
          this.router.navigate(['/suggestions']);
          return;
        }
        alert('La suggestion n\'a pas pu être ajoutée (réponse inattendue).');
      },
      error: (err) => {
        console.error('Add suggestion error:', err);
        alert('Erreur lors de l\'ajout de la suggestion. Vérifiez le serveur backend et MySQL.');
      }
    });
  }

  private formatDate(date: Date): string {
    // yyyy-MM-dd for input[type=date]
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
