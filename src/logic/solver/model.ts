import { Constraint, Problem } from "../types";

import { problems } from "../database";

type LibConstraint = {
    equal?: number;
    min?: number;
    max?: number;
};

const availableTags: string[] = [];

let constraintsMap = new Map<string, LibConstraint>();

export function generateModel(constraints: Constraint[], n: number) {
    shuffleArray(problems);

    constraintsMap = new Map<string, LibConstraint>();

    for (const c of constraints) {
        if (availableTags.includes(c.tag)) continue;
        availableTags.push(c.tag);
    }

    buildTagConstraints(constraints);
    buildSumConstraint(n);

    return {
        "constraints": constraintsMap,
        "variables": {
            ...buildProblemVariables()
        },
        "integers": true,
        "binaries": problems.map(p => p.id)
    }
}

function shuffleArray(arr: Problem[]) {
    for (let i = arr.length; i >= 1; i = i / 2) {
        arr.sort(() => Math.random() - 0.5);
    }
}

function buildProblemVariables() {

    const problemVars: { [id: string]: { [tag: string]: number } } = {}
    for (const prob of problems) {
        problemVars[prob.id] = {};
        problemVars[prob.id]["total_sum"] = 1;
        for (const tag of prob.tags) {
            if (!availableTags.includes(tag)) continue;
            problemVars[prob.id][tag] = 1;
        }
    }
    return problemVars;
}

function buildSumConstraint(n: number) {
    constraintsMap.set("total_sum", { "equal": n });
}

function buildTagConstraints(constraints: Constraint[]) {
    for (const constraint of constraints) {

        const value = constraintsMap.get(constraint.tag);

        if (constraint.signal === "<=") {
            const newVal = (value || {});
            newVal.max = constraint.number;
            constraintsMap.set(constraint.tag, newVal);
        }
        if (constraint.signal === "=") {
            const newVal = (value || {});
            newVal.equal = constraint.number;
            constraintsMap.set(constraint.tag, newVal);
        }
        if (constraint.signal === ">=") {
            const newVal = (value || {});
            newVal.min = constraint.number;
            constraintsMap.set(constraint.tag, newVal);
        }
    }
}