import React, { useState, useContext } from 'react';
import { useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';
import { auth } from '../../firebaseConfig'; 
import Toast from './Toast';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionId: number;
}

const ImportModal = ({ isOpen, onClose, collectionId }: ImportModalProps) => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [slug, setSlug] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  if (!isOpen) return null;

  const showToast = (message: any) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 5000);
  };

  const handleImport = async () => {
    try {
      setIsImporting(true);

      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch('/api/importFromLeetcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          slug: slug.trim(),
          collectionId
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to import problems');
      }

      const result = await response.json();

      // Call updateCollectionCounts endpoint after successful import
      const updateResponse = await fetch('/api/updateCollectionCounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collectionId: collectionId }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update collection counts');
      }

      onClose();
      
      // Match the same invalidations as ProblemModal
      queryClient.invalidateQueries(['collectionDetails']);
      queryClient.invalidateQueries(['problemDetails']);
      queryClient.invalidateQueries(['allProblems', user?.email]);
      queryClient.invalidateQueries(['dueTodayProblems', user?.email]);
      queryClient.invalidateQueries(['userSettings', user?.email]);
      queryClient.invalidateQueries(['collectionProblems', collectionId]);
      queryClient.invalidateQueries(['collections', user?.email]);

    } catch (error: any) {
      console.error('Import error:', error);
      showToast(
        <>
          <span className="inline-block mr-2 bg-error rounded-full" style={{ width: '10px', height: '10px' }}></span>
          {error.message}
        </>
      );
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-base_100 bg-opacity-50">
      <div className="relative w-[500px] bg-[#1E1E20] rounded-lg shadow-lg p-6 modalBounceFadeIn">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-secondary hover:text-primary transition duration-150 ease-in-out"
        >
          <span className="material-icons">close</span>
        </button>

        <div className="mb-6">
          <h2 className="text-secondary text-xl font-semibold mb-2">
            Import Leetcode List
          </h2>
          <p className="text-secondary text-sm mb-4">
            Enter the slug of any public Leetcode list, then press Import to add all the problems and their details from that list to this collection.
          </p>

          <p className="text-warning text-sm mb-4">
            Note: The problems that you import will be spaced out accordingly for Study Mode: they will not all be due on the same day, even though they are being uploaded on the same day.
          </p>

          <p 
            className="text-link underline cursor-help relative text-sm inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            How do I find the slug of a public list?
            {isHovering && (
              <img 
                src="/slug.png" 
                alt="Slug example"
                className="absolute -right-[290px] -top-[270px] w-[600px] aspect-auto rounded-md shadow-lg z-50 transform scale-100"
                style={{ maxWidth: 'none' }}
              />
            )}
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter slug"
            className="w-full px-4 py-2 bg-base_100 border border-divide text-secondary rounded-md focus:outline-none focus:border-blue transition-colors duration-300"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleImport}
            disabled={!slug.trim() || isImporting}
            className={`
              px-8 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
              ${!slug.trim() || isImporting
                ? 'bg-disabled text-disabledText cursor-not-allowed'
                : 'bg-pop text-neutral hover:bg-opacity-90'}
            `}
          >
            {isImporting ? (
              <>
                <span className="material-icons animate-spin text-xl">sync</span>
                Importing...
              </>
            ) : (
              'Import'
            )}
          </button>
        </div>
      </div>
      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  );
};

export default ImportModal; 