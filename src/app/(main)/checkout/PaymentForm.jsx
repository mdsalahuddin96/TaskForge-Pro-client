"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  FieldError,
  Button,
  InputGroup,
} from "@heroui/react";
import {
  FiCreditCard,
  FiUser,
  FiCalendar,
  FiHash,
  FiInfo,
} from "react-icons/fi";

export default function PaymentForm({ amount }) {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiCreditCard className="text-indigo-600 w-5 h-5" />
        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
          Payment Details
        </h3>
      </div>

      {/* HeroUI Standard Form Integration */}

      <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
        {/* Cardholder Name*/}
        <TextField
          isRequired
          name="name"
          type="text"
          validate={(value) => {
            if (!value || value.trim().length < 3) {
              return "Please enter full cardholder name";
            }
            return null;
          }}
        >
          <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            Cardholder Name
          </Label>
          <InputGroup>
            <InputGroup.Prefix>
              <FiUser className="size-4 text-slate-400" />
            </InputGroup.Prefix>
            <InputGroup.Input
              variant="flat"
              placeholder="John Doe"
              className="font-medium"
            />
          </InputGroup>
          <FieldError className="text-xs text-danger-500 font-semibold mt-1" />
        </TextField>

        {/* Card Number*/}
        <TextField
          isRequired
          name="cardNumber"
          type="text"
          validate={(value) => {
            const cleanNumber = value?.replace(/\s+/g, "") || "";
            if (cleanNumber.length !== 16) {
              return "Card number must be exactly 16 digits";
            }
            return null;
          }}
        >
          <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            Card Number
          </Label>
          <InputGroup>
            <InputGroup.Prefix>
              <FiCreditCard className="text-slate-400" />
            </InputGroup.Prefix>
            <InputGroup.Input
              variant="flat"
              placeholder="4242 4242 4242 4242"
              className="font-mono tracking-widest"
              maxLength={19}
            />
          </InputGroup>
          <FieldError className="text-xs text-danger-500 font-semibold mt-1" />
        </TextField>

        {/* Expire date & CVC */}
        <div className="grid grid-cols-2 gap-4">
          {/* Expire date (MM/YY) */}
          <TextField
            isRequired
            name="expiry"
            type="text"
            validate={(value) => {
              if (!/^(0[1-2]|1[0-2])\/?([0-9]{2})$/.test(value)) {
                return "Use valid MM/YY format";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
              Expiry Date
            </Label>
            <InputGroup>
              <InputGroup.Prefix>
                <FiCalendar className="text-slate-400" />
              </InputGroup.Prefix>
              <InputGroup.Input
                variant="flat"
                placeholder="MM / YY"
                className="font-semibold"
                maxLength={5}
              />
            </InputGroup>
            <FieldError className="text-xs text-danger-500 font-semibold mt-1" />
          </TextField>

          {/* CVC  */}
          <TextField
            isRequired
            name="cvc"
            type="text"
            validate={(value) => {
              if (value.length < 3 || value.length > 3) {
                return "CVC must be 3 digits";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
              CVC
            </Label>
            <InputGroup>
              <InputGroup.Prefix>
                <FiHash className="text-slate-400" />
              </InputGroup.Prefix>
              <InputGroup.Input
                variant="flat"
                placeholder="123"
                className="font-semibold"
                maxLength={3}
              />
            </InputGroup>
            <FieldError className="text-xs text-danger-500 font-semibold mt-1" />
          </TextField>
        </div>

        {/*Stripe Test mode notification */}
        <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/30 rounded-xl p-4 flex items-start gap-2.5 mt-2">
          <FiInfo className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400/90 leading-relaxed">
            <strong className="font-bold">Test Mode:</strong> Use card number{" "}
            <code className="bg-amber-100/60 dark:bg-amber-900/40 px-1 py-0.5 rounded font-bold">
              4242 4242 4242 4242
            </code>{" "}
            with any future expiry date and a 3-digit CVC to complete
            simulation.
          </p>
        </div>

        {/* Pay button */}
        <Button
          type="submit"
          color="primary"
          className="w-full font-black text-sm tracking-wide rounded-xl py-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 dark:shadow-none transition-all mt-2"
        //   isLoading={isSubmitting}
        //   startContent={!isSubmitting && <FiLock />}
        >
          {/* {isSubmitting ? "Processing..." : `Pay $${amount} USD`} */}Submit
        </Button>
      </Form>
      <p className="text-center text-[10px] text-slate-400 font-medium mt-4">
        By confirming your payment, you agree to the Terms of Service.
      </p>
    </div>
  );
}
