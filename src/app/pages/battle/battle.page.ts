import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { LogMessageType } from 'src/app/enums/log-message-type.enum';
import { TileType } from 'src/app/enums/tile-type.enum';
import { IBattle } from 'src/app/interfaces/IBattle';
import { IEquip } from 'src/app/interfaces/iEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { ILogMessage } from 'src/app/interfaces/ILogMessage';
import { IPosition } from 'src/app/interfaces/IPosition';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
  animations: [
    trigger('battleText', [
      state('fly', style({left: '({{left}}', top: '{{top}}'}), {params: { left: '*', top: '*' }}),
      transition('* => fly', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class BattlePageComponent {
  isLoading = false;
  battle: IBattle;
  movePositions: IPosition[] = [];
  activeHero: IHero;
  arrowTarget: IPosition;
  preparedWeapon: IEquip;
  targets: string[] = [];
  eventForRender: ILogMessage;

  constructor(private router: Router, private battleService: BattleService) {
    this.battle = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data;
    this.turnPrepare();
  }

  get TileType(): typeof TileType {
    return TileType;
  }

  get LogMessageType(): typeof LogMessageType {
    return LogMessageType;
  }

  private turnPrepare() {
    this.refreshBattle();
  }

  private refreshBattle() {
    this.getMovePoints();
    this.activeHero = this.getHeroesfromQueue()[0];
  }

  private getMovePoints() {
    this.isLoading = true;
    this.battleService.getMovePoints(this.battle.id).subscribe((positions: IPosition[]) => {
      this.isLoading = false;
      this.movePositions = positions;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

  private canMove(hero: IHero): boolean {
    return hero.energy - hero.moveEnergyCost >= 0 && !hero.isImmobilized;
  }

  private updateBattleState(newState: IBattle) {
    const newEvents = newState.log.slice(this.battle.log.length - 1).filter((event: ILogMessage) => {
      return event.type === LogMessageType.WEAPON_DAMAGE;
    });
    if (newEvents.length > 0) {
      this.renderBattleText([...newEvents]);
    }
    this.battleService.updateBattleState(this.battle, newState);
  }

  private renderBattleText(events: ILogMessage[]) {
    this.eventForRender = events[0];
    events.shift();

    const eventRenderInterval =  setInterval(() => {
      if (events.length > 0) {
        this.eventForRender = events[0];
        events.shift();
      } else {
        clearInterval(eventRenderInterval);
      }
    }, 500);
  }

  setArrowTarget(x: number, y: number) {
    if (x > -1 && y > -1) {
      this.arrowTarget = {x, y};
    } else {
      this.arrowTarget = undefined;
    }
  }

  getArrowType() {
    let hero;
    for (let i = 0; i < this.battle.teams.length; i++) {
      for (let j = 0; j < this.battle.teams[i].heroes.length; j++) {
        if (this.battle.teams[i].heroes[j].position.x === this.arrowTarget.x && this.battle.teams[i].heroes[j].position.y === this.arrowTarget.y && !this.battle.teams[i].heroes[j].isDead) {
          hero = this.battle.teams[i].heroes[j];
          break;
        }
      }
    }
    if (hero) {
      return this.isHeroAllyToActive(hero.id) ? 'ally' : 'enemy';
    } else {
      return '';
    }
  }

  getHeroesfromQueue(): IHero[] {
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

  isHeroAllyToActive(heroId: string): boolean {
    let heroTeamId;
    let activeHeroTeamId;
    for (let i = 0; i < this.battle.teams.length; i++) {
      for (let j = 0; j < this.battle.teams[i].heroes.length; j++) {
        if (this.battle.teams[i].heroes[j].id === heroId) {
          heroTeamId = this.battle.teams[i].id;
        }
        if (this.battle.teams[i].heroes[j].id === this.activeHero.id) {
          activeHeroTeamId = this.battle.teams[i].id;
        }
      }
    }
    return heroTeamId === activeHeroTeamId;
  }

  isMoveAvailableTile(x: number, y: number): boolean {
    if (this.canMove(this.activeHero)) {
      return !!this.movePositions.find((position: IPosition) => {
        return position.x === x && position.y === y;
      });
    } else {
      return false;
    }
  }

  moveHero(x: number, y: number) {
    if (this.isMoveAvailableTile(x, y)) {
      this.isLoading = true;
      this.preparedWeapon = undefined;
      this.targets = [];
      this.battleService.moveHero(this.battle.id, {x, y}).subscribe((battle: IBattle) => {
        this.isLoading = false;
        this.updateBattleState(battle);
        this.movePositions = [];
        setTimeout(() => {
          this.refreshBattle();
        }, 500);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      });
    }
  }

  endTurn() {
    this.isLoading = true;
    this.battleService.endTurn(this.battle.id).subscribe((battle: IBattle) => {
      this.isLoading = false;
      this.updateBattleState(battle);
      this.refreshBattle();
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

  prepareWeapon(weapon: IEquip) {
    if (this.preparedWeapon) {
      this.preparedWeapon = undefined;
      this.targets = [];
      this.getMovePoints();
    } else {
      this.isLoading = true;
      this.battleService.findEnemies(this.battle.id, this.activeHero.id, weapon.range).subscribe((enemies: string[]) => {
        this.isLoading = false;
        this.preparedWeapon = weapon;
        this.targets = enemies;
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      });
    }
  }

  isTarget(heroId: string): boolean {
    return !!this.targets.find((target: string) => {
      return target === heroId;
    });
  }

  heroTileClicked(hero: IHero) {
    if (this.isTarget(hero.id)) {
      if (this.preparedWeapon) {
        this.battleService.useWeapon(this.battle.id, hero.id, this.preparedWeapon.id).subscribe((battle: IBattle) => {
          this.isLoading = false;
          this.updateBattleState(battle);
          this.preparedWeapon = undefined;
          this.targets = [];
          this.movePositions = [];
          setTimeout(() => {
            this.refreshBattle();
          }, 500);
        }, (err) => {
          this.isLoading = false;
          console.log(err);
        });
      }
    }
  }

  getHeroPositionById(heroId: string): IPosition {
    const heroes = this.getHeroesfromQueue();
    const targetHero: IHero = heroes.find((hero: IHero) => {
      return hero.id === heroId;
    });
    return targetHero.position;
  }
}
