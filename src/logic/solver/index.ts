import response from '../database/cf_response.json'
import { Constraint, Problem } from '../types';

const problems: Problem[] = response.result.problems.map(p => {
    return {
        name: p.name,
        rating: p.rating,
        tags: p.tags
    }
});

export function generateSample(constraints: Constraint[], n: number) {

    const shuffledProblems = shuffleArray(problems);


    return shuffledProblems.slice(0, n);
}


function shuffleArray(arr: Problem[]) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
}