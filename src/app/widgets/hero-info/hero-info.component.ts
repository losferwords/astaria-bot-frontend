import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent {
    @Input() hero: IHero;

  constructor() {}
}
