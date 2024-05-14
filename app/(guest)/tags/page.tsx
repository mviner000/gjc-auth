"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { FidgetSpinner } from 'react-loader-spinner';
import { Sidebar } from '@/components/sidebar';

import { playlists } from "@/actions/playlists"
import BreadcrumbComponent from '@/components/breadcrumb';
import CartSheet from '@/components/cart-sheet';
import PaginationControls from '@/components/pagination-controls';
import { Book, Subject } from '../authors/types';
import SubjectCard from '@/components/tags/tag-card';

const appUrl = process.env.NEXT_PUBLIC_APP;

let modifiedAppUrl = '';

if (appUrl) {
  // Remove trailing slash if it exists
  modifiedAppUrl = appUrl.replace(/\/$/, ''); 
}

const TagPage: React.FC = () => {
  const { toast } = useToast()
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookTitles, setBookTitles] = useState<string[]>([]);
  const [bookTitlesCount, setBookTitlesCount] = useState<number>(0);

  useEffect(() => {
    fetchSubjects(currentPage); 
  }, [currentPage]);

  useEffect(() => {
    const storedTitlesJSON = localStorage.getItem('bookTitles');
    if (storedTitlesJSON) {
      setBookTitles(JSON.parse(storedTitlesJSON));
    }

    const storedCount = localStorage.getItem('bookTitlesCount');
    if (storedCount) {
      setBookTitlesCount(parseInt(storedCount, 10));
    }
  }, []);

  const fetchSubjects = async (page: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}api/subjects/?page=${page}`);
      const { count, results } = response.data;
  
      const updatedResults = results.map((subject: Subject) => {
        if (!subject.books) {
          subject.books = [];
        }
        return subject;
      });
  
      setSubjects(updatedResults);
      setTotalPages(Math.ceil(count / 10));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    fetchSubjects(selectedPage);
  };

  const handleAddToCart = (title: string, thumbnailUrl: string | null) => {
    if (bookTitles.includes(title)) {
      // Display a toast notification for duplicate entry
      toast({
        title: "Warning!",
        variant: "destructive",
        description: `${title} already added to storage`,
        action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
      });
      return;
    }
  
    const updatedTitles = [...bookTitles, title];
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);

    const thumbnailUrlPrefixed = `${modifiedAppUrl}${thumbnailUrl}`
  
    const thumbnailToSave = thumbnailUrlPrefixed || 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book';
    localStorage.setItem(`thumbnail_${title}`, thumbnailToSave);
  
    toast({
      title: "Yehey! Congratulations",
      description: `"${title}" successfully added`,
      action: <ToastAction altText="Go to schedule to undo">Close</ToastAction>,
    });
  };

  const renderSubjects = () => {
    return (
      <SubjectCard subjects={subjects} handleAddToCart={handleAddToCart} />
    );
  };
  
  
  const handleDeleteBookTitle = (titleToRemove: string) => {
    const updatedTitles = bookTitles.filter((title) => title !== titleToRemove);
    localStorage.setItem('bookTitles', JSON.stringify(updatedTitles));
    setBookTitles(updatedTitles);
    setBookTitlesCount(updatedTitles.length);
  };

  
  const handleEmptyBookCart = () => {
    setBookTitles([]);
    setBookTitlesCount(0);
    localStorage.removeItem('bookTitles');
  };

  const renderPagination = () => {
    return (
      <div>
        <PaginationControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onGoToPage={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    );
  };

  return (
    <>
    <div className=''>
      <div className="mt-3 h-full ">
        <div className="grid lg:grid-cols-5">
          <Sidebar playlists={playlists} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className='flex justify-between'>
                  <BreadcrumbComponent currentPage={currentPage} currentPageText="Tags" />
                  <div className='mr-16'>
                  <CartSheet bookTitles={bookTitles} onDeleteTitle={handleDeleteBookTitle} handleEmptyBookCart={handleEmptyBookCart} />
                  </div>
                </div>     
                <div className='mb-2'>
                </div>
                <h2 className="text-2xl font-bold mb-4">All Tags <span className="bg-purple-100 text-purple-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400">{currentPage}</span></h2>
                {loading ? ( 
                  <div className='h-full'>
                    <FidgetSpinner />
                  </div>
                ) : (
                <div>
                  {renderSubjects()}
                  </div>
                    )}
                  <div>
                {renderPagination()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TagPage;
