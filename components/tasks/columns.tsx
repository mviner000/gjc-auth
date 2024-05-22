"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { statuses } from "@/components/tasks/data/data"
import { Task } from "@/components/tasks/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import Image from "next/image"
import { CircleCheckBig, CircleX } from "lucide-react"

interface BookTitleWithImage {
    title: string;
    thumbnail_url: string;
}

interface ColumnsProps {
    bookTitlesWithImages: Record<number, BookTitleWithImage>;
}

export const columns = ({ bookTitlesWithImages }: ColumnsProps): ColumnDef<Task>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: "id",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Student ID" />
    //     ),
    //     cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => <div className="w-[150px]">{row.getValue("email")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "is_borrowed_verified",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Borrowed Verified" />
        ),
        cell: ({ row }) => (
            <div className="w-[120px]">
                {row.getValue("is_borrowed_verified") ? (
                    <CircleCheckBig className="text-emerald-500" />
                ) : (
                    <CircleX className="text-red-400" />
                )}
            </div>
        )
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => <div className="w-[150px]">{row.getValue("status")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "books",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Books" />
        ),
        cell: ({ row }) => {
            const books = row.getValue("books") as number[]; // Type assertion

            return (
                <div className="flex space-x-2">
                    {books.map((bookId) => (
                        <div key={bookId} className="w-[250px]">
                            <div className="flex gap-4">
                                <div className="">
                                    <Image
                                        width={150}
                                        height={220}
                                        src={bookTitlesWithImages[bookId]?.thumbnail_url}
                                        alt="book image"

                                        className="rounded-md"
                                    />
                                </div>
                                <p className="text-sm font-medium">
                                    {bookTitlesWithImages[bookId]?.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "is_return_verified",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Return Verified" />
        ),
        cell: ({ row }) => (
            <div className="w-[120px] text-center justify-center">
                {row.getValue("is_return_verified") ? (
                    <CircleX className="text-red-400" />
                ) : (
                    <CircleCheckBig className="text-emerald-500" />
                )}
            </div>
        )
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]