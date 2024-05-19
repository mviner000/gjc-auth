import { cn } from '@/lib/utils';
import React, { FC, PropsWithChildren, useState } from 'react';

const ModalOverlay = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-50')} />
);

const ModalContainer = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('fixed', 'inset-0', 'z-50', 'overflow-y-auto')} />
);

const ModalContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('flex', 'items-center', 'justify-center', 'min-h-screen', 'px-4', 'pt-4', 'pb-20', 'text-center', 'sm:block', 'sm:p-0')} />
);

const ModalBox = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('inline-block', 'align-bottom', 'bg-white', 'rounded-lg', 'text-left', 'overflow-hidden', 'shadow-xl', 'transform', 'transition-all', 'sm:my-8', 'sm:align-middle', 'sm:max-w-lg', 'sm:w-full')} />
);

const ModalHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('bg-gray-50', 'px-4', 'py-3', 'border-b', 'border-gray-200', 'sm:flex', 'sm:flex-row', 'sm:justify-between', 'sm:items-center')} />
);

const ModalTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className={cn('text-lg', 'leading-6', 'font-medium', 'text-gray-900')} />
);

const ModalBody = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('p-4')} />
);

const ModalFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className={cn('bg-gray-50', 'px-4', 'py-3', 'sm:flex', 'sm:flex-row', 'sm:justify-between', 'sm:items-center')} />
);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContainer>
                <ModalContent>
                    <ModalBox>
                        <ModalHeader>
                            <ModalTitle>{title}</ModalTitle>
                            <button onClick={onClose}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-400 hover:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </ModalHeader>
                        <ModalBody>{children}</ModalBody>
                        <ModalFooter>
                            {/* Add your footer content here */}
                        </ModalFooter>
                    </ModalBox>
                </ModalContent>
            </ModalContainer>
        </>
    );
};

export default Modal;