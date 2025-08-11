import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (membershipType) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType },
      { withCredentials: true }
    );

    const { keyId, orderId, amount, currency, } = order.data

    const options = {
      key: keyId,
      amount, 
      currency,
      name: "DevTinder",
      description: "Connect with other developers",
      order_id: orderId,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="mt-20">
      <div className="flex w-full items-center justify-center">
        <div className="card bg-base-300 rounded-box grid h-60 w-80 place-items-center">
          <h1 className="font-bold text-xl text-white">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Inifiniye connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("gold")}
            className="px-4 py-2 font-bold bg-primary text-white rounded-md"
          >
            Buy Gold
          </button>
        </div>

        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-60 w-80  place-items-center">
          <h1 className="font-bold text-xl text-white">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("silver")}
            className="px-4 py-2 font-bold bg-secondary text-white rounded-md"
          >
            Buy Silver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
