/* Registration modal component */
import React from "react";

type ModalProps = {
  id: string;
};

const RegisterModal = ({ id }: ModalProps) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Sign Up to continue</h3>
        <p className="py-4"></p>
      </div>
    </dialog>
  );
};

export default RegisterModal;
