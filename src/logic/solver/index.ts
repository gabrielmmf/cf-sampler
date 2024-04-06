import { problems } from '../database';
import { Constraint } from '../types';
import { generateModel } from './model';

import { solve } from "yalps"

export function generateSample(constraints: Constraint[], n: number) {

    const model = generateModel(constraints, n);

    const solution = solve(model);

    const sample = solution.variables.map(v => {
        return problems.find(p => p.name === v[0]);
    });

    console.log(sample);
}