import { problems } from '../database';
import { Constraint } from '../types';
import { generateModel } from './model';

import { solve } from "yalps"

export function generateSample(constraints: Constraint[], n: number) {

    const model = generateModel(constraints, n);

    const solution = solve(model);

    return problems.filter(prob => {
        return solution.variables.some(v => v[0] === prob.id)
    });
}