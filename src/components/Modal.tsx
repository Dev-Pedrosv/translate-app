import React from "react";

interface ModalProps {
  onConfirm: () => void;
}

function Modal(props: ModalProps) {
  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Atenção !</h3>
        <p className="py-4">Confirma a exclusão do card ?</p>
        <div className="modal-action flex justify-between">
          <button
            className="btn bg-red-500 text-white"
            onClick={props.onConfirm}
          >
            Deletar
          </button>
          <button className="btn bg-slate-600 text-white">Cancelar</button>
        </div>
      </form>
    </dialog>
  );
}

export default Modal;
