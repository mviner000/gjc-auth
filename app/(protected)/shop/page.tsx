"use client";

import { BellRing, Check } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Footer from "@/components/footer";

interface Product {
  id: number;
  name: string;
  description: string;
  barcode: string;
  grocery_price: string;
  selling_price: string;
  stock_quantity: number;
  image_url: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}

interface Shop {
  id: number;
  name: string;
  owner: string;
  address: string;
  email: string;
  phone: string;
  products: Product[];
  created_at: string;
  updated_at: string;
}

interface Restock {
  id?: number;
  product: number;
  restocker_id: string;
  new_quantity: number;
}

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

const appUrl = process.env.NEXT_PUBLIC_APP;

const API_URL = `${appUrl}/api/restocks/`;

const Shop: React.FC = () => {
  const { toast } = useToast()
  const user = useCurrentUser();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [open, setOpen] = React.useState(false)

  const [restocks, setRestocks] = useState<Restock[]>([]);
  const [restockData, setRestockData] = useState<Restock>({
    product: 1,
    restocker_id: user?.email ?? '',
    new_quantity: 0,
  });

  const fetchRestocks = async (): Promise<void> => {
    try {
      const response = await axios.get(API_URL);
      setRestocks(response.data);
    } catch (error) {
      console.error('Error fetching restocks:', error);
    }
  };

  useEffect(() => {
    fetchRestocks();
  }, []);

  useEffect(() => {
    axios.get(`${appUrl}/api/shops/`)
      .then(response => {
        setShops(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRestockData({ ...restockData, [name]: value });
  };

  const handleCreateRestock = async (): Promise<void> => {
    try {
      await axios.post(API_URL, restockData);
      alert('Restock created successfully!');
      fetchRestocks(); // Refresh the list after creating a new restock
    } catch (error) {
      console.error('Error creating restock:', error);
    }
  };

  const handleSelectProduct = (productId: number) => {
    const selectedProduct = shops.flatMap(shop => shop.products).find(product => product.id === productId);
  
    if (selectedProduct) {
      setRestockData({ ...restockData, product: productId });
    }
  };
  
  return (
    <>
    <div >
    

      {shops.map(shop => (
        <div key={shop.id} >
          <div className="mb-3">
          <h2>{shop.name}</h2>
          <p><strong>Owner:</strong> {shop.owner}</p>
          <p><strong>Address:</strong> {shop.address}</p>
          <h3 className="mt-2 text-4xl font-bold">Products:</h3>
        </div>
          {shop.products.length > 0 ? (
            shop.products.map(product => (

             


              <div key={product.id}>
                 <Card>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription> <p><strong>Selling Price:</strong> {product.selling_price}</p>
                <p><strong>Stock Quantity:</strong> {product.stock_quantity}</p></CardDescription>
                <p><strong>Available:</strong> {product.available ? 'Yes' : 'No'}</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                {product.image_url && <img src={product.image_url} alt={product.name} className="w-full"/>}
                </div>
               
              </CardContent>
              <CardFooter>

              <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => handleSelectProduct(product.id)} variant="outline" className="w-full">Edit Stock</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
            <DialogDescription>
              Make changes to product stock. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <form className="grid items-start gap-4">
          <div className="hidden gap-2">
          <Label>
          Product ID:
          
        </Label>
          <Input
            disabled
            type="number"
            name="product"
            value={restockData.product}
            onChange={handleInputChange}
          />
        </div>
        <div className=" gap-2 hidden">
        <Label >
            Restocker ID:
            
          </Label>
            <Input
              type="text"
              name="restocker_id"
              value={restockData.restocker_id}
              readOnly // Make the input read-only
            />
            </div>
            
        <div className="grid gap-2">
        <Label>
          New Quantity:
          
        </Label>
          <Input
            type="number"
            name="new_quantity"
            value={restockData.new_quantity}
            onChange={handleInputChange}
          />
</div>
      
      <Button onClick={handleCreateRestock} type="submit">Save changes</Button>
    </form>
        </DialogContent>
      </Dialog>

             
              </CardFooter>
            </Card>

             
              </div>
              
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      ))}
    </div>

    <div>



      <div>
  <div className="grid grid-cols-2">
  <ul>
    {restocks.map((restock) => (
      <li key={restock.id}>

<Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{restock.product}</AccordionTrigger>
        <AccordionContent>
          
        <strong>Product ID:</strong> {restock.product} - 
        <strong> New Quantity:</strong> {restock.new_quantity} - 
        <strong> Restocker ID:</strong> {restock.restocker_id} 
        </AccordionContent>
      </AccordionItem>
    </Accordion>

        
      </li>
    ))}
  </ul>
  </div>
</div>

    </div>

 
<Footer />
    </>
  );
};


export default Shop;
