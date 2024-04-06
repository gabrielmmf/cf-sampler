import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Trash, ArrowLeft, ArrowRight} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Constraint } from "@/logic/types"


function getColumns(removeConstraint: (constraint: Constraint) => void): ColumnDef<Constraint>[] {
    return [
        {
            accessorKey: "signal",
            header: "Restrição",
            cell: ({ row }) => {

                const signal = row.getValue("signal");

                const phraseMap = {
                    ">=": "Pelo menos",
                    "<=": "No máximo",
                    "=": "Exatamente"
                }

                if (signal !== ">=" && signal !== "<=" && signal !== "=") return;


                return <div className="capitalize">{phraseMap[signal]}</div>
            },
        },
        {
            accessorKey: "number",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Número
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("number")}</div>,
        },
        {
            accessorKey: "tag",
            header: () => <div className="text-right">Tags</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{row.getValue("tag")}</div>
            },
        },
        {
            id: "remove",
            enableHiding: false,
            cell: ({ row }) => {
                const constraint = row.original

                return (
                    <div className="flex justify-center">
                        <Button onClick={() => removeConstraint(constraint)} variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Remover limitação</span>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]
}

type ConstraintsTableProps = {
    value: Constraint[],
    removeConstraint: (constraint: Constraint) => void;
}

export function ConstraintsTable({ value, removeConstraint }: ConstraintsTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})


    const [data, setData] = React.useState<Constraint[]>(value);

    React.useEffect(() => {
        setData(value);
    }, [value]);

    const columns = getColumns(removeConstraint);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        initialState: {
            pagination: {
                pageSize: 6
            }
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div className="px-12">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por tags..."
                    value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("tag")?.setFilterValue(event.target.value)
                    }
                />
                <DropdownMenu>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhuma limitação adicionada
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ArrowRight/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
