'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { 
  MapPinIcon, 
  PhoneIcon, 
  CheckCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose 
} from '@/components/ui/Dialog';
import { ADD_Cart_item } from '@/redux/Carts/Cart.action';


// Types
interface Product {
  id: string;
  name: string;
  price: string;
  img_src: string;
  desc: string;
  company: string;
  rating: string;
  discount?: string;
  delear_name?: string;
}

interface OrderForm {
  user_name: string;
  user_email: string;
  qty: string;
  date: string;
  message: string;
}

// API Configuration
const API_BASE_URL = 'https://trademart-data-2zur.vercel.app';

// Email.js Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_hakjw5z',
  templateId: 'template_p2zhnas',
  publicKey: 'pc7y9Dv2GAuWDsXZH'
};

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    user_name: '',
    user_email: '',
    qty: '',
    date: '',
    message: ''
  });

  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const productId = params?.id as string;

  // Determine product type from ID
  const getProductType = (id: string): string => {
    if (id.startsWith('m')) return 'medicines';
    if (id.startsWith('p')) return 'projector';
    if (id.startsWith('s')) return 'solarpanel';
    return 'medicines'; // default
  };

  // Fetch product details
  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/Allproducts/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch related products
  const fetchRelatedProducts = async (id: string) => {
    try {
      const productType = getProductType(id);
      const response = await axios.get(`${API_BASE_URL}/${productType}`);
      // Show only first 4 related products
      setRelatedProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    setOrderForm(prev => ({
      ...prev,
      [name]: value,
      date: formattedDate
    }));
  };

  // Handle order submission
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product || !formRef.current) return;

    try {
      // Add to cart
      const cartItem = {
        ...product,
        ...orderForm
      };
      dispatch(ADD_Cart_item(cartItem));

      // Send email
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );

      // Reset form and close dialog
      setOrderForm({
        user_name: '',
        user_email: '',
        qty: '',
        date: '',
        message: ''
      });
      setIsOrderDialogOpen(false);
      
      // Show success message (you can add a toast here)
      alert('Order placed successfully! Dealer will contact you within 3 days.');
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
      fetchRelatedProducts(productId);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Product Image */}
            <div className="md:col-span-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative h-80 w-full">
                  <Image
                    src={product.img_src}
                    alt={product.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="md:col-span-5">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-blue-600 mb-6">
                  {product.price}
                  <span className="text-lg font-normal text-gray-600">/Pack</span>
                </p>

                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <span className="font-semibold">Name:</span> {product.name}
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-semibold">Description:</span> {product.desc}
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-semibold">Company:</span> {product.company}
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-semibold">Rating:</span> {product.rating}
                  </div>
                </div>

                <p className="mt-6 text-gray-700 font-medium">
                  We offers Bronchodilator & Expectorant {product.name}.
                </p>

                <Button
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setIsOrderDialogOpen(true)}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Retailer Details */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-center">
                    {product.delear_name || 'Dwarkesh Pharmaceuticals'}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="https://3.imimg.com/data3/GR/HK/MY-2474176/dwarkesh-pharmaceuticals-pvt-ltd-90x90.png"
                      alt="Dealer"
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          GIDC Vatwa, Ahmedabad, Gujarat
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-gray-600">
                          GST- 24AAACD6674N1ZA
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">Call</span>
                    <span className="text-sm font-medium">+91 7290000423</span>
                  </div>

                  <p className="text-sm text-gray-600">64% Response Rate</p>

                  <Button variant="outline" className="w-full text-teal-600 border-teal-600 hover:bg-teal-50">
                    Contact Supplier
                  </Button>

                  <hr />

                  <Link href="#" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                    View More Sellers {'>'}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 underline">
              Browse Related Categories
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative h-48 w-full mb-4">
                      <Image
                        src={relatedProduct.img_src}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    
                    <Badge className="mb-2 bg-teal-100 text-teal-800">New</Badge>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    
                    <p className="text-lg font-bold text-gray-900 mb-4">
                      Price: ₹ {relatedProduct.price}
                      <span className="text-sm font-normal text-gray-600"> / Piece</span>
                    </p>
                    
                    <Link href={`/productdetails/${relatedProduct.id}`}>
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                        See more details...
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Place Your Order</DialogTitle>
            <DialogClose />
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={product.img_src}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <p><span className="font-semibold">Name:</span> {product.name}</p>
                <p><span className="font-semibold">Price:</span> {product.price}</p>
                <p><span className="font-semibold">Rating:</span> {product.rating}</p>
                {product.discount && (
                  <p><span className="font-semibold">Discount:</span> {product.discount}</p>
                )}
              </div>
            </div>

            {/* Order Form */}
            <form ref={formRef} onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  name="user_name"
                  value={orderForm.user_name}
                  onChange={handleFormChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  name="user_email"
                  value={orderForm.user_email}
                  onChange={handleFormChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <Input
                  type="number"
                  name="qty"
                  value={orderForm.qty}
                  onChange={handleFormChange}
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <select
                  name="product_name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue={product.name}
                >
                  <option value={product.name}>{product.name}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <select
                  name="price"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue={product.price}
                >
                  <option value={product.price}>{product.price}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={orderForm.message}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message here..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Order Confirm
              </Button>
            </form>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Dealer will contact you within 3 days
          </p>
        </DialogContent>
      </Dialog>

    </>
  );
};


export default ProductDetails;
