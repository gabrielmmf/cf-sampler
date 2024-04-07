import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { allTags } from "@/logic/database/tags"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type TagSelectorProps = {
    onSelectTag: (selectedValue: string) => void;
}


const tags = allTags;

function TagSelector({ onSelectTag }: TagSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? tags.find((tag) => tag === value)
                        : "Selecionar tag..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search tag..." />
                    <CommandEmpty>No tag found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {tags.map((tag) => (
                                <CommandItem
                                    key={tag}
                                    value={tag}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        onSelectTag(currentValue)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === tag ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {tag}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default TagSelector;