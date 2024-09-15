"use client"

import * as React from "react"

import Image from "next/image";
import { Button } from "../components/ui/button";

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

export type Task = {
  id: string
  date: string
  status: "pendente" | "cancelada" | "concluída" | "não concluída"
  content: string
}

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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("content")}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right me-7">Data</div>,
    cell: ({ row }) => {
      const data : string = (row.getValue("date"))
 
      return <div className="text-right font-medium">{data}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Concluir tarefa ✅
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar tarefa 📝</DropdownMenuItem>
            <DropdownMenuItem>Excluir tarefa ❌</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

//Dados de exemplo
const data: Task[] = [
  {
    id: "m5gr84i9",
    date: "23/01/2025",
    status: "pendente",
    content: "Criar uma página NextJS",
  },
  {
    id: "3u1reuv4",
    date: "11/09/2024",
    status: "concluída",
    content: "Recriar o banco Itau em Cobol",
  },
  {
    id: "derv1ws0",
    date: "10/09/2024",
    status: "cancelada",
    content: "Ver o Brasil ganhar do Paraguai",
  },
  {
    id: "5kma53ae",
    date: "08/09/2024",
    status: "concluída",
    content: "Criar uma cópia do X para quando ele for banido",
  },
  {
    id: "bhqecj4p",
    date: "15/08/2027",
    status: "não concluída",
    content: "Conhecer o CR7 pessoalmente",
  },
  {
    id: "m5gr84i5",
    date: "23/01/2025",
    status: "pendente",
    content: "Criar uma página NextJS",
  },
  {
    id: "3u1reuv2",
    date: "11/09/2024",
    status: "concluída",
    content: "Recriar o banco Itau em Cobol",
  },
  {
    id: "derv1ws1",
    date: "10/09/2024",
    status: "cancelada",
    content: "Ver o Brasil ganhar do Paraguai",
  },
  {
    id: "5kma536e",
    date: "08/09/2024",
    status: "concluída",
    content: "Criar uma cópia do X para quando ele for banido",
  },
  {
    id: "bhqecj4i",
    date: "15/08/2027",
    status: "não concluída",
    content: "Conhecer o CR7 pessoalmente",
  },
]

export default function Home() {
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  
  return (
    <div className="container">
      <div className="menu container md">
        <div className=" text-black clear-both  ">
        <NavigationMenu className="ms-5 mt-5">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Criar</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-2 text-md font-medium">
                      Projeto
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Criar novo projeto
                    </p>
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-1 text-md font-medium">
                      Tarefa
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Criar nova tarefa
                    </p>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Perfil</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-1 text-md font-medium">
                      Editar perfil
                    </div>
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-1 text-md font-medium">
                      Trocar de perfil
                    </div>
                  </a>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="float-right clear-both text-black">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sair
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>
      </div>


      <div className="text-black ms-10 mt-10 flex items-center">
      <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar tarefas..."
          value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("content")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
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
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
      </div>
      </div>
      <div>
      </div>
    </div>
  );
}
