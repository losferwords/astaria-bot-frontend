import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBattle } from 'src/app/interfaces/IBattle';
import { IHeroSetup } from 'src/app/interfaces/IHeroSetup';
import { BattleService } from 'src/app/services/battle.service';
import { Const } from 'src/app/static/const';

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.page.html',
  styleUrls: ['./team-setup.page.scss']
})
export class TeamSetupPageComponent {
  isLoading = false;
  teamSetupMatrix: number[];
  teamSetup: IHeroSetup[][] = [];
  availableHeroes = [];
  scenarioId: string;

  constructor(private router: Router, private battleService: BattleService, private cd: ChangeDetectorRef) {
    this.teamSetupMatrix = this.router.getCurrentNavigation().extras.state.data.teamSetupMatrix;
    this.scenarioId = this.router.getCurrentNavigation().extras.state.data.scenarioId;
    for (let i = 0; i < this.teamSetupMatrix.length; i++) {
      this.teamSetup.push([]);
      for (let j = 0; j < this.teamSetupMatrix[i]; j++) {
        this.teamSetup[i].push({
          gender: 'male',
          hero: 'random'
        });
      }
    }
    for (let i = 0; i < Const.availableHeroes.length; i++) {
      this.availableHeroes.push({ name: Const.availableHeroes[i], isAvailable: true });
    }
  }

  selectHero(heroSetup: IHeroSetup, availableHero: any | string): void {
    if (heroSetup.hero !== 'random') {
      const previousHero = this.availableHeroes.find((h) => {
        return h.name === heroSetup.hero;
      });
      previousHero.isAvailable = true;
    }
    heroSetup.hero = availableHero.name ? availableHero.name : availableHero;
    if (availableHero !== 'random') {
      availableHero.isAvailable = false;
    }
  }

  startBattle(): void {
    this.isLoading = true;
    this.battleService.startBattle({ scenarioId: this.scenarioId, teamSetup: this.teamSetup }).subscribe(
      (res: IBattle) => {
        this.isLoading = false;
        this.cd.detectChanges();
        this.router.navigate(['/battle'], { state: { data: res } });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}
