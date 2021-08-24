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
    'avenger'
  ];
  public static botThinkTime = 30000;

  public static setups = {
    '0': [
      [
        ['paragon', 'highlander'],
        ['druid', 'oracle']
      ],
      [
        ['paragon', 'highlander'],
        ['druid', 'avatar']
      ],
      [
        ['paragon', 'highlander'],
        ['druid', 'shadow']
      ],
      [
        ['paragon', 'highlander'],
        ['druid', 'lightbringer']
      ],
      [
        ['paragon', 'highlander'],
        ['druid', 'avenger']
      ],
      [
        ['paragon', 'highlander'],
        ['oracle', 'avatar']
      ],
      [
        ['paragon', 'highlander'],
        ['oracle', 'shadow']
      ],
      [
        ['paragon', 'highlander'],
        ['oracle', 'lightbringer']
      ],
      [
        ['paragon', 'highlander'],
        ['oracle', 'avenger']
      ],
      [
        ['paragon', 'highlander'],
        ['avatar', 'shadow']
      ],
      [
        ['paragon', 'highlander'],
        ['avatar', 'lightbringer']
      ],
      [
        ['paragon', 'highlander'],
        ['avatar', 'avenger']
      ],
      [
        ['paragon', 'highlander'],
        ['shadow', 'lightbringer']
      ],
      [
        ['paragon', 'highlander'],
        ['shadow', 'avenger']
      ],
      [
        ['paragon', 'highlander'],
        ['lightbringer', 'avenger']
      ],
      [
        ['paragon', 'druid'],
        ['highlander', 'oracle']
      ],
      [
        ['paragon', 'druid'],
        ['highlander', 'avatar']
      ],
      [
        ['paragon', 'druid'],
        ['highlander', 'shadow']
      ],
      [
        ['paragon', 'druid'],
        ['highlander', 'lightbringer']
      ],
      [
        ['paragon', 'druid'],
        ['highlander', 'avenger']
      ],
      [
        ['paragon', 'druid'],
        ['oracle', 'avatar']
      ],
      [
        ['paragon', 'druid'],
        ['oracle', 'shadow']
      ],
      [
        ['paragon', 'druid'],
        ['oracle', 'lightbringer']
      ],
      [
        ['paragon', 'druid'],
        ['oracle', 'avenger']
      ],
      [
        ['paragon', 'druid'],
        ['avatar', 'shadow']
      ],
      [
        ['paragon', 'druid'],
        ['avatar', 'lightbringer']
      ],
      [
        ['paragon', 'druid'],
        ['avatar', 'avenger']
      ],
      [
        ['paragon', 'druid'],
        ['shadow', 'lightbringer']
      ],
      [
        ['paragon', 'druid'],
        ['shadow', 'avenger']
      ],
      [
        ['paragon', 'druid'],
        ['lightbringer', 'avenger']
      ],
      [
        ['paragon', 'oracle'],
        ['highlander', 'druid']
      ],
      [
        ['paragon', 'oracle'],
        ['highlander', 'avatar']
      ],
      [
        ['paragon', 'oracle'],
        ['highlander', 'shadow']
      ],
      [
        ['paragon', 'oracle'],
        ['highlander', 'lightbringer']
      ],
      [
        ['paragon', 'oracle'],
        ['highlander', 'avenger']
      ],
      [
        ['paragon', 'oracle'],
        ['druid', 'avatar']
      ],
      [
        ['paragon', 'oracle'],
        ['druid', 'shadow']
      ],
      [
        ['paragon', 'oracle'],
        ['druid', 'lightbringer']
      ],
      [
        ['paragon', 'oracle'],
        ['druid', 'avenger']
      ],
      [
        ['paragon', 'oracle'],
        ['avatar', 'shadow']
      ],
      [
        ['paragon', 'oracle'],
        ['avatar', 'lightbringer']
      ],
      [
        ['paragon', 'oracle'],
        ['avatar', 'avenger']
      ],
      [
        ['paragon', 'oracle'],
        ['shadow', 'lightbringer']
      ],
      [
        ['paragon', 'oracle'],
        ['shadow', 'avenger']
      ],
      [
        ['paragon', 'oracle'],
        ['lightbringer', 'avenger']
      ],
      [
        ['paragon', 'avatar'],
        ['highlander', 'druid']
      ],
      [
        ['paragon', 'avatar'],
        ['highlander', 'oracle']
      ],
      [
        ['paragon', 'avatar'],
        ['highlander', 'shadow']
      ],
      [
        ['paragon', 'avatar'],
        ['highlander', 'lightbringer']
      ],
      [
        ['paragon', 'avatar'],
        ['highlander', 'avenger']
      ],
      [
        ['paragon', 'avatar'],
        ['druid', 'oracle']
      ],
      [
        ['paragon', 'avatar'],
        ['druid', 'shadow']
      ],
      [
        ['paragon', 'avatar'],
        ['druid', 'lightbringer']
      ],
      [
        ['paragon', 'avatar'],
        ['druid', 'avenger']
      ],
      [
        ['paragon', 'avatar'],
        ['oracle', 'shadow']
      ],
      [
        ['paragon', 'avatar'],
        ['oracle', 'lightbringer']
      ],
      [
        ['paragon', 'avatar'],
        ['oracle', 'avenger']
      ],
      [
        ['paragon', 'avatar'],
        ['shadow', 'lightbringer']
      ],
      [
        ['paragon', 'avatar'],
        ['shadow', 'avenger']
      ],
      [
        ['paragon', 'avatar'],
        ['lightbringer', 'avenger']
      ],
      [
        ['paragon', 'shadow'],
        ['highlander', 'druid']
      ],
      [
        ['paragon', 'shadow'],
        ['highlander', 'oracle']
      ],
      [
        ['paragon', 'shadow'],
        ['highlander', 'avatar']
      ],
      [
        ['paragon', 'shadow'],
        ['highlander', 'lightbringer']
      ],
      [
        ['paragon', 'shadow'],
        ['highlander', 'avenger']
      ],
      [
        ['paragon', 'shadow'],
        ['druid', 'oracle']
      ],
      [
        ['paragon', 'shadow'],
        ['druid', 'avatar']
      ],
      [
        ['paragon', 'shadow'],
        ['druid', 'lightbringer']
      ],
      [
        ['paragon', 'shadow'],
        ['druid', 'avenger']
      ],
      [
        ['paragon', 'shadow'],
        ['oracle', 'avatar']
      ],
      [
        ['paragon', 'shadow'],
        ['oracle', 'lightbringer']
      ],
      [
        ['paragon', 'shadow'],
        ['oracle', 'avenger']
      ],
      [
        ['paragon', 'shadow'],
        ['avatar', 'lightbringer']
      ],
      [
        ['paragon', 'shadow'],
        ['avatar', 'avenger']
      ],
      [
        ['paragon', 'shadow'],
        ['lightbringer', 'avenger']
      ],
      [
        ['paragon', 'lightbringer'],
        ['highlander', 'druid']
      ],
      [
        ['paragon', 'lightbringer'],
        ['highlander', 'oracle']
      ],
      [
        ['paragon', 'lightbringer'],
        ['highlander', 'avatar']
      ],
      [
        ['paragon', 'lightbringer'],
        ['highlander', 'shadow']
      ],
      [
        ['paragon', 'lightbringer'],
        ['highlander', 'avenger']
      ],
      [
        ['paragon', 'lightbringer'],
        ['druid', 'oracle']
      ],
      [
        ['paragon', 'lightbringer'],
        ['druid', 'avatar']
      ],
      [
        ['paragon', 'lightbringer'],
        ['druid', 'shadow']
      ],
      [
        ['paragon', 'lightbringer'],
        ['druid', 'avenger']
      ],
      [
        ['paragon', 'lightbringer'],
        ['oracle', 'avatar']
      ],
      [
        ['paragon', 'lightbringer'],
        ['oracle', 'shadow']
      ],
      [
        ['paragon', 'lightbringer'],
        ['oracle', 'avenger']
      ],
      [
        ['paragon', 'lightbringer'],
        ['avatar', 'shadow']
      ],
      [
        ['paragon', 'lightbringer'],
        ['avatar', 'avenger']
      ],
      [
        ['paragon', 'lightbringer'],
        ['shadow', 'avenger']
      ],
      [
        ['paragon', 'avenger'],
        ['highlander', 'druid']
      ],
      [
        ['paragon', 'avenger'],
        ['highlander', 'oracle']
      ],
      [
        ['paragon', 'avenger'],
        ['highlander', 'avatar']
      ],
      [
        ['paragon', 'avenger'],
        ['highlander', 'shadow']
      ],
      [
        ['paragon', 'avenger'],
        ['highlander', 'lightbringer']
      ],
      [
        ['paragon', 'avenger'],
        ['druid', 'oracle']
      ],
      [
        ['paragon', 'avenger'],
        ['druid', 'avatar']
      ],
      [
        ['paragon', 'avenger'],
        ['druid', 'shadow']
      ],
      [
        ['paragon', 'avenger'],
        ['druid', 'lightbringer']
      ],
      [
        ['paragon', 'avenger'],
        ['oracle', 'avatar']
      ],
      [
        ['paragon', 'avenger'],
        ['oracle', 'shadow']
      ],
      [
        ['paragon', 'avenger'],
        ['oracle', 'lightbringer']
      ],
      [
        ['paragon', 'avenger'],
        ['avatar', 'shadow']
      ],
      [
        ['paragon', 'avenger'],
        ['avatar', 'lightbringer']
      ],
      [
        ['paragon', 'avenger'],
        ['shadow', 'lightbringer']
      ],
      [
        ['highlander', 'druid'],
        ['oracle', 'avatar']
      ],
      [
        ['highlander', 'druid'],
        ['oracle', 'shadow']
      ],
      [
        ['highlander', 'druid'],
        ['oracle', 'lightbringer']
      ],
      [
        ['highlander', 'druid'],
        ['oracle', 'avenger']
      ],
      [
        ['highlander', 'druid'],
        ['avatar', 'shadow']
      ],
      [
        ['highlander', 'druid'],
        ['avatar', 'lightbringer']
      ],
      [
        ['highlander', 'druid'],
        ['avatar', 'avenger']
      ],
      [
        ['highlander', 'druid'],
        ['shadow', 'lightbringer']
      ],
      [
        ['highlander', 'druid'],
        ['shadow', 'avenger']
      ],
      [
        ['highlander', 'druid'],
        ['lightbringer', 'avenger']
      ],
      [
        ['highlander', 'oracle'],
        ['druid', 'avatar']
      ],
      [
        ['highlander', 'oracle'],
        ['druid', 'shadow']
      ],
      [
        ['highlander', 'oracle'],
        ['druid', 'lightbringer']
      ],
      [
        ['highlander', 'oracle'],
        ['druid', 'avenger']
      ],
      [
        ['highlander', 'oracle'],
        ['avatar', 'shadow']
      ],
      [
        ['highlander', 'oracle'],
        ['avatar', 'lightbringer']
      ],
      [
        ['highlander', 'oracle'],
        ['avatar', 'avenger']
      ],
      [
        ['highlander', 'oracle'],
        ['shadow', 'lightbringer']
      ],
      [
        ['highlander', 'oracle'],
        ['shadow', 'avenger']
      ],
      [
        ['highlander', 'oracle'],
        ['lightbringer', 'avenger']
      ],
      [
        ['highlander', 'avatar'],
        ['druid', 'oracle']
      ],
      [
        ['highlander', 'avatar'],
        ['druid', 'shadow']
      ],
      [
        ['highlander', 'avatar'],
        ['druid', 'lightbringer']
      ],
      [
        ['highlander', 'avatar'],
        ['druid', 'avenger']
      ],
      [
        ['highlander', 'avatar'],
        ['oracle', 'shadow']
      ],
      [
        ['highlander', 'avatar'],
        ['oracle', 'lightbringer']
      ],
      [
        ['highlander', 'avatar'],
        ['oracle', 'avenger']
      ],
      [
        ['highlander', 'avatar'],
        ['shadow', 'lightbringer']
      ],
      [
        ['highlander', 'avatar'],
        ['shadow', 'avenger']
      ],
      [
        ['highlander', 'avatar'],
        ['lightbringer', 'avenger']
      ],
      [
        ['highlander', 'shadow'],
        ['druid', 'oracle']
      ],
      [
        ['highlander', 'shadow'],
        ['druid', 'avatar']
      ],
      [
        ['highlander', 'shadow'],
        ['druid', 'lightbringer']
      ],
      [
        ['highlander', 'shadow'],
        ['druid', 'avenger']
      ],
      [
        ['highlander', 'shadow'],
        ['oracle', 'avatar']
      ],
      [
        ['highlander', 'shadow'],
        ['oracle', 'lightbringer']
      ],
      [
        ['highlander', 'shadow'],
        ['oracle', 'avenger']
      ],
      [
        ['highlander', 'shadow'],
        ['avatar', 'lightbringer']
      ],
      [
        ['highlander', 'shadow'],
        ['avatar', 'avenger']
      ],
      [
        ['highlander', 'shadow'],
        ['lightbringer', 'avenger']
      ],
      [
        ['highlander', 'lightbringer'],
        ['druid', 'oracle']
      ],
      [
        ['highlander', 'lightbringer'],
        ['druid', 'avatar']
      ],
      [
        ['highlander', 'lightbringer'],
        ['druid', 'shadow']
      ],
      [
        ['highlander', 'lightbringer'],
        ['druid', 'avenger']
      ],
      [
        ['highlander', 'lightbringer'],
        ['oracle', 'avatar']
      ],
      [
        ['highlander', 'lightbringer'],
        ['oracle', 'shadow']
      ],
      [
        ['highlander', 'lightbringer'],
        ['oracle', 'avenger']
      ],
      [
        ['highlander', 'lightbringer'],
        ['avatar', 'shadow']
      ],
      [
        ['highlander', 'lightbringer'],
        ['avatar', 'avenger']
      ],
      [
        ['highlander', 'lightbringer'],
        ['shadow', 'avenger']
      ],
      [
        ['highlander', 'avenger'],
        ['druid', 'oracle']
      ],
      [
        ['highlander', 'avenger'],
        ['druid', 'avatar']
      ],
      [
        ['highlander', 'avenger'],
        ['druid', 'shadow']
      ],
      [
        ['highlander', 'avenger'],
        ['druid', 'lightbringer']
      ],
      [
        ['highlander', 'avenger'],
        ['oracle', 'avatar']
      ],
      [
        ['highlander', 'avenger'],
        ['oracle', 'shadow']
      ],
      [
        ['highlander', 'avenger'],
        ['oracle', 'lightbringer']
      ],
      [
        ['highlander', 'avenger'],
        ['avatar', 'shadow']
      ],
      [
        ['highlander', 'avenger'],
        ['avatar', 'lightbringer']
      ],
      [
        ['highlander', 'avenger'],
        ['shadow', 'lightbringer']
      ],
      [
        ['druid', 'oracle'],
        ['avatar', 'shadow']
      ],
      [
        ['druid', 'oracle'],
        ['avatar', 'lightbringer']
      ],
      [
        ['druid', 'oracle'],
        ['avatar', 'avenger']
      ],
      [
        ['druid', 'oracle'],
        ['shadow', 'lightbringer']
      ],
      [
        ['druid', 'oracle'],
        ['shadow', 'avenger']
      ],
      [
        ['druid', 'oracle'],
        ['lightbringer', 'avenger']
      ],
      [
        ['druid', 'avatar'],
        ['oracle', 'shadow']
      ],
      [
        ['druid', 'avatar'],
        ['oracle', 'lightbringer']
      ],
      [
        ['druid', 'avatar'],
        ['oracle', 'avenger']
      ],
      [
        ['druid', 'avatar'],
        ['shadow', 'lightbringer']
      ],
      [
        ['druid', 'avatar'],
        ['shadow', 'avenger']
      ],
      [
        ['druid', 'avatar'],
        ['lightbringer', 'avenger']
      ],
      [
        ['druid', 'shadow'],
        ['oracle', 'avatar']
      ],
      [
        ['druid', 'shadow'],
        ['oracle', 'lightbringer']
      ],
      [
        ['druid', 'shadow'],
        ['oracle', 'avenger']
      ],
      [
        ['druid', 'shadow'],
        ['avatar', 'lightbringer']
      ],
      [
        ['druid', 'shadow'],
        ['avatar', 'avenger']
      ],
      [
        ['druid', 'shadow'],
        ['lightbringer', 'avenger']
      ],
      [
        ['druid', 'lightbringer'],
        ['oracle', 'avatar']
      ],
      [
        ['druid', 'lightbringer'],
        ['oracle', 'shadow']
      ],
      [
        ['druid', 'lightbringer'],
        ['oracle', 'avenger']
      ],
      [
        ['druid', 'lightbringer'],
        ['avatar', 'shadow']
      ],
      [
        ['druid', 'lightbringer'],
        ['avatar', 'avenger']
      ],
      [
        ['druid', 'lightbringer'],
        ['shadow', 'avenger']
      ],
      [
        ['druid', 'avenger'],
        ['oracle', 'avatar']
      ],
      [
        ['druid', 'avenger'],
        ['oracle', 'shadow']
      ],
      [
        ['druid', 'avenger'],
        ['oracle', 'lightbringer']
      ],
      [
        ['druid', 'avenger'],
        ['avatar', 'shadow']
      ],
      [
        ['druid', 'avenger'],
        ['avatar', 'lightbringer']
      ],
      [
        ['druid', 'avenger'],
        ['shadow', 'lightbringer']
      ],
      [
        ['oracle', 'avatar'],
        ['shadow', 'lightbringer']
      ],
      [
        ['oracle', 'avatar'],
        ['shadow', 'avenger']
      ],
      [
        ['oracle', 'avatar'],
        ['lightbringer', 'avenger']
      ],
      [
        ['oracle', 'shadow'],
        ['avatar', 'lightbringer']
      ],
      [
        ['oracle', 'shadow'],
        ['avatar', 'avenger']
      ],
      [
        ['oracle', 'shadow'],
        ['lightbringer', 'avenger']
      ],
      [
        ['oracle', 'lightbringer'],
        ['avatar', 'shadow']
      ],
      [
        ['oracle', 'lightbringer'],
        ['avatar', 'avenger']
      ],
      [
        ['oracle', 'lightbringer'],
        ['shadow', 'avenger']
      ],
      [
        ['oracle', 'avenger'],
        ['avatar', 'shadow']
      ],
      [
        ['oracle', 'avenger'],
        ['avatar', 'lightbringer']
      ],
      [
        ['oracle', 'avenger'],
        ['shadow', 'lightbringer']
      ],
      [
        ['avatar', 'shadow'],
        ['lightbringer', 'avenger']
      ],
      [
        ['avatar', 'lightbringer'],
        ['shadow', 'avenger']
      ],
      [
        ['avatar', 'avenger'],
        ['shadow', 'lightbringer']
      ]
    ],
    '1': [
      [
        ['paragon', 'highlander', 'druid'],
        ['oracle', 'avatar', 'shadow']
      ],
      [
        ['paragon', 'highlander', 'druid'],
        ['oracle', 'avatar', 'lightbringer']
      ],
      [
        ['paragon', 'highlander', 'druid'],
        ['oracle', 'avatar', 'avenger']
      ]
    ]
  };
}
