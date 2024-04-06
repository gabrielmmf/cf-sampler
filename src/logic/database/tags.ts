import { problems } from ".";

const allTags: string[] = [];

for (const prob of problems) {
    for (const tag of prob.tags) {
        if (!allTags.includes(tag)) {
            allTags.push(tag);
        }
    }
}

export { allTags }