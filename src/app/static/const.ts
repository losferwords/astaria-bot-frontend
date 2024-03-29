import { environment } from 'src/environments/environment';

export class Const {
  public static supportedLanguages = ['ru'];
  public static connectionUrl = environment.connectionUrl;

  public static httpHeaderContentType = 'Content-Type';
  public static httpHeaderContentTypeVal = 'application/json';
  public static httpHeaderAccept = 'Accept';
  public static httpHeaderAcceptVal = 'application/json';

  public static apiScenarios = 'scenarios';
  public static apiStartBattle = 'start-battle';
  public static apiScenarioTeamSize = 'scenario-team-size';
  public static apiHeroData = 'hero-data';
  public static apiMovePoints = 'move-points';
  public static apiMoveChar = 'move-char';
  public static apiEndTurn = 'end-turn';
  public static apiFindEnemies = 'find-enemies';
  public static apiFindAllies = 'find-allies';
  public static apiFindHeroes = 'find-heroes';
  public static apiMapAbilityPositions = 'map-ability-positions';
  public static apiUseWeapon = 'use-weapon';
  public static apiCastAbility = 'cast-ability';
  public static apiUpgradeEquip = 'upgrade-equip';
  public static apiLearnAbility = 'learn-ability';
  public static apiBotAction = 'bot-action';

  public static availableHeroes = [
    'paragon',
    'highlander',
    'druid',
    'oracle',
    'avatar',
    'shadow',
    'lightbringer',
    'avenger',
    'navarch'
  ];
  public static botThinkTime = 120000;
  public static maxLogLength = 50;
  public static botActionThrottleTime = 700;
  public static battleTextFlyTime = 1400;
}
