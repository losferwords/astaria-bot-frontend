export class Const {
  public static supportedLanguages = ['ru'];
  public static connectionUrl = 'http://localhost:3000/';

  public static httpHeaderContentType = 'Content-Type';
  public static httpHeaderContentTypeVal = 'application/json';
  public static httpHeaderAccept = 'Accept';
  public static httpHeaderAcceptVal = 'application/json';

  public static apiScenarios = 'scenarios';
  public static apiStartBattle = 'start-battle';
  public static apiScenarioTeamSize = 'scenario-team-size';
  public static apiHeroData = 'hero-data';
  public static apiMovePoints = 'move-points';
  public static apiMoveHero = 'move-hero';
  public static apiEndTurn = 'end-turn';
  public static apiFindEnemies = 'find-enemies';
  public static apiFindAllies = 'find-allies';
  public static apiFindHeroes = 'find-heroes';
  public static apiUseWeapon = 'use-weapon';
  public static apiCastAbility = 'cast-ability';  
  public static apiUpgradeEquip = 'upgrade-equip';  
  public static apiLearnAbility = 'learn-ability';
  public static apiBotAction = 'bot-action';

  public static availableHeroes = ['paragon', 'highlander', 'druid', 'oracle'];
  public static botThinkTime = 300000;
}
