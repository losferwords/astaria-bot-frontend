export class Const {
    public static supportedLanguages = ['ru'];
    public static connectionUrl = 'http://localhost:3000/';

    public static httpHeaderContentType = 'Content-Type';
    public static httpHeaderContentTypeVal = 'application/json';
    public static httpHeaderAccept = 'Accept';
    public static httpHeaderAcceptVal = 'application/json';

    public static apiStartBattle = 'start-battle';
    public static apiScenarioTeamSize = 'scenario-team-size';
    public static apiMovePoints = 'move-points';
    public static apiMoveHero = 'move-hero';
    public static apiEndTurn = 'end-turn';
    public static apiFindEnemies = 'find-enemies';
    public static apiUseWeapon = 'use-weapon';

    public static availableHeroes = ['paragon', 'highlander', 'druid', 'oracle'];
}
