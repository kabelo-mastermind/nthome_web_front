import React from 'react';
import './ConfirmDelete.css'; // Optional: for unique styling

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="confirm-modal-actions">
          <button className="confirm-cancel-button" onClick={onClose}>Cancel</button>
          <button className="confirm-delete-button" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
