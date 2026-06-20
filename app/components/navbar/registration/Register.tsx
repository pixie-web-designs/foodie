/* Registration modal component */
"use client";
import React, { useState, useRef } from "react";

import { env } from "@/lib/env";

type RegisterProps = {
  id: string;
};

const Register = ({ id }: RegisterProps) => {
  // Set state for form inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set modal reference for opening/closing modal
  const modalRef = useRef<HTMLDialogElement>(null);

  // Function to open modal
  const openModal = () => modalRef.current?.showModal();

  // Function to handle form submission
  const handleSubmit = async () => {
    const response = await fetch(`${env.apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    // Response data
    const data = await response.json();

    // Open confirmation modal
    alert(data.message);
  };
  return (
    <>
      <button onClick={openModal} className="btn btn-primary">
        Sign Up
      </button>
      <dialog ref={modalRef} className="modal text-base-content">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost font-bold absolute top-2 right-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center">Sign Up to continue</h3>
          <p className="py-4 text-center">
            Create a free account to book and manage your culinary experiences in New Verdania.
          </p>
          <p className="text-center  pb-4">
            Already have an account? <a className="link">Log in</a>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full outline-0"
              value={form.name}
              onChange={e =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full outline-0"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full outline-0"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input w-full outline-0"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
            />
            <button className="btn btn-primary">Register</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Register;
