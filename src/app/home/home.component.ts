import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  v1 = "Welcome to the Home Page!";
  v2=true;

  fn() {
    alert("Button clicked!");
  }

  v3 = "Malek";
}
