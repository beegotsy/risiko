import { Injectable } from '@angular/core';
import { BattleResult, Outcome, WarResult } from '../models/war.model';
import { UtilService } from './util.service';

@Injectable()
export class WarService {
  constructor(private utilService: UtilService) {}

  battle(att: number, def: number): BattleResult {
    // if (att < 2 && att < def) { return new BattleResult(att,def,[false]); }

    let attRolls: number[] = [];
    let defRolls: number[] = [];
    const outcomes: boolean[] = [];
    for (let i = 0; i < att; i++) {
      attRolls[i] = this.utilService.rollDice();
    }
    for (let i = 0; i < def; i++) {
      defRolls[i] = this.utilService.rollDice();
    }
    attRolls = this.utilService.sortDiceRolls(attRolls);
    defRolls = this.utilService.sortDiceRolls(defRolls);

    for (let i = 0; i < Math.min(attRolls.length, defRolls.length); i++) {
      outcomes[i] = attRolls[i] > defRolls[i];
    }

    return new BattleResult(att, def, outcomes, attRolls, defRolls);
  }

  war(att: number, def: number): WarResult {
    let avaibleAtt: number;
    let avaibleDef: number;
    let finalAttackers: number = att;
    let finalDefenders: number = def;
    let battleResult: BattleResult;
    let battleWins: number;

    while (
      finalAttackers > 1 &&
      finalDefenders > 0
      /* && finalAttackers > finalDefenders */
    ) {
      avaibleAtt = Math.min(finalAttackers - 1, 3);
      avaibleDef = Math.min(finalDefenders, 3);
      battleResult = this.battle(avaibleAtt, avaibleDef);
      battleWins = battleResult.outcome.filter(x => x).length;
      finalAttackers =
        finalAttackers - (battleResult.outcome.length - battleWins);
      finalDefenders = finalDefenders - battleWins;
    }

    const outcome: Outcome = finalDefenders < 1 ? 'win' : 'loss';

    return new WarResult(att, def, finalAttackers, finalDefenders, outcome);
  }

  bigWar(att: number, def: number, iterations = 1e5): WarResult[] {
    console.group('️️♻️ Iterator');
    const results: WarResult[] = [];
    console.time('♻️ Iterator');
    for (let i = 0; i < 1 * iterations; i++) {
      results[i] = this.war(att, def);
    }
    console.timeEnd('♻️ Iterator');
    console.groupEnd();
    return results;
  }

  calculateWins(
    warResults: WarResult[]
  ): {
    wins: { fixed: number; percentage: number };
    losses: { fixed: number; percentage: number };
  } {
    const length = warResults.length;
    const wins = warResults.filter(wr => wr.outcome === 'win').length;
    const losses = warResults.filter(wr => wr.outcome === 'loss').length;
    return {
      wins: { fixed: wins, percentage: (wins / length) * 100 },
      losses: { fixed: losses, percentage: (losses / length) * 100 }
    };
  }

  calculateRemainAttackers(
    warResults: WarResult[],
    onlyWins = false
  ): { fixed: number; percentage: number }[] {
    const remainAttackers: number[] = [];
    const filteredResults = onlyWins
      ? warResults.filter(x => x.outcome === 'win')
      : warResults;
    const length = filteredResults.length;
    filteredResults
      .map(x => x.finalAttackers)
      .forEach(x => {
        remainAttackers[x] = remainAttackers[x] || 0;
        remainAttackers[x]++;
      });
    return remainAttackers.map(x => ({
      fixed: x,
      percentage: (x / length) * 100
    }));
  }

  calculateRemainDefenders(
    warResults: WarResult[],
    onlyLosses = false
  ): { fixed: number; percentage: number }[] {
    const remainDefenders: number[] = [];
    const filteredResults = onlyLosses
      ? warResults.filter(x => x.outcome === 'loss')
      : warResults;
    const length = filteredResults.length;
    filteredResults
      .map(x => x.finalDefenders)
      .forEach(x => {
        remainDefenders[x] = remainDefenders[x] || 0;
        remainDefenders[x]++;
      });
    return remainDefenders.map(x => ({
      fixed: x,
      percentage: (x / length) * 100
    }));
  }
}
