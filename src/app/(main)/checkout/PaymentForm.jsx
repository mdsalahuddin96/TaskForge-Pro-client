"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  FiCreditCard,
  FiUser,
  FiLock,
  FiInfo,
  FiCalendar,
  FiHash,
} from "react-icons/fi";
import { savePayment } from "@/lib/actions/savePayment";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

// Common Design Object for stripe field
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "15px",
      color: "#0f172a", // text-slate-900
      fontFamily: "sans-serif",
      "::placeholder": { color: "#94a3b8" }, // text-slate-400
    },
    invalid: { color: "#ef4444" }, // text-red-500
  },
};

function CheckoutForm({ proposal }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router=useRouter()
  const {
    proposedBudget: amount,
    freelancerEmail,
    taskId,
  } = proposal;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const cardholderName = formData.get("name");

    try {
      // Receive client secret form api
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposal),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Confirm payment
      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement), 
            billing_details: {
              name: cardholderName,
            },
          },
        });

      if (stripeError) {
        setErrorMessage(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          freelancerEmail,
          amount,
          taskId,
          transaction_id:paymentIntent.id,
          payment_status: "paid",
        };
        // Saved payment info in database
        const result=await savePayment(paymentInfo)
        if(result.insertedId){
          toast.success("Payment Successful!")
        }
        setPaymentSuccess(true);
      }
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-8 shadow-sm max-w-md mx-auto mt-10">
      <div className="flex items-center gap-2 mb-6">
        <FiCreditCard className="text-indigo-600 w-5 h-5" />
        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
          Payment Details
        </h3>
      </div>

      {paymentSuccess ? (
        <div className="text-center py-6 text-green-600 dark:text-green-400 font-bold">
          🎉 Payment Successful! Thank you for your order.
        </div>
      ) : (
        <form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* Cardholder Name */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
              Cardholder Name
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 size-4 text-slate-400 z-10" />
              <input
                required
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent font-medium focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* ১. Card Number Field (আলাদা ফিল্ড) */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
              Card Number
            </label>
            <div className="relative flex items-center border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 min-h-[48px]">
              <FiCreditCard className="absolute left-4 text-slate-400 size-4 z-10" />
              <div className="w-full pl-6">
                <CardNumberElement options={ELEMENT_OPTIONS} />
              </div>
            </div>
          </div>

          {/* ২. Expiry Date & CVC  */}
          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Field */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
                Expiry Date
              </label>
              <div className="relative flex items-center border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 min-h-[48px]">
                <FiCalendar className="absolute left-4 text-slate-400 size-4 z-10" />
                <div className="w-full pl-6">
                  <CardExpiryElement options={ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>

            {/* CVC Field */}
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
                CVC
              </label>
              <div className="relative flex items-center border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 min-h-[48px]">
                <FiHash className="absolute left-4 text-slate-400 size-4 z-10" />
                <div className="w-full pl-6">
                  <CardCvcElement options={ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-950/20 p-2.5 rounded-lg border border-red-200/30">
              {errorMessage}
            </p>
          )}

          {/* Test mode Info */}
          <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/30 rounded-xl p-4 flex items-start gap-2.5 mt-2">
            <FiInfo className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400/90 leading-relaxed">
              <strong className="font-bold">Test Mode:</strong> Use card number{" "}
              <code className="bg-amber-100/60 dark:bg-amber-900/40 px-1 py-0.5 rounded font-bold">
                4242 4242 4242 4242
              </code>{" "}
              to complete simulation.
            </p>
          </div>

          {/* Pay button */}
          <button
            type="submit"
            disabled={!stripe || isSubmitting}
            className="w-full flex items-center justify-center gap-2 font-black text-sm tracking-wide rounded-xl py-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all mt-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <FiLock /> Pay ${proposal?.proposedBudget} USD
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function PaymentForm({ proposal }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm proposal={proposal} />
    </Elements>
  );
}
