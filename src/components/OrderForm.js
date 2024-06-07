import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('your-stripe-public-key');

const OrderForm = () => {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [items, setItems] = useState([{ dish_id: '', quantity: 1 }]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState({});
    const [orderId, setOrderId] = useState(null);
    const [paymentMethodId, setPaymentMethodId] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!clientName) newErrors.clientName = 'Nom est requis';
        if (!clientEmail) newErrors.clientEmail = 'Email est requis';
        if (!address) newErrors.address = 'Adresse est requise';
        if (!city) newErrors.city = 'Ville est requise';
        if (!postalCode) newErrors.postalCode = 'Code postal est requis';
        if (!paymentMethod) newErrors.paymentMethod = 'Mode de paiement est requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateTotalAmount = () => {
        return items.reduce((total, item) => total + (item.quantity * getItemPrice(item.dish_id)), 0);
    };

    const getItemPrice = (dish_id) => {
        return 10; // Exemple de prix fixe
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const totalAmount = calculateTotalAmount();

        const orderData = {
            client_name: clientName,
            client_email: clientEmail,
            address: address,
            city: city,
            postal_code: postalCode,
            items: items.map(item => ({ dish_id: parseInt(item.dish_id), quantity: parseInt(item.quantity) })),
            payment_method: paymentMethod,
            total_amount: totalAmount
        };

        try {
            const response = await axios.post('http://localhost:8000/api/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const createdOrder = response.data;
            setOrderId(createdOrder.id);
            toast.success('Commande créée avec succès!');

            if (paymentMethod === 'credit_card' && paymentMethodId) {
                const paymentResponse = await axios.post('http://localhost:8000/api/payments/stripe', {
                    order_id: createdOrder.id,
                    payment_method_id: paymentMethodId,
                });
                console.log('Payment successful:', paymentResponse.data);
            } else if (paymentMethod === 'paypal') {
                const paypalResponse = await axios.post('http://localhost:8000/api/payments/paypal', {
                    order_id: createdOrder.id,
                });
                console.log('PayPal payment successful:', paypalResponse.data);
            }

        } catch (error) {
            console.error('Erreur lors de la passation de la commande ou du paiement', error.response ? error.response.data : error.message);
            toast.error('Erreur lors de la passation de la commande ou du paiement.');
        }
    };

    const handleItemChange = (index, event) => {
        const newItems = items.slice();
        newItems[index][event.target.name] = event.target.value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { dish_id: '', quantity: 1 }]);
    };

    const handlePayPalPayment = async (details, data) => {
        try {
            const paypalResponse = await axios.post('http://localhost:8000/api/payments/paypal', {
                order_id: orderId,
                paypal_order_id: data.orderID,
            });
            console.log('PayPal payment successful:', paypalResponse.data);
            toast.success('Paiement PayPal réussi!');
        } catch (error) {
            console.error('Erreur lors du paiement PayPal', error.response ? error.response.data : error.message);
            toast.error('Erreur lors du paiement PayPal.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                />
                {errors.clientName && <span>{errors.clientName}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                />
                {errors.clientEmail && <span>{errors.clientEmail}</span>}
            </div>
            <div>
                <label>Adresse:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                {errors.address && <span>{errors.address}</span>}
            </div>
            <div>
                <label>Ville:</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                {errors.city && <span>{errors.city}</span>}
            </div>
            <div>
                <label>Code Postal:</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                />
                {errors.postalCode && <span>{errors.postalCode}</span>}
            </div>
            <div>
                <label>Mode de paiement:</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                    <option value="">Sélectionnez un mode de paiement</option>
                    <option value="credit_card">Carte de crédit</option>
                    <option value="paypal">PayPal</option>
                </select>
                {errors.paymentMethod && <span>{errors.paymentMethod}</span>}
            </div>
            {paymentMethod === 'credit_card' && orderId && (
                <Elements stripe={stripePromise}>
                    <PaymentForm orderId={orderId} onPaymentMethodIdReceived={setPaymentMethodId} />
                </Elements>
            )}
            {paymentMethod === 'paypal' && orderId && (
                <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id" }}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: calculateTotalAmount().toString()
                                    }
                                }]
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(details => {
                                handlePayPalPayment(details, data);
                            });
                        }}
                    />
                </PayPalScriptProvider>
            )}
            <div>
                <label>Articles:</label>
                {items.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="dish_id"
                            value={item.dish_id}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="ID du plat"
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Quantité"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addItem}>Ajouter un article</button>
            </div>
            <button type="submit">Passer la commande</button>
        </form>
    );
};

export default OrderForm;