import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../APi";
import { AppContext, Product } from "../../AppContext/Context";
import { showErrorNotification } from "../../Components/Toast";
import { Select } from "antd";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoading, addToCart } = useContext(AppContext);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("no_sort");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Product[]>("/products");
        setAllProducts(response.data);
      } catch (error) {
        showErrorNotification();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewProduct = (id: number) => {
    navigate(`/view_product/${id}`);
  };

  useEffect(() => {
    sortProducts();
  }, [sortOrder, allProducts]);

  const sortProducts = () => {
    if (sortOrder === "ascending") {
      const sorted = allProducts.slice().sort((a, b) => a.id - b.id);
      setSortedProducts(sorted);
    } else if (sortOrder === "descending") {
      const sorted = allProducts.slice().sort((a, b) => b.id - a.id);
      setSortedProducts(sorted);
    } else {
      setSortedProducts(allProducts);
    }
  };

  return (
    <div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-bold">ALL Products</h2>
            <Select
              defaultValue="no_sort"
              style={{ width: 200 }}
              onChange={(value: string) => setSortOrder(value)}
              options={[
                { value: "no_sort", label: "No Sort" },
                { value: "ascending", label: "Sort in Ascending order" },
                { value: "descending", label: "Sort in Decending order" },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map((product, index) => (
              <div key={index} className="flex flex-col justify-between">
                <div
                  className="group relative hover:bg-gray-300 border border-gray-400 rounded-lg p-4 flex-col flex flex-grow cursor-pointer"
                  onClick={() => handleViewProduct(product.id)}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product?.image}
                      alt="Product_Image"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product?.title}
                  </h3>

                  <div className="flex-grow flex justify-between items-end">
                    <p className="text-lg font-medium text-gray-900">
                      Price: {product?.price}
                    </p>
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded transition duration-300 border border-white opacity-0 group-hover:opacity-100">
                      View Product
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-gray-800 block w-full text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

