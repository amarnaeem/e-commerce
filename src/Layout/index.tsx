import { useContext, ReactNode } from "react";
import { Layout, Drawer } from "antd";
import { AppContext, Product } from "../AppContext/Context";
import Navbar from "../Components/Navbar";
import {
  showSuccessNotification,
} from "../Components/Toast";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  const {
    onClose,
    open,
    cart,
    setCart,
    incrementProduct,
    decrementProduct,
    removeProduct,
  } = useContext(AppContext);

  const calculateTotalPrice = () => {
    return cart
      .reduce((total: number, product: Product) => total + product.quantity * product.price, 0)
      .toFixed(2);
  };
  const navigate = useNavigate();

  const totalCount = cart.reduce((acc: number, item: Product) => acc + item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    showSuccessNotification();
    setCart([]);
    navigate("/");
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar />
        <Content className="bg-gray-200">{children}</Content>

        <Drawer
          title={`ProductsCounts ( ${totalCount} )`}
          onClose={onClose}
          open={open}
          size={"large"}
        >
          <>
            <div className="container mx-auto px-2 py-4 h-full flex flex-col">
              <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <div className="max-h-[80vh] h-full overflow-y-auto overflow-x-hidden">
                    {cart.map((product: Product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 object-cover"
                          />
                          <div>
                            <h2 className="text-lg font-semibold">
                              {product.title.slice(0, 20)}...
                            </h2>
                            <p className="text-gray-500">${product.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                            onClick={() => decrementProduct(product)}
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                            onClick={() => incrementProduct(product.id)}
                          >
                            +
                          </button>
                          <p>${product.quantity * product.price}</p>
                          <button
                            className="px-2 py-1 bg-gray-800 text-white rounded-md"
                            onClick={() => removeProduct(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mt-4">
                    Total: ${calculateTotalPrice()}
                  </h2>
                  <div
                    className="mt-auto border border-black p-2"
                    onClick={handleCheckout}
                  >
                    <div className="text-2xl p-1 flex items-center justify-center text-white w-full bg-gray-800 hover:bg-gray-900 !important text-center font-bold cursor-pointer  rounded-md">
                      Checkout
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        </Drawer>
      </Layout>
    </>
  );
};

export default AppLayout;
