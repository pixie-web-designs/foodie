/* Registration modal component */
"use client";
import React, { useState, useRef } from "react";

type RegisterProps = {
  id: string;
};

const Register = ({ id }: RegisterProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = () => modalRef.current?.showModal();
  const handleSubmit = async () => {
    const response = await fetch(`${process.env.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

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
            <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center">Sign Up to continue</h3>
          <p className="py-4 text-center">
            Create a free account to book and manage your culinary experiences in New Verdania.
          </p>
          <p className="text-center">
            Already have an account? <a className="link">Log in</a>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="input w-full"
              placeholder="Name"
              value={form.name}
              onChange={e =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button className="btn btn-primary w-64">Register</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Register;
