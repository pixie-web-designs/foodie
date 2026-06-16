/* Registration modal component */
import React from "react";

type RegisterProps = {
  id: string;
};

const Register = ({ id }: RegisterProps) => {
  return (
    <>
      <button
        onClick={() => (document.getElementById(id) as HTMLDialogElement).showModal()}
        className="btn btn-primary"
      >
        Sign Up
      </button>
      <dialog id={id} className="modal text-base-content">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Sign Up to continue</h3>
          <p className="py-4 text-center">
            Create a free account to book and manage your culinary experiences in New Verdania.
          </p>
          <p className="text-center">
            Already have an account? <a className="link">Log in</a>
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Register;
