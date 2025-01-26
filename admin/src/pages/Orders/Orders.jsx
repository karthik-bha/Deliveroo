import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + 'api/order/list');

      if (response.data.success) {
        setOrders(response.data.data);
        // console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(url + 'api/order/status', {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update order status');
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === "All") return true;
    if (filter === "Paid") return order.payment;
    if (filter === "Unpaid") return !order.payment;
    return true;
  });

  // Delete order handler
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${url}api/order/delete/${id}`);
      if (response.data.success) {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        toast.success('Order deleted successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete order');
    }
  };

  // Render individual order item
  const renderOrderItem = (order) => (
    <div
      key={order._id}
      className="flex flex-col gap-4 p-4 border 
      border-slate-300 rounded-lg my-2 md:grid md:grid-cols-5 md:items-center"
    >
      {/* Order Icon */}
      <img src={assets.parcel_icon} alt="Order Icon" className="w-16 h-16 mx-auto md:mx-0" />

      {/* Order Details */}
      <div>

        <p className="text-lg font-semibold">
          {/* get items one by one  */}
          {order.items.map((item, index) => (
            <span key={item._id}>
              {item.name} x {item.quantity}
              {index < order.items.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>


        <div className="mt-2">
          <p className="font-bold">
            {order.address.fname} {order.address.lname}
          </p>
          <p>{order.address.street},</p>
          <p>
            {order.address.state}, {order.address.country}, {order.address.zipcode}
          </p>
          <p>{order.address.phone}</p>
        </div>



      </div>

      {/* Items Count */}
      <p className="text-center md:text-left">Items: {order.items.length}</p>

      {/* Total Amount */}
      <p className="text-center md:text-left">${order.amount}</p>

      {/* Status Dropdown */}
      <div className="flex justify-center md:justify-start">
        <select
          onChange={(e) => statusHandler(e, order._id)}
          value={order.status}
          className="px-4 py-2 bg-red-100 rounded-lg"
        >
          <option value="Food Processing">Food Processing</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div className="flex justify-center">
        <button 
          onClick={() => deleteOrder(order._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      </div>
    </div>
  );

  return (
    <div className="ml-4 md:ml-12 p-4">
      <h3 className="text-2xl font-bold text-slate-700 mb-6">Order Page</h3>
      <div className='flex gap-2 mb-6'>
        <button className='hover:text-white px-4 py-1 text-[1rem] bg-yellow-400 rounded-lg'
          onClick={() => setFilter("All")}>Display All</button>
        <button className='hover:text-white px-4 py-1 text-[1rem] bg-green-400 rounded-lg'
          onClick={() => setFilter("Paid")}>Display Paid Orders</button>
        <button className='hover:text-white px-4 py-1 text-[1rem] bg-red-400 rounded-lg'
          onClick={() => setFilter("Unpaid")}>Display Unpaid orders</button>
      </div>
      {loading ? (
        <p className="text-center text-slate-500">Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="grid">
          {filteredOrders.map(renderOrderItem)}
        </div>
      ) : (
        <p className="text-center text-slate-500">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;