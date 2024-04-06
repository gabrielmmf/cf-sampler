import response from '../database/cf_response.json'

const problems = response.result.problems;

export function fetchAllTags(): string[] {

    const allTags: string[] = [];
    for (const prob of problems) {

        for (const tag of prob.tags) {
            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        }

    }

    console.log(allTags);
    return allTags;
}