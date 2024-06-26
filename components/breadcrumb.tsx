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
  currentPageHeadLink?: string;
  currentPageHead?: string;
  currentPageText: string;
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({
  currentPage,
  currentPageHead,
  currentPageHeadLink,
  currentPageText, }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className='text-black dark:text-white' href="/books">Books</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components" className='text-slate-200 dark:text-white hidden'>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        {currentPageHeadLink && currentPageHead ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div>
                <Link href={currentPageHeadLink}>
                  {currentPageHead}
                </Link>
              </div>
            </BreadcrumbItem>
          </>
        ) : (
          currentPageHead && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className='font-semibold'>{currentPageHead}</span>
              </BreadcrumbItem>
            </>
          )
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='text-lime-500 font-semibold'>{currentPageText}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;