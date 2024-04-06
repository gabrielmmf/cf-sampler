export type Constraint = {
    tag: string;
    signal: '<=' | '=' | '>=';
    number: number;
}


export type Problem = {
    name: string;
    rating: number | undefined;
    tags: string[];
    id: string;
}