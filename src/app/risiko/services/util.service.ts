import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() {}

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  sortDiceRolls(rolls: number[]): number[] {
    return rolls.sort((a, b) => {
      if (a > b) {
        return -1;
      }
      if (a === b) {
        return 0;
      }
      return 1;
    });
  }

  iterator(toIterate: Function, args: any[]): any[] {
    console.group('️️♻️ Iterator');
    const results: any[] = [];
    console.time('♻️ Iterator');
    for (let i = 0; i < 1 * 100000; i++) {
      results[i] = toIterate(...args);
    }
    console.timeEnd('♻️ Iterator');
    console.groupEnd();
    return results;
  }

  logger(toLog: Function): any {
    console.group('️️✍️ Logger');
    const result = toLog();
    console.log(result);
    console.groupEnd();
    return result;
  }

  funcionFactory(fn: Function, args: any[]): Function {
    return () => {
      fn(...args);
    };
  }

  calculateAverage(numbers: number[]): number {
    const length = numbers.length;
    return numbers.reduce((tot, x) => tot + x, 0) / length;
  }
}
