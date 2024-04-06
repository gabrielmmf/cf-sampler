export type Constraint = {
    tag: string;
    signal: '<=' | '=' | '>=';
    number: number;
}


export type Problem = {
    name: string;
    tags: string[];
}