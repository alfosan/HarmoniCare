import axios from 'axios';

interface PaymentIntentResponse {
    client_secret: string;
    [key: string]: any;
}

export const createPaymentIntent = async (amount: number): Promise<PaymentIntentResponse> => {
    try {
        const response = await axios.post<PaymentIntentResponse>(
            'http://localhost:8085/api/payments/create-payment-intent',
            { amount },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear el PaymentIntent:', error);
        throw error;
    }
};

export const createPayment = async (price: number, idInscription: number, token: string) => {
    try {
        const response = await axios.post(
            'http://localhost:8085/payments',
            { price, idInscription },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear el pago:', error);
        throw error;
    }
};