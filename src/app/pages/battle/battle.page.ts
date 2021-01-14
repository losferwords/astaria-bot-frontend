import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBattle } from 'src/app/interfaces/IBattle';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss']
})
export class BattlePageComponent {
  isLoading = false;
  battle: IBattle;

  constructor(private router: Router, private battleService: BattleService, private cd: ChangeDetectorRef) {
    this.battle = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data;
    console.log(this.battle);
  }
}
