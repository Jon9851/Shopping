import React, { useContext, useState } from 'react';
import './Checkout.css';
import { ShopContext } from '../../Context/ShopContext';

const Checkout = () => {
    const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });

    // Handle change in billing and payment form inputs
    const handleBillingChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleSubmitOrder = () => {
        // Handle order submission (in a real-world app, this would include API calls to handle payments)
        console.log('Billing Info:', billingInfo);
        console.log('Payment Info:', paymentInfo);
        alert('Order placed successfully!');
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            
            {/* Order Summary */}
            <div className="checkout-summary">
                <h2>Your Order</h2>
                <div className="checkout-summary-items">
                    {all_product.map((product) => {
                        if (cartItems[product.id] > 0) {
                            return (
                                <div className="checkout-item" key={product.id}>
                                    <p>{product.name}</p>
                                    <p>Quantity: {cartItems[product.id]}</p>
                                    <p>Price: £{product.new_price}</p>
                                    <p>Total: £{product.new_price * cartItems[product.id]}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <h3>Total Amount: £{getTotalCartAmount()}</h3>
            </div>

            {/* Billing Information */}
            <div className="checkout-billing">
                <h2>Billing Information</h2>
                <input type="text" name="name" placeholder="Full Name" value={billingInfo.name} onChange={handleBillingChange} />
                <input type="email" name="email" placeholder="Email" value={billingInfo.email} onChange={handleBillingChange} />
                <input type="text" name="address" placeholder="Address" value={billingInfo.address} onChange={handleBillingChange} />
                <input type="text" name="city" placeholder="City" value={billingInfo.city} onChange={handleBillingChange} />
                <input type="text" name="postalCode" placeholder="Postal Code" value={billingInfo.postalCode} onChange={handleBillingChange} />
                <input type="text" name="country" placeholder="Country" value={billingInfo.country} onChange={handleBillingChange} />
            </div>

            {/* Payment Information */}
            <div className="checkout-payment">
                <h2>Payment Information</h2>
                <input type="text" name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={handlePaymentChange} />
                <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={paymentInfo.expiryDate} onChange={handlePaymentChange} />
                <input type="text" name="cvc" placeholder="CVC" value={paymentInfo.cvc} onChange={handlePaymentChange} />
            </div>

            {/* Submit Order */}
            <button className="checkout-submit" onClick={handleSubmitOrder}>Place Order</button>
        </div>
    );
};

export default Checkout;
