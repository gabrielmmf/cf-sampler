import { ChangeEvent, useState } from "react";
import TagSelector from "./tag-selector";
import { Card, CardHeader, CardContent } from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Constraint } from "@/logic/types";

type ConstraintFormProps = {
    onAddConstraint: (constraint: Constraint) => void;
}


function ConstraintForm({ onAddConstraint }: ConstraintFormProps) {

    const [tag, setTag] = useState<string | undefined>(undefined);
    const [signal, setSignal] = useState<"<=" | "=" | ">=" | undefined>(undefined);
    const [number, setNumber] = useState<number | undefined>(undefined);

    const handleTagChange = (selectedTag: string) => {
        console.log(selectedTag);
        setTag(selectedTag);
    }

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNumber(parseInt(e.target.value));
    }

    const handleSignalChange = (value: "<=" | "=" | ">=") => {
        setSignal(value);
    }

    const handleAddConstraintButtonClick = () => {
        if (!(tag && signal && number)) {
            alert("Preencha todos os campos para adicionar limitação");
            return;
        }
        onAddConstraint(
            {
                tag,
                signal,
                number
            }
        );
    }

    return (
        <div className="flex justify-around px-12">
            <Card className="w-full">
                <CardHeader className="text-center">Escolha restrição a ser adicionada na sua avaliação aleatória</CardHeader>
                <CardContent className="flex flex-col gap-4 justify-center items-center">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Restrição</TableHead>
                                <TableHead className="text-center">Número</TableHead>
                                <TableHead className="text-center">Tag</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Select onValueChange={handleSignalChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Restrição..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value=">=">Pelo menos</SelectItem>
                                                <SelectItem value="=">Exatamente</SelectItem>
                                                <SelectItem value="<=">No máximo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div >
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Input className="w-20" type="number" placeholder="0" min="0" onChange={handleNumberChange} />
                                    </div >
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex justify-center">
                                        <TagSelector onSelectTag={handleTagChange}></TagSelector>
                                    </div >
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button onClick={handleAddConstraintButtonClick} >Adicionar limitação</Button>

                </CardContent>
            </Card>

        </div>
    )
}

export default ConstraintForm;