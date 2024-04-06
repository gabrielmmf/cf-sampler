import response from '../database/cf_response.json'
import { Problem } from '../types';

const problems: Problem[] = response.result.problems.map((p, index) => {
    return {
        name: p.name,
        rating: p.rating,
        tags: p.tags,
        id: index.toString()
    }
});

export { problems };

