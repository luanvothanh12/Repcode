import React from 'react';

const CollectionModal = ({ isOpen, onClose, children }: {isOpen:any, onClose:any, children:any}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
      }}>
        <button onClick={onClose} style={{
          float: 'right',
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          fontSize: '1.5rem',
        }}>×</button>
        {children}
      </div>
    </div>
  );
};

export default CollectionModal; 