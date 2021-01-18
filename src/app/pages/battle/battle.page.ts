import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { TileType } from 'src/app/enums/tile-type.enum';
import { IBattle } from 'src/app/interfaces/IBattle';
import { IHero } from 'src/app/interfaces/IHero';
import { IPosition } from 'src/app/interfaces/IPosition';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss']
})
export class BattlePageComponent {
  isLoading = false;
  battle: IBattle;
  movePositions: IPosition[] = [];

  constructor(private router: Router, private battleService: BattleService, private cd: ChangeDetectorRef) {
    this.battle = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data;
    console.log(this.battle);
    this.turnPrepare();
  }

  get TileType(): typeof TileType {
    return TileType;
  }

  getHeroesfromQueue() {
    const heroes = [];
    const queueHeroes = [];
    for (let i = 0; i < this.battle.teams.length; i++){
        for (let j = 0; j < this.battle.teams[i].heroes.length; j++) {
            heroes.push(this.battle.teams[i].heroes[j]);
        }
    }
    for (let i = 0; i < this.battle.queue.length; i++) {
      queueHeroes.push(heroes.find((hero: IHero) => {
        return hero.id === this.battle.queue[i];
      }));
    }
    return queueHeroes;
  }

  private turnPrepare() {
    this.getMovePoints();
  }

  private getMovePoints() {
    this.isLoading = true;
    this.battleService.getMovePoints(this.battle.id).subscribe((positions: IPosition[]) => {
      this.isLoading = false;
      this.cd.detectChanges();
      this.movePositions = positions;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

  isMoveAvailableTile(x: number, y: number): boolean {
    return !!this.movePositions.find((position: IPosition) => {
      return position.x === x && position.y === y;
    });
  }
}
