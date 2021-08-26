import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AbilityTargetType } from 'src/app/enums/ability-target-type.enum';
import { LogMessageType } from 'src/app/enums/log-message-type.enum';
import { TileType } from 'src/app/enums/tile-type.enum';
import { IAbility } from 'src/app/interfaces/IAbility';
import { IBattle } from 'src/app/interfaces/IBattle';
import { IChar } from 'src/app/interfaces/IChar';
import { IEffect } from 'src/app/interfaces/IEffect';
import { IEquip } from 'src/app/interfaces/IEquip';
import { IHero } from 'src/app/interfaces/IHero';
import { IHeroData } from 'src/app/interfaces/IHeroData';
import { ILogMessage } from 'src/app/interfaces/ILogMessage';
import { IPet } from 'src/app/interfaces/IPet';
import { IPosition } from 'src/app/interfaces/IPosition';
import { ITeam } from 'src/app/interfaces/ITeam';
import { BattleService } from 'src/app/services/battle.service';
import { BotService } from 'src/app/services/bot.service';
import { Const } from 'src/app/static/const';
import { Setups } from 'src/app/static/setups';
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
  petMovePositions: IPosition[] = [];
  mapAbilityPositions: IPosition[] = [];
  activeHero: IHero;
  activePet: IPet;
  arrowTarget: IPosition;
  preparedWeapon: IEquip;
  preparedAbility: IAbility;
  preparedPetAbility: IAbility;
  targets: string[] = [];
  eventsForRender: ILogMessage[];
  isAutoBattle: boolean = false;
  isAutoOneTurn: boolean = false;
  timerActive: boolean = false;
  botThinkTime: number = 0;
  setupIndex: number = -1;
  isBattleEnd: boolean = false;

  constructor(
    private router: Router,
    private battleService: BattleService,
    private botService: BotService,
    private dialog: MatDialog
  ) {
    this.battle = this.router.getCurrentNavigation().extras?.state?.data.battle;
    this.setupIndex = this.router.getCurrentNavigation().extras?.state?.data.setupIndex;
    if (this.setupIndex > -1) {
      console.log('Setup ' + this.setupIndex + ' has started');
      this.isAutoBattle = true;
    }
    this.turnPrepare();
    this.botThinkTime = Const.botThinkTime;
  }

  @HostListener('window:keydown.space')
  onSpacePress() {
    if (this.isAutoOneTurn || this.isAutoBattle || this.isLoading || this.activeHero.abilities.length === 0) {
      return;
    }
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
    if (this.isBattleEnd || this.battle.log.find((event: ILogMessage) => event.type === LogMessageType.WIN)) {
      return;
    }
    this.activeHero = this.getHeroesfromQueue()[0];
    if (!this.activeHero.abilities.length && !this.isAutoBattle) {
      this.openUpgradeModal(this.activeHero);
    } else {
      this.getMovePoints();
    }

    if (this.isAutoBattle || this.isAutoOneTurn) {
      this.botAction();
    }
  }

  private getMovePoints() {
    this.isLoading = true;
    if (this.battle) {
      this.battleService.getMovePoints(this.battle.id).subscribe({
        next: (positions: IPosition[]) => {
          this.isLoading = false;
          this.mapAbilityPositions = [];
          this.movePositions = positions;
          this.petMovePositions = [];
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  private canMove(hero: IHero): boolean {
    return hero.energy - hero.moveEnergyCost >= 0 && !hero.isImmobilized;
  }

  // Promise returns 'true' if battle is over to prevent map updates
  private updateBattleState(newState: IBattle): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const newEvents = newState.log.slice(this.battle.log.length);

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
      const previousActiveId = this.activeHero.id;
      this.battleService.updateBattleState(this.battle, newState);
      const nextActiveId = newState.queue[0];

      if (this.isAutoOneTurn && previousActiveId !== nextActiveId) {
        this.isAutoOneTurn = false;
      }

      if (this.battle.log.find((event: ILogMessage) => event.type === LogMessageType.WIN)) {
        this.battleEnd();
        return resolve(true);
      }

      return resolve(false);
    });
  }

  private renderBattleText(events: ILogMessage[]) {
    this.eventsForRender = events;
    setTimeout(() => {
      this.eventsForRender = [];
    }, 3000);
  }

  private battleEnd() {
    this.isAutoBattle = false;
    this.isAutoOneTurn = false;
    this.isBattleEnd = true;
    this.timerActive = false;
    if (this.setupIndex > -1 && Setups[this.battle.scenario.id][this.setupIndex + 1]) {
      const teamSetup = Setups[this.battle.scenario.id][this.setupIndex + 1].map((setup: string[]) => {
        const heroes = [];
        for (const setupItem of setup) {
          heroes.push({
            hero: setupItem,
            gender: Math.random() > 0.5 ? 'male' : 'female'
          });
        }
        return heroes;
      });
      this.isLoading = true;
      this.battleService.startBattle({ scenarioId: this.battle.scenario.id, teamSetup: teamSetup }).subscribe({
        next: (res: IBattle) => {
          this.isLoading = false;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/battle'], { state: { data: { battle: res, setupIndex: this.setupIndex + 1 } } });
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
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

  getArrowType(): string {
    let char;
    if (this.mapAbilityPositions.length) {
      return 'ally';
    }
    for (let i = 0; i < this.battle.teams.length; i++) {
      for (let j = 0; j < this.battle.teams[i].heroes.length; j++) {
        if (
          this.battle.teams[i].heroes[j].position.x === this.arrowTarget.x &&
          this.battle.teams[i].heroes[j].position.y === this.arrowTarget.y &&
          !this.battle.teams[i].heroes[j].isDead
        ) {
          char = this.battle.teams[i].heroes[j];
          break;
        }
        for (let k = 0; k < this.battle.teams[i].heroes[j].pets.length; k++) {
          if (
            this.battle.teams[i].heroes[j].pets[k].position.x === this.arrowTarget.x &&
            this.battle.teams[i].heroes[j].pets[k].position.y === this.arrowTarget.y
          ) {
            char = this.battle.teams[i].heroes[j].pets[k];
            break;
          }
        }
      }
    }
    if (char) {
      return this.isCharAllyToActive(char.id) ? 'ally' : 'enemy';
    } else {
      return '';
    }
  }

  get arrowSource(): IChar {
    return this.activePet ? this.activePet : this.activeHero;
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

  getMapEffectTiles(mapEffect: IEffect): IPosition[] {
    const tiles: IPosition[] = [];
    for (let x = mapEffect.position.x - mapEffect.range; x <= mapEffect.position.x + mapEffect.range; x++) {
      for (let y = mapEffect.position.y - mapEffect.range; y <= mapEffect.position.y + mapEffect.range; y++) {
        if (
          x >= 0 &&
          x < this.battle.scenario.tiles[0].length &&
          y >= 0 &&
          y < this.battle.scenario.tiles.length &&
          (this.battle.scenario.tiles[y][x].type === TileType.FLOOR ||
            this.battle.scenario.tiles[y][x].type === TileType.ROOM)
        ) {
          tiles.push({ x, y });
        }
      }
    }
    return tiles;
  }

  uniqueMapEffectTile(index: number) {
    return index;
  }

  isCharAllyToActive(charId: string): boolean {
    let activeHeroTeam: ITeam;

    for (let i = 0; i < this.battle.teams.length; i++) {
      if (this.battle.teams[i].heroes.find((h) => h.id === this.activeHero.id)) {
        activeHeroTeam = this.battle.teams[i];
      }
    }

    for (let j = 0; j < activeHeroTeam.heroes.length; j++) {
      if (activeHeroTeam.heroes[j].id === charId) {
        return true;
      }
      for (let k = 0; k < activeHeroTeam.heroes[j].pets.length; k++) {
        if (activeHeroTeam.heroes[j].pets[k].id === charId) {
          return true;
        }
      }
    }
    return false;
  }

  isMoveAvailableTile(x: number, y: number): boolean {
    if (this.petMovePositions || this.canMove(this.activeHero)) {
      const positions = this.movePositions.length ? this.movePositions : this.petMovePositions;
      return !!positions.find((position: IPosition) => {
        return position.x === x && position.y === y;
      });
    } else {
      return false;
    }
  }

  isMapAbilityTile(x: number, y: number): boolean {
    return !!this.mapAbilityPositions.find((position: IPosition) => {
      return position.x === x && position.y === y;
    });
  }

  mapTileClicked(x: number, y: number) {
    if (this.mapAbilityPositions.length) {
      this.castAbility(undefined, { x, y });
    } else {
      this.moveChar(x, y);
    }
  }

  moveChar(x: number, y: number) {
    if (this.isMoveAvailableTile(x, y)) {
      this.isLoading = true;
      this.preparedWeapon = undefined;
      this.preparedAbility = undefined;
      this.preparedPetAbility = undefined;
      this.targets = [];
      this.battleService.moveChar(this.battle.id, { x, y }, this.activePet?.id).subscribe({
        next: (battle: IBattle) => {
          this.isLoading = false;
          this.updateBattleState(battle).then((battleIsEnded: boolean) => {
            this.movePositions = [];
            this.petMovePositions = [];
            this.mapAbilityPositions = [];
            this.activePet = undefined;
            if (!battleIsEnded) {
              setTimeout(() => {
                this.refreshBattle();
              }, 500);
            }
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  movePet(x: number, y: number) {
    if (this.isMoveAvailableTile(x, y)) {
      this.isLoading = true;
      this.preparedWeapon = undefined;
      this.preparedAbility = undefined;
      this.preparedPetAbility = undefined;
      this.targets = [];
      this.battleService.moveChar(this.battle.id, { x, y }).subscribe({
        next: (battle: IBattle) => {
          this.isLoading = false;
          this.updateBattleState(battle).then((battleIsEnded: boolean) => {
            this.movePositions = [];
            this.petMovePositions = [];
            this.mapAbilityPositions = [];
            this.activePet = undefined;
            if (!battleIsEnded) {
              setTimeout(() => {
                this.refreshBattle();
              }, 500);
            }
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  preparePetMove(pet: IPet) {
    if (this.petMovePositions.length && pet.id === this.activePet.id) {
      this.petMovePositions = [];
      this.activePet = undefined;
      this.getMovePoints();
    } else if (!pet.isMoved && !pet.isImmobilized) {
      this.isLoading = true;
      this.preparedWeapon = undefined;
      this.preparedAbility = undefined;
      this.preparedPetAbility = undefined;
      this.targets = [];
      this.battleService.getMovePoints(this.battle.id, pet.id).subscribe({
        next: (positions: IPosition[]) => {
          this.isLoading = false;
          this.mapAbilityPositions = [];
          this.movePositions = [];
          this.petMovePositions = positions;
          this.activePet = pet;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  endTurn() {
    this.isLoading = true;
    this.battleService.endTurn(this.battle.id).subscribe({
      next: (battle: IBattle) => {
        this.isLoading = false;
        this.updateBattleState(battle).then((battleIsEnded: boolean) => {
          if (!battleIsEnded) {
            setTimeout(() => {
              this.refreshBattle();
            }, 500);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  prepareWeapon(weapon: IEquip) {
    this.preparedAbility = undefined;
    this.preparedPetAbility = undefined;
    if (this.preparedWeapon && this.preparedWeapon.id === weapon.id) {
      this.preparedWeapon = undefined;
      this.targets = [];
      this.getMovePoints();
    } else {
      this.isLoading = true;
      this.battleService.findEnemies(this.battle.id, this.activeHero.id, weapon.range, false, '', false).subscribe({
        next: (enemies: string[]) => {
          this.isLoading = false;
          this.preparedWeapon = weapon;
          this.targets = enemies;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
  }

  prepareAbility(ability: IAbility) {
    this.preparedWeapon = undefined;
    this.preparedPetAbility = undefined;
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
        case AbilityTargetType.ALLY_NOT_ME:
          this.battleService
            .findAllies(
              this.battle.id,
              this.activeHero.id,
              ability.range,
              ability.includeInvisible,
              ability.targetType !== AbilityTargetType.ALLY_NOT_ME,
              ability.ignoreRaytrace
            )
            .subscribe({
              next: (allies: string[]) => {
                this.isLoading = false;
                this.preparedAbility = ability;
                this.targets = allies;
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
          break;
        case AbilityTargetType.ALLY_OR_ENEMY:
          this.battleService
            .findHeroes(
              this.battle.id,
              this.activeHero.id,
              ability.range,
              ability.includeInvisible,
              true,
              ability.ignoreRaytrace
            )
            .subscribe({
              next: (heroes: string[]) => {
                this.isLoading = false;
                this.preparedAbility = ability;
                this.targets = heroes;
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
          break;
        case AbilityTargetType.ALLY_OR_ENEMY_NOT_ME:
          this.battleService
            .findHeroes(
              this.battle.id,
              this.activeHero.id,
              ability.range,
              ability.includeInvisible,
              false,
              ability.ignoreRaytrace
            )
            .subscribe({
              next: (heroes: string[]) => {
                this.isLoading = false;
                this.preparedAbility = ability;
                this.targets = heroes;
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
          break;
        case AbilityTargetType.ENEMY:
          this.battleService
            .findEnemies(
              this.battle.id,
              this.activeHero.id,
              ability.range,
              ability.includeInvisible,
              ability.id,
              ability.ignoreRaytrace
            )
            .subscribe({
              next: (enemies: string[]) => {
                this.isLoading = false;
                this.preparedAbility = ability;
                this.targets = enemies;
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
          break;
        case AbilityTargetType.MAP:
        case AbilityTargetType.MOVE:
          this.battleService
            .getMapAbilityPositions(this.battle.id, ability.id, ability.ignoreRaytrace, ability.ignoreObstacles)
            .subscribe({
              next: (positions: IPosition[]) => {
                this.isLoading = false;
                this.movePositions = [];
                this.petMovePositions = [];
                this.mapAbilityPositions = positions;
                this.preparedAbility = ability;
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
          break;
      }
    }
  }

  preparePetAbility(data: { ability: IAbility; pet: IPet }) {
    this.preparedWeapon = undefined;
    this.preparedAbility = undefined;
    this.movePositions = [];
    this.mapAbilityPositions = [];
    this.targets = [];
    this.petMovePositions = [];
    if (this.preparedPetAbility && this.preparedPetAbility.id === data.ability.id) {
      this.preparedPetAbility = undefined;
      this.activePet = undefined;
      this.getMovePoints();
    } else {
      this.isLoading = true;
      switch (data.ability.targetType) {
        default:
          this.battleService
            .findEnemies(
              this.battle.id,
              data.pet.id,
              data.ability.range,
              data.ability.includeInvisible,
              data.ability.id,
              data.ability.ignoreRaytrace
            )
            .subscribe({
              next: (enemies: string[]) => {
                this.isLoading = false;
                this.preparedPetAbility = data.ability;
                this.targets = enemies;
                this.activePet = data.pet;
              },
              error: (err) => {
                this.isLoading = false;
                console.log(err);
              }
            });
          break;
      }
    }
  }

  isTarget(heroId: string): boolean {
    return !!this.targets.find((target: string) => {
      return target === heroId;
    });
  }

  charTileClicked(char: IChar) {
    if (this.isTarget(char.id)) {
      if (this.preparedWeapon) {
        this.isLoading = true;
        this.battleService.useWeapon(this.battle.id, char.id, this.preparedWeapon.id).subscribe({
          next: (battle: IBattle) => {
            this.isLoading = false;
            this.updateBattleState(battle).then((battleIsEnded: boolean) => {
              this.preparedWeapon = undefined;
              this.targets = [];
              this.movePositions = [];
              this.petMovePositions = [];
              this.mapAbilityPositions = [];
              this.activePet = undefined;

              if (!battleIsEnded) {
                setTimeout(() => {
                  this.refreshBattle();
                }, 500);
              }
            });
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          }
        });
      } else if (this.preparedAbility || this.preparedPetAbility) {
        this.castAbility(char.id);
      }
    }
  }

  castAbility(targetId?: string, position?: IPosition) {
    this.isLoading = true;
    this.battleService
      .castAbility(
        this.battle.id,
        this.preparedAbility ? this.preparedAbility.id : this.preparedPetAbility.id,
        targetId,
        position
      )
      .subscribe({
        next: (battle: IBattle) => {
          this.isLoading = false;
          this.updateBattleState(battle).then((battleIsEnded: boolean) => {
            this.preparedAbility = undefined;
            this.preparedPetAbility = undefined;
            this.targets = [];
            this.movePositions = [];
            this.petMovePositions = [];
            this.mapAbilityPositions = [];
            this.activePet = undefined;

            if (!battleIsEnded) {
              setTimeout(() => {
                this.refreshBattle();
              }, 500);
            }
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
  }

  getCharPositionById(charId: string): IPosition {
    const heroes = this.getHeroesfromTeams();
    for (let i = 0; i < heroes.length; i++) {
      if (heroes[i].id === charId) {
        return heroes[i].position;
      }
      for (let j = 0; j < heroes[i].pets.length; j++) {
        if (heroes[i].pets[j].id === charId) {
          return heroes[i].pets[j].position;
        }
      }
    }
    return undefined;
  }

  botAction() {
    this.isLoading = true;
    this.timerActive = true;

    this.botService.botAction(this.battle.id).subscribe({
      next: (battle: IBattle) => {
        this.isLoading = false;
        this.timerActive = false;
        this.updateBattleState(battle).then((battleIsEnded: boolean) => {
          this.preparedWeapon = undefined;
          this.preparedAbility = undefined;
          this.preparedPetAbility = undefined;
          this.targets = [];
          this.movePositions = [];
          this.petMovePositions = [];
          this.mapAbilityPositions = [];
          this.activePet = undefined;

          if (!battleIsEnded) {
            setTimeout(() => {
              this.refreshBattle();
            }, 500);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  toggleAutoBattle() {
    if (this.isAutoBattle) {
      this.isAutoBattle = false;
      this.isAutoOneTurn = false;
    } else {
      this.isAutoBattle = true;
      this.isAutoOneTurn = false;
      this.botAction();
    }
  }

  autoOneTurn() {
    if (!this.isAutoOneTurn) {
      this.isAutoOneTurn = true;
      this.isAutoBattle = false;
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
    this.battleService.getHeroData(hero.id).subscribe({
      next: (heroData: IHeroData) => {
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
              this.battleService.upgradeEquip(this.battle.id, upgradeResult.equipId).subscribe({
                next: (battle: IBattle) => {
                  this.isLoading = false;
                  this.updateBattleState(battle).then((battleIsEnded: boolean) => {
                    this.preparedWeapon = undefined;
                    this.preparedAbility = undefined;
                    this.preparedPetAbility = undefined;
                    this.targets = [];
                    this.movePositions = [];
                    this.petMovePositions = [];
                    this.mapAbilityPositions = [];
                    this.activePet = undefined;

                    if (!battleIsEnded) {
                      setTimeout(() => {
                        this.refreshBattle();
                      }, 500);
                    }
                  });
                },
                error: (err) => {
                  this.isLoading = false;
                  console.log(err);
                }
              });
            } else if (upgradeResult.abilityId) {
              this.isLoading = true;
              this.battleService.learnAbility(this.battle.id, upgradeResult.abilityId).subscribe({
                next: (battle: IBattle) => {
                  this.isLoading = false;
                  this.updateBattleState(battle).then((battleIsEnded: boolean) => {
                    this.preparedWeapon = undefined;
                    this.preparedAbility = undefined;
                    this.preparedPetAbility = undefined;
                    this.targets = [];
                    this.movePositions = [];
                    this.mapAbilityPositions = [];
                    this.activePet = undefined;

                    if (!battleIsEnded) {
                      setTimeout(() => {
                        this.refreshBattle();
                      }, 500);
                    }
                  });
                },
                error: (err) => {
                  this.isLoading = false;
                  console.log(err);
                }
              });
            } else if (upgradeResult.auto) {
              if (upgradeResult.auto.isAutoBattle) {
                this.isAutoBattle = true;
              } else {
                this.isAutoOneTurn = true;
              }
              this.botAction();
            }
          });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
