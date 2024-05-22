"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { statuses } from "@/components/tasks/data/data"
import { Task } from "@/components/tasks/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import Image from "next/image"
export const columns: ColumnDef<Task>[] = [
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
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Student ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
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
                    <span>true</span>
                ) : (
                    <span>false</span>
                )}
            </div>
        )
    },
    {
        accessorKey: "books",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Books" />
        ),
        cell: ({ row }) => <div className="w-[150px]">{row.getValue("books")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "is_return_verified",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Return Verified" />
        ),
        cell: ({ row }) => (
            <div className="w-[120px]">
                {row.getValue("is_return_verified") ? (
                    <span>true</span>
                ) : (
                    <span>false</span>
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