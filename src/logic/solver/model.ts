import { Constraint, Problem } from "../types";

import { problems } from "../database";

const availableTags: string[] = [];


export function generateModel(constraints: Constraint[], n: number) {
    shuffleArray(problems);

    for (const c of constraints) {
        if (availableTags.includes(c.tag)) continue;
        availableTags.push(c.tag);
    }

    console.log(problems[0]);
    return {
        "constraints": {
            ...buildSumConstraint(n),
            ...buildTagConstraints(constraints)
        },
        "variables": {
            ...buildProblemVariables()
        },
        "integers": true,
        "binaries": problems.map(p => p.name)
    }
}

function shuffleArray(arr: Problem[]) {
    for (let i = arr.length; i >= 1; i = i / 2) {
        arr.sort(() => Math.random() - 0.5);
    }
}

function buildProblemVariables() {

    const problemVars: { [name: string]: { [tag: string]: number } } = {}
    for (const prob of problems) {
        problemVars[prob.name] = {};
        problemVars[prob.name]["total_sum"] = 1;
        for (const tag of prob.tags) {
            if (!availableTags.includes(tag)) continue;
            problemVars[prob.name][tag] = 1;
        }
    }
    return problemVars;
}

function buildSumConstraint(n: number) {
    return { "total_sum": { "equal": n } };
}

function buildTagConstraints(constraints: Constraint[]) {
    const constraintObjects: { [tag: string]: { [signal: string]: number } } = {};

    for (const constraint of constraints) {
        const signalTranslateMap = {
            "<=": "max",
            "=": "equal",
            ">=": "min"
        }
        constraintObjects[constraint.tag] = {};
        constraintObjects[constraint.tag][signalTranslateMap[constraint.signal]] = constraint.number;
    }

    return constraintObjects;
}