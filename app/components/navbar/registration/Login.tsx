/* Login modal component */
import React from "react";

type LoginProps = {
  id: string;
};

const Login = ({ id }: LoginProps) => {
  return (
    <>
      <button onClick={() => (document.getElementById(id) as HTMLDialogElement).showModal()} className="btn btn-soft">
        Login
      </button>
      <dialog id={id} className="modal text-base-content">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Login to continue</h3>
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

export default Login;
