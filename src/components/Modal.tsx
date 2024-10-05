import './Modal.css';

interface P {
  isOpen: boolean;
  title: string;
  showOkButton: boolean;
  showCancelButton: boolean;
  onOk: () => void;
  onCancel: () => void;
  children: JSX.Element;
}

export default function Modal(props: P) {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{props.title}</h3>
          <button className="close-button" onClick={props.onCancel}>
            x
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          {props.showCancelButton && (
            <button className="modal-button cancel-button" onClick={props.onCancel}>
              Cancel
            </button>
          )}
          {props.showOkButton && (
            <button className="modal-button ok-button" onClick={props.onOk}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
