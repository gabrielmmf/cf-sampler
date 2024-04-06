import response from '../database/cf_response.json'
import { Problem } from '../types';
import { v4 as uuidv4 } from 'uuid';



const problems: Problem[] = response.result.problems.map(p => {
    return {
        name: p.name,
        rating: p.rating,
        tags: p.tags,
        id: uuidv4()
    }
});

export { problems };

