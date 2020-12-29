import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBattle } from 'src/app/interfaces/IBattle';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.page.html',
  styleUrls: ['./team-setup.page.scss']
})
export class TeamSetupPageComponent {
  isLoading = false;
  teamSetupMatrix: number[];

  constructor(private router: Router, private battleService: BattleService) {
    this.teamSetupMatrix = router.getCurrentNavigation().extras.state && router.getCurrentNavigation().extras.state.data;
  }

  chooseScenario(id: string): void {
    this.isLoading = true;
    this.battleService.getScenarioTeamSize(id).subscribe((res: number[]) => {
      this.isLoading = false;
      console.log(res);
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }
}
