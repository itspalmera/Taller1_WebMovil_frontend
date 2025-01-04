import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-template',
  imports: [],
  templateUrl: './button-template.component.html',
  styleUrl: './button-template.component.css'
})
export class ButtonTemplateComponent {

  @Input() label: string = '';
  @Input() route: string = '';

  constructor(private router: Router) {}

  navigateToPage() {
    this.router.navigate([this.route]);
  }
}
