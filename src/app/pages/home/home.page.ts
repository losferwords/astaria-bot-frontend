import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Scenario } from 'src/app/enums/scenario.enum';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {
  isLoading = false;
  scenarios: Scenario[] = [];

  constructor(private router: Router, private battleService: BattleService, private cd: ChangeDetectorRef) {
    this.isLoading = true;
    this.battleService.getScenarios().subscribe({
      next: (scenarios: Scenario[]) => {
        this.isLoading = false;
        this.cd.detectChanges();
        this.scenarios = scenarios;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  chooseScenario(id: Scenario): void {
    this.isLoading = true;
    this.battleService.getScenarioTeamSize(id).subscribe(
      (res: number[]) => {
        this.isLoading = false;
        this.cd.detectChanges();
        this.router.navigate(['/team-setup'], { state: { data: { scenarioId: id, teamSetupMatrix: res } } });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}
