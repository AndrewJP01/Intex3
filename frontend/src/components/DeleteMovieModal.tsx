// src/components/DeleteMovieModal.tsx
import { useState } from 'react';
import './ManageMovieModal.css'; // Reuse styles if you want consistency

type Props = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteMovieModal = ({ title, onCancel, onConfirm }: Props) => {
  const [confirmationText, setConfirmationText] = useState('');

  const isValid = confirmationText === 'Delete';

  return (
    <div className="modal-backdrop delete-modal">
      <div className="modal delete-modal">
        <h2>Delete Movie</h2>
        <p>
          Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
        </p>
        <p>Please type <strong>"Delete"</strong> to confirm:</p>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder='Type "Delete"...'
        />
        <div className="apply-button-wrapper" style={{ marginTop: '1rem' }}>
          <button className="btn close" onClick={onCancel}>Cancel</button>
          <button
            className="btn delete"
            disabled={!isValid}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
