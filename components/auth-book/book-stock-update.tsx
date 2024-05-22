"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    id: number;
    quantity: number;
}

const appUrl = process.env.NEXT_PUBLIC_APP;

const BookStockUpdateForm: React.FC<Props> = ({ id, quantity }) => {
    const [stockQuantity, setStockQuantity] = useState(quantity);

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`${appUrl}/api/books/${id}/`, {
                stock_quantity: stockQuantity
            });
            alert('Stock Quantity Updated.'); // Alert message after successful update
        } catch (error) {
            console.error('Error updating book:', error);
            // Handle errors here
        }
    };

    return (
        <div className='space-y-2'>
            <Label>Update Stock Quantity</Label>
            <Input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
            <Button onClick={handleUpdate}>Update</Button>
        </div>
    );
};

export default BookStockUpdateForm;
