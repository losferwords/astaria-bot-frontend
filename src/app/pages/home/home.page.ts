import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {
  isLoading = false;

  constructor(private router: Router, private battleService: BattleService, private cd: ChangeDetectorRef) {}

  chooseScenario(id: string): void {
    this.isLoading = true;
    this.battleService.getScenarioTeamSize(id).subscribe((res: number[]) => {
      this.isLoading = false;
      this.cd.detectChanges();
      this.router.navigate(['/team-setup'], {state: {data: {scenarioId: id, teamSetupMatrix: res}}});
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }
}
