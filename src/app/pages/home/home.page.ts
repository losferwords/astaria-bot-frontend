import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IScenarioSetupDto } from 'src/app/dto/scenario-setup.dto';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {
  isLoading = false;
  scenarios: IScenarioSetupDto[] = [];

  constructor(private router: Router, private battleService: BattleService, private cd: ChangeDetectorRef) {
    this.isLoading = true;
    this.battleService.getScenarios().subscribe({
      next: (scenarios: IScenarioSetupDto[]) => {
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

  chooseScenario(scenario: IScenarioSetupDto): void {
    this.router.navigate(['/team-setup'], {
      state: { data: { scenarioId: scenario.id, teamSetupMatrix: scenario.teamSize } }
    });
  }
}
