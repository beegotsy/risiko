export type Outcome = 'win' | 'loss' | 'tie';

export class BattleResult {
    attackers: number;
    defenders: number;
    attackersRolls?: number[];
    defendersRolls?: number[];
    outcome: boolean[];

    constructor(a: number, d: number, o: boolean[], ar?: number[], dr?: number[]) {
        this.attackers = a;
        this.defenders = d;
        this.attackersRolls =  ar;
        this.defendersRolls =  dr;
        this.outcome = o;
    }
}

export class WarResult {
    initialAttackers: number;
    initialDefenders: number;
    finalAttackers: number;
    finalDefenders: number;
    outcome: Outcome;

    constructor(iA: number, iD: number, fA: number, fD: number, o: Outcome) {
        this.initialAttackers = iA;
        this.initialDefenders = iD;
        this.finalAttackers =  fA;
        this.finalDefenders =  fD;
        this.outcome = o;
    }
}
