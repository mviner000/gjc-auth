import React, { useEffect, useState } from 'react';
import { Book } from '@/utils/types/subjects';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FidgetSpinner } from 'react-loader-spinner';

interface Props {
    subject1_code: string;
    bookTitles: string[];
    handleDeleteBookTitle: (titleToRemove: string) => void;
    handleEmptyBookCart: () => void;
    handleViewBook: (e: React.MouseEvent<HTMLDivElement>, bookId: number) => void;
    bookLoading: boolean;
    bookTotalTaggedText: string;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const SubjectList: React.FC<Props> = ({
    subject1_code,
    bookTitles,
    handleDeleteBookTitle,
    handleEmptyBookCart,
    handleViewBook,
    bookLoading,
    bookTotalTaggedText
}) => {
    const [subject, setSubject] = useState<{ subject_name: string; books: Book[] } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                const response = await fetch(`${appUrl}/api/subjects/${subject1_code}/`);
                const data = await response.json();
                setSubject(data);
            } catch (error) {
                console.error('Error fetching subject data:', error);
            }
        };

        fetchSubjectData();
    }, [subject1_code]);

    if (!subject) {
        return <p>Loading...</p>;
    }

    return (
        <div className="h-full px-4 lg:px-8">
            <h1 className="text-4xl mb-5 font-semibold">
                {subject.subject_name}{' '}
                <span className="text-yellow-200"> ({subject.books.length} {bookTotalTaggedText})</span>
            </h1>

            {bookLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-neutral-500/50 z-50">
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                        backgroundColor="#F4442E"
                    />
                </div>
            )}

            {subject.books.length > 0 ? (
                <ul className="space-y-3 grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-2 md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    {subject.books.map((book: Book) => (
                        <li key={book.id}>
                            <div
                                onClick={(e) => handleViewBook(e, book.id)}
                                className="cursor-pointer shadow-md dark:shadow-none bg-white dark:bg-transparent rounded-md p-0"
                            >
                                <p>{book.title}</p>
                                <Image
                                    src={book.thumbnail_url ? book.thumbnail_url : 'https://via.placeholder.com/128x185/007bff/ffffff?text=Book'}
                                    alt="book_image"
                                    width={136}
                                    height={56}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={true}
                                    className="mt-3 rounded-md w-auto xxs:size-38 md:w-48 h-56 object-cover transition-all hover:scale-105"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books found for this subject.</p>
            )}
        </div>
    );
};

export default SubjectList;
