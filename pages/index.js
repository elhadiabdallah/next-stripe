import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


//const stripePromise = loadStripe('pk_test_51H7n51E0GSoKvEJxgMpwOphCTCYZ4U1fW7ucqwCwURKvNfrIR846Agf5LU4Gu7xzwJugv5weRpz9E8wT5qewQlCy00eou8x5VM');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
  };

  const iframeStyles = {
    base: {
      color: "#blue",
      fontSize: "16px",
      iconColor: "red",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51H7n51E0GSoKvEJxgMpwOphCTCYZ4U1fW7ucqwCwURKvNfrIR846Agf5LU4Gu7xzwJugv5weRpz9E8wT5qewQlCy00eou8x5VM');

export default function Home()
{
  return (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
}


