import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBattle } from 'src/app/interfaces/IBattle';
import { ITeamSetup } from 'src/app/interfaces/ITeamSetup';
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
  teamSetup: ITeamSetup[][] = [];
  availableHeroes = [];

  constructor(private router: Router, private battleService: BattleService) {
    this.teamSetupMatrix = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data;
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
      this.availableHeroes.push({name: Const.availableHeroes[i], isAvailable: true});
    }
  }

  selectHero(heroSetup: ITeamSetup, availableHero: any | string): void {
    if (heroSetup.hero !== 'random') {
      const previousHero = this.availableHeroes.find(h => {
        return h.name === heroSetup.hero;
      });
      previousHero.isAvailable = true;
    }
    heroSetup.hero = availableHero.name ? availableHero.name : availableHero;
    if (availableHero !== 'random'){
      availableHero.isAvailable = false;
    }
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
