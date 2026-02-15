import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionsComponent } from './suggestions.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      { path: '', component: ListSuggestionComponent },
      { path: ':id', component: SuggestionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
