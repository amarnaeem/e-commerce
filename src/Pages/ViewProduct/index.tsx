import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../APi';
import { AppContext, Product } from '../../AppContext/Context';
import { useParams } from "react-router-dom";


export const ViewProduct: React.FC = () => {
  const [viewProduct, setViewProduct] = useState<Product | null>(null); 
  const { id } = useParams();
  const { setIsLoading, addToCart } = useContext(AppContext); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Product>(`/products/${id}`);
        setViewProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setIsLoading]);

  if (!viewProduct) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-none w-full md:w-1/2 relative overflow-hidden rounded-lg bg-gray-200 aspect-w-16 aspect-h-7 border border-red">
            <img
              src={viewProduct.image}
              alt="Product_Image"
              className="absolute inset-0 w-full h-cover object-fill object-center group-hover:opacity-75"
            />
          </div>
          <div className="flex flex-col justify-between bg-gray-100 p-6 rounded-lg w-full md:w-1/2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{viewProduct.title}</h3>
              <p className="text-gray-600">{viewProduct.description}</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Price: {viewProduct.price}</p>
            </div>
            <button className="mt-4 md:mt-0 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300" onClick={() => addToCart(viewProduct)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

