import { Badge } from "./ui/badge";

type TagsContainerProps = {
    tags: string[];
}

export function TagsContainer({ tags }: TagsContainerProps) {

    return (
        <div className="grid justify-center gap-2">
            {tags?.map((tag, index) => {
                return <Badge key={index}>{tag}</Badge>
            })}
        </div>
    )
}