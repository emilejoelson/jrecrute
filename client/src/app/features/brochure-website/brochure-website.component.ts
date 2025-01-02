import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/components/header/header.component';
import { FooterComponent } from '../../common/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brochure-website',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './brochure-website.component.html',
  styleUrl: './brochure-website.component.scss',
})
export class BrochureWebsiteComponent {
  
}
