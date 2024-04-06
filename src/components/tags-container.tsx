import { Badge } from "./ui/badge";

type TagsContainerProps = {
    tags: string[];
}

export function TagsContainer({ tags }: TagsContainerProps) {

    return (
        <div className="flex items-center justify-center gap-2 overflow-x-scroll">
            {tags?.map((tag, index) => {
                return <Badge key={index}>{tag}</Badge>
            })}
        </div>
    )
}