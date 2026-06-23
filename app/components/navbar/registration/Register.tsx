/* Registration modal component */
"use client";
import React, { useState, useRef } from "react";

import { env } from "@/lib/env";
import TurnstileCaptcha from "./TurnstileCaptcha";

type RegisterProps = {
  id: string;
};

const Register = ({ id }: RegisterProps) => {
  // Set state for captcha token
  const [captchaToken, setCaptchaToken] = useState<string>("");

  // Set state for form inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set state for valid fields
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set state for sumbission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set state for registration modal being open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Password validation function
  const validatePassword = (password: string): string => {
    if (password.length < 12) {
      return "Password must be at least 12 characters long";
    }
    if (password.length > 128) {
      return "Password cannot exceed 128 characters";
    }
    return "";
  };

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      capcha: "",
    };

    // Check for empty name field
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Check for empty email field and correct email format
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    // Check for empty password field and validate password strength
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = validatePassword(form.password);
    }

    // Check that password confirmation matches password
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === "");
  };

  // Set modal reference for opening/closing modal
  const modalRef = useRef<HTMLDialogElement>(null);

  // Function to open modal
  const openModal = () => {
    setIsOpen(true);
    modalRef.current?.showModal();
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Set submission status to true to disable form and show loading state
    setIsSubmitting(true);

    if (!captchaToken) {
      alert("Please complete the CAPTCHA challenge");
      setIsSubmitting(false);
      return;
    }

    // Validate form inputs
    const valid = validateForm();
    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    try {
      // const response = await fetch(`${env.apiUrl}/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(form),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Registration failed");
      // }
      // // Response data
      // const data = await response.json();

      // // Open confirmation modal
      // console.log(data.message);
      console.log(form);
    } catch (err) {
      console.error("Registration error:", err);
      alert(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
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
              className={`input w-full outline-0 ${errors.name ? "input-error" : ""}`}
              value={form.name}
              onChange={e => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) validateForm();
              }}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
            <label className="label">Email</label>
            <input
              type="email"
              className={`input w-full outline-0 ${errors.email ? "input-error" : ""}`}
              value={form.email}
              onChange={e => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) validateForm();
              }}
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            <label className="label">Password</label>
            <input
              type="password"
              className={`input w-full outline-0 ${errors.password ? "input-error" : ""}`}
              value={form.password}
              onChange={e => {
                setForm({ ...form, password: e.target.value });
                if (errors.password) validateForm();
              }}
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className={`input w-full outline-0 ${errors.confirmPassword ? "input-error" : ""}`}
              value={form.confirmPassword}
              onChange={e => {
                setForm({ ...form, confirmPassword: e.target.value });
                if (errors.confirmPassword) validateForm();
              }}
            />
            {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
            {isOpen && <TurnstileCaptcha onVerify={setCaptchaToken} onExpire={() => setCaptchaToken("")} />}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Register;
