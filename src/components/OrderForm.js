import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderForm = () => {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [items, setItems] = useState([{ dish_id: '', quantity: 1 }]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState({});

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const orderData = {
            client_name: clientName,
            client_email: clientEmail,
            address: address,
            city: city,
            postal_code: postalCode,
            items: items.map(item => ({ dish_id: parseInt(item.dish_id), quantity: parseInt(item.quantity) })),
            payment_method: paymentMethod
        };

        try {
            const response = await axios.post('http://localhost:8000/api/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Commande créée avec succès!');
        } catch (error) {
            console.error('Erreur lors de la création de la commande!', error);
            toast.error('Erreur lors de la création de la commande.');
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
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                >
                    <option value="">Sélectionner</option>
                    <option value="credit_card">Carte de crédit</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Espèces</option>
                </select>
                {errors.paymentMethod && <span>{errors.paymentMethod}</span>}
            </div>
            <div>
                <h3>Articles</h3>
                {items.map((item, index) => (
                    <div key={index}>
                        <label>ID du plat:</label>
                        <input
                            type="text"
                            name="dish_id"
                            value={item.dish_id}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                        <label>Quantité:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            min="1"
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
