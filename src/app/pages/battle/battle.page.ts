import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AbilityTargetType } from 'src/app/enums/ability-target-type.enum';
import { LogMessageType } from 'src/app/enums/log-message-type.enum';
import { TileType } from 'src/app/enums/tile-type.enum';
import { IAbility } from 'src/app/interfaces/IAbility';
import { IBattle } from 'src/app/interfaces/IBattle';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { IHeroData } from 'src/app/interfaces/IHeroData';
import { ILogMessage } from 'src/app/interfaces/ILogMessage';
import { IPosition } from 'src/app/interfaces/IPosition';
import { ITeam } from 'src/app/interfaces/ITeam';
import { BattleService } from 'src/app/services/battle.service';
import { BotService } from 'src/app/services/bot.service';
import { Const } from 'src/app/static/const';
import { UpgradeModalComponent } from 'src/app/widgets/upgrade-modal/upgrade.modal';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
  animations: [
    trigger('battleText', [
      state('fly', style({ left: '{{left}}', top: '{{top}}' }), { params: { left: '*', top: '*' } }),
      transition('* => fly', [animate('3s')])
    ])
  ]
})
export class BattlePageComponent {
  isLoading = false;
  battle: IBattle;
  movePositions: IPosition[] = [];
  activeHero: IHero;
  arrowTarget: IPosition;
  preparedWeapon: IEquip;
  preparedAbility: IAbility;
  targets: string[] = [];
  eventsForRender: ILogMessage[];
  isAutoBattle: boolean = false;
  timer: number = 0;
  botThinkTime: number = 0;

  constructor(
    private router: Router,
    private battleService: BattleService,
    private botService: BotService,
    private dialog: MatDialog
  ) {
    this.battle =
      this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data;
    this.turnPrepare();
    this.botThinkTime = Const.botThinkTime;
  }

  @HostListener('window:keydown.space')
  onSpacePress() {
    this.endTurn();
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
    this.activeHero = this.getHeroesfromQueue()[0];
    if (!this.activeHero.abilities.length && !this.isAutoBattle) {
      this.openUpgradeModal(this.activeHero);
    } else {
      this.getMovePoints();
    }

    if (this.isAutoBattle) {
      this.botAction();
    }
  }

  private getMovePoints() {
    this.isLoading = true;
    if (this.battle) {
      this.battleService.getMovePoints(this.battle.id).subscribe(
        (positions: IPosition[]) => {
          this.isLoading = false;
          this.movePositions = positions;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
  }

  private canMove(hero: IHero): boolean {
    return hero.energy - hero.moveEnergyCost >= 0 && !hero.isImmobilized;
  }

  // Promise returns 'true' if battle is over to prevent map updates
  private updateBattleState(newState: IBattle): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const newEvents = newState.log.slice(this.battle.log.length);

      if (newEvents.find((event: ILogMessage) => event.type === LogMessageType.WIN)) {
        this.battleEnd();
        resolve(true);
      }

      const battleTextEvents = newEvents.filter((event: ILogMessage) => {
        return (
          event.type === LogMessageType.WEAPON_DAMAGE ||
          event.type === LogMessageType.ABILITY_DAMAGE ||
          event.type === LogMessageType.EFFECT_DAMAGE ||
          event.type === LogMessageType.ABILITY_HEAL
        );
      });
      if (battleTextEvents.length > 0) {
        this.renderBattleText([...battleTextEvents]);
      }
      this.battleService.updateBattleState(this.battle, newState);
      resolve(false);
    });
  }

  private renderBattleText(events: ILogMessage[]) {
    this.eventsForRender = events;
    setTimeout(() => {
      this.eventsForRender = [];
    }, 3000);
  }

  private battleEnd() {
    // delete this.battle;
    // this.router.navigate(['/home']);
  }

  private getTeamByHeroId(heroId: string, teams: ITeam[]): ITeam {
    return teams.find((team: ITeam) => {
      return team.heroes.find((hero: IHero) => {
        return hero.id === heroId;
      });
    });
  }

  setArrowTarget(x: number, y: number) {
    if (x > -1 && y > -1 && !(x === this.activeHero.position.x && y === this.activeHero.position.y)) {
      this.arrowTarget = { x, y };
    } else {
      this.arrowTarget = undefined;
    }
  }

  getArrowType() {
    let hero;
    for (let i = 0; i < this.battle.teams.length; i++) {
      for (let j = 0; j < this.battle.teams[i].heroes.length; j++) {
        if (
          this.battle.teams[i].heroes[j].position.x === this.arrowTarget.x &&
          this.battle.teams[i].heroes[j].position.y === this.arrowTarget.y &&
          !this.battle.teams[i].heroes[j].isDead
        ) {
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

  getHeroesfromTeams(): IHero[] {
    const heroes = [];
    for (let i = 0; i < this.battle.teams.length; i++) {
      for (let j = 0; j < this.battle.teams[i].heroes.length; j++) {
        heroes.push(this.battle.teams[i].heroes[j]);
      }
    }
    return heroes;
  }

  getHeroesfromQueue(): IHero[] {
    const queueHeroes = [];
    const heroes = this.getHeroesfromTeams();
    for (let i = 0; i < this.battle.queue.length; i++) {
      queueHeroes.push(
        heroes.find((hero: IHero) => {
          return hero.id === this.battle.queue[i];
        })
      );
    }
    return queueHeroes;
  }

  isHeroAllyToActive(heroId: string): boolean {
    for (let i = 0; i < this.battle.teams.length; i++) {
      if (
        this.battle.teams[i].heroes.find((h) => h.id === heroId) &&
        this.battle.teams[i].heroes.find((h) => h.id === this.activeHero.id)
      ) {
        return true;
      }
    }
    return false;
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
      this.preparedAbility = undefined;
      this.targets = [];
      this.battleService.moveHero(this.battle.id, { x, y }).subscribe(
        (battle: IBattle) => {
          this.isLoading = false;
          this.updateBattleState(battle).then((battleIsEnded: boolean) => {
            this.movePositions = [];
            if (!battleIsEnded) {
              setTimeout(() => {
                this.refreshBattle();
              }, 500);
            }
          });
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
  }

  endTurn() {
    this.isLoading = true;
    this.battleService.endTurn(this.battle.id).subscribe(
      (battle: IBattle) => {
        this.isLoading = false;
        this.updateBattleState(battle).then((battleIsEnded: boolean) => {
          if (!battleIsEnded) {
            setTimeout(() => {
              this.refreshBattle();
            }, 500);
          }
        });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  prepareWeapon(weapon: IEquip) {
    this.preparedAbility = undefined;
    if (this.preparedWeapon && this.preparedWeapon.id === weapon.id) {
      this.preparedWeapon = undefined;
      this.targets = [];
      this.getMovePoints();
    } else {
      this.isLoading = true;
      this.battleService.findEnemies(this.battle.id, this.activeHero.id, weapon.range).subscribe(
        (enemies: string[]) => {
          this.isLoading = false;
          this.preparedWeapon = weapon;
          this.targets = enemies;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
        }
      );
    }
  }

  prepareAbility(ability: IAbility) {
    this.preparedWeapon = undefined;
    if (this.preparedAbility && this.preparedAbility.id === ability.id) {
      this.preparedAbility = undefined;
      this.targets = [];
      this.getMovePoints();
    } else {
      this.isLoading = true;
      switch (ability.targetType) {
        case AbilityTargetType.SELF:
          this.preparedAbility = ability;
          this.castAbility(this.activeHero.id);
          break;
        case AbilityTargetType.ALLY:
          this.battleService.findAllies(this.battle.id, this.activeHero.id, ability.range, true).subscribe(
            (allies: string[]) => {
              this.isLoading = false;
              this.preparedAbility = ability;
              this.targets = allies;
            },
            (err) => {
              this.isLoading = false;
              console.log(err);
            }
          );
          break;
        case AbilityTargetType.ALLY_NOT_ME:
          this.battleService.findAllies(this.battle.id, this.activeHero.id, ability.range, false).subscribe(
            (allies: string[]) => {
              this.isLoading = false;
              this.preparedAbility = ability;
              this.targets = allies;
            },
            (err) => {
              this.isLoading = false;
              console.log(err);
            }
          );
          break;
        case AbilityTargetType.ALLY_OR_ENEMY:
          this.battleService.findHeroes(this.battle.id, this.activeHero.id, ability.range).subscribe(
            (heroes: string[]) => {
              this.isLoading = false;
              this.preparedAbility = ability;
              this.targets = heroes;
            },
            (err) => {
              this.isLoading = false;
              console.log(err);
            }
          );
          break;
        case AbilityTargetType.ENEMY:
          this.battleService.findEnemies(this.battle.id, this.activeHero.id, ability.range).subscribe(
            (enemies: string[]) => {
              this.isLoading = false;
              this.preparedAbility = ability;
              this.targets = enemies;
            },
            (err) => {
              this.isLoading = false;
              console.log(err);
            }
          );
          break;
        // case AbilityTargetType.MAP:
        //   this.battleService.findEnemies(this.battle.id, this.activeHero.id, ability.range).subscribe(
        //     (enemies: string[]) => {
        //       this.isLoading = false;
        //       this.preparedAbility = ability;
        //       this.targets = enemies;
        //     },
        //     (err) => {
        //       this.isLoading = false;
        //       console.log(err);
        //     }
        //   );
        //   break;
        // case AbilityTargetType.MOVE:
        //   this.battleService.findEnemies(this.battle.id, this.activeHero.id, ability.range).subscribe(
        //     (enemies: string[]) => {
        //       this.isLoading = false;
        //       this.preparedAbility = ability;
        //       this.targets = enemies;
        //     },
        //     (err) => {
        //       this.isLoading = false;
        //       console.log(err);
        //     }
        //   );
        //   break;
      }
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
        this.isLoading = true;
        this.battleService.useWeapon(this.battle.id, hero.id, this.preparedWeapon.id).subscribe(
          (battle: IBattle) => {
            this.isLoading = false;
            this.updateBattleState(battle).then((battleIsEnded: boolean) => {
              this.preparedWeapon = undefined;
              this.targets = [];
              this.movePositions = [];

              if (!battleIsEnded) {
                setTimeout(() => {
                  this.refreshBattle();
                }, 500);
              }
            });
          },
          (err) => {
            this.isLoading = false;
            console.log(err);
          }
        );
      }
      if (this.preparedAbility) {
        this.castAbility(hero.id);
      }
    }
  }

  castAbility(targetId?: string, position?: IPosition) {
    this.isLoading = true;
    this.battleService.castAbility(this.battle.id, this.preparedAbility.id, targetId, position).subscribe(
      (battle: IBattle) => {
        this.isLoading = false;
        this.updateBattleState(battle).then((battleIsEnded: boolean) => {
          this.preparedAbility = undefined;
          this.targets = [];
          this.movePositions = [];

          if (!battleIsEnded) {
            setTimeout(() => {
              this.refreshBattle();
            }, 500);
          }
        });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  getHeroPositionById(heroId: string): IPosition {
    const heroes = this.getHeroesfromTeams();
    const targetHero: IHero = heroes.find((hero: IHero) => {
      return hero.id === heroId;
    });
    return targetHero.position;
  }

  botAction() {
    this.isLoading = true;
    this.timer = Const.botThinkTime;
    var thinkInterval = setInterval(() => {
      if (this.timer - 100 > 0) {
        this.timer -= 100;
      } else {
        this.timer = 0;
        clearInterval(thinkInterval);
      }
    }, 100);
    this.botService.botAction(this.battle.id).subscribe(
      (battle: IBattle) => {
        this.isLoading = false;
        this.timer = 0;
        clearInterval(thinkInterval);
        this.updateBattleState(battle).then((battleIsEnded: boolean) => {
          this.preparedWeapon = undefined;
          this.preparedAbility = undefined;
          this.targets = [];
          this.movePositions = [];

          if (!battleIsEnded) {
            setTimeout(() => {
              this.refreshBattle();
            }, 500);
          }
        });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  toggleAutoBattle() {
    if (this.isAutoBattle) {
      this.isAutoBattle = false;
    } else {
      this.isAutoBattle = true;
      this.botAction();
    }
  }

  tileHasCrystal(x: number, y: number): boolean {
    return !!this.battle.crystalPositions.find((cp) => {
      return x === cp.x && y === cp.y;
    });
  }

  openUpgradeModal(hero: IHero) {
    this.isLoading = true;
    this.battleService.getHeroData(hero.id).subscribe(
      (heroData: IHeroData) => {
        this.isLoading = false;
        const dialogRef = this.dialog.open(UpgradeModalComponent, {
          data: {
            hero: hero,
            heroData: heroData,
            crystals: this.getTeamByHeroId(hero.id, this.battle.teams).crystals,
            battle: this.battle
          },
          panelClass: 'hero-upgrade-modal',
          disableClose: true
        });

        dialogRef
          .afterClosed()
          .subscribe((upgradeResult: { equipId: string; abilityId: string; auto: { isAutoBattle: boolean } }) => {
            if (upgradeResult.equipId) {
              this.isLoading = true;
              this.battleService.upgradeEquip(this.battle.id, upgradeResult.equipId).subscribe(
                (battle: IBattle) => {
                  this.isLoading = false;
                  this.updateBattleState(battle).then((battleIsEnded: boolean) => {
                    this.preparedWeapon = undefined;
                    this.preparedAbility = undefined;
                    this.targets = [];
                    this.movePositions = [];

                    if (!battleIsEnded) {
                      setTimeout(() => {
                        this.refreshBattle();
                      }, 500);
                    }
                  });
                },
                (err) => {
                  this.isLoading = false;
                  console.log(err);
                }
              );
            } else if (upgradeResult.abilityId) {
              this.isLoading = true;
              this.battleService.learnAbility(this.battle.id, upgradeResult.abilityId).subscribe(
                (battle: IBattle) => {
                  this.isLoading = false;
                  this.updateBattleState(battle).then((battleIsEnded: boolean) => {
                    this.preparedWeapon = undefined;
                    this.preparedAbility = undefined;
                    this.targets = [];
                    this.movePositions = [];

                    if (!battleIsEnded) {
                      setTimeout(() => {
                        this.refreshBattle();
                      }, 500);
                    }
                  });
                },
                (err) => {
                  this.isLoading = false;
                  console.log(err);
                }
              );
            } else if (upgradeResult.auto) {
              if (upgradeResult.auto.isAutoBattle) {
                this.isAutoBattle = true;
              }
              this.botAction();
            }
          });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}
