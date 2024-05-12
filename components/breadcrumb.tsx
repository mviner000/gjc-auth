import React from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from 'next/link';

interface BreadcrumbProps {
  currentPage: number;
  currentPageText: string;
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ currentPage, 
  currentPageText, }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className='text-black dark:text-white' href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4 text-black dark:text-white" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-black dark:text-white" align="start">
              <Link href="/about">
              <DropdownMenuItem>About</DropdownMenuItem>
              </Link>
              <Link href="/contacts">
              <DropdownMenuItem>Contacts</DropdownMenuItem>
              </Link>
              <Link href="/team">
              <DropdownMenuItem>Team</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='hidden'/>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components" className='text-slate-200 dark:text-white hidden'>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='text-lime-500 font-semibold'>{currentPageText}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;