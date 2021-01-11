import { Component, Input } from '@angular/core';
import { IHero } from 'src/app/interfaces/IHero';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent {
    @Input() hero: IHero;

  constructor() {}
}
