import { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';
import Toast from './Toast';


const Settings = () => {
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const fetchUserSettings = async () => {
        if (!user) throw new Error("No user found");
        const response = await fetch(`/api/getUserSettings?userEmail=${user.email}`);
        if (!response.ok) throw new Error("Failed to fetch user settings");
        return response.json();
      };

      const updateSettingsMutation = useMutation(
        async (newSettings:any) => {
          const response = await fetch('/api/updateUserSettings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: user?.email,
              settings: newSettings,
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update settings');
          }
      
          return response.json();
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['userSettings', user?.email]);
            showToast(
                <>
                  <span className="inline-block mr-2 bg-success rounded-full" style={{ width: '10px', height: '10px' }}></span>
                  Settings updated
                </>
              );
          },
        }
      );
      
      const handleSave = () => {
        const newSettings = {
          learnSteps: (document.getElementById('learnSteps') as HTMLInputElement)?.value,
          relearnSteps: (document.getElementById('relearnSteps') as HTMLInputElement)?.value,
          graduatingInterval: parseInt((document.getElementById('graduatingInterval') as HTMLInputElement)?.value, 10),
          easyInterval: parseInt((document.getElementById('easyInterval') as HTMLInputElement)?.value, 10),
          maximumInterval: parseInt((document.getElementById('maximumInterval') as HTMLInputElement)?.value, 10),
          startingEase: parseFloat((document.getElementById('startingEase') as HTMLInputElement)?.value),
          easyBonus: parseFloat((document.getElementById('easyBonus') as HTMLInputElement)?.value),
          intervalModifier: parseFloat((document.getElementById('intervalModifier') as HTMLInputElement)?.value),
        };

        // Validate inputs
        if (!validateSteps(newSettings.learnSteps) || !validateSteps(newSettings.relearnSteps)) {
            showToast("Learning Steps and Relearning Steps must be in the format: number[m or d]. Example: '10m 3d'.");
            return;
        }
        if (!validateNumber(newSettings.graduatingInterval) || !validateNumber(newSettings.easyInterval) || !validateNumber(newSettings.maximumInterval)) {
            showToast("Graduating Interval, Easy Interval, and Maximum Interval must be numbers.");
            return;
        }
        if (!validateDecimal(newSettings.startingEase) || !validateDecimal(newSettings.easyBonus) || !validateDecimal(newSettings.intervalModifier)) {
            showToast("Starting Ease, Easy Bonus, and Interval Modifier must be decimal numbers.");
            return;
        }
      
        // If all validations pass, proceed to mutate
        updateSettingsMutation.mutate(newSettings);
      };
      
      const { isLoading, data, error } = useQuery(['userSettings', user?.email], fetchUserSettings, {
        enabled: !!user, 
    })

    const showToast = (message: any) => {
        setToastMessage(message);
        setIsToastVisible(true);
        setTimeout(() => setIsToastVisible(false), 3000); // Hide after 3 seconds
    };

    // Validation for Learning Steps and Relearning Steps
    const validateSteps = (value: any) => /^[0-9]+[md](\s+[0-9]+[md])*$/i.test(value);

    // Validation for numeric fields (Graduating Interval, Easy Interval, Maximum Interval)
    const validateNumber = (value: any) => /^\d+$/.test(value);

    // Validation for decimal fields (Starting Ease, Easy Bonus, Interval Modifier)
    const validateDecimal = (value: any) => /^\d+(\.\d+)?$/.test(value);

    if (error) return <div>Error: {(error as Error).message}</div>;
    if (isLoading || !data) {
      return (
        <div className="flex justify-center items-center h-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-white animate-spin dark:text-base_100 fill-load"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  return (
    <div className="bg-white dark:bg-base_100 border border-feintwhite dark:border-divide p-6 rounded-lg max-w-md mx-auto my-10">
      {/* Card 1 */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-2 text-neutral dark:text-white">New Cards</h2>
        <hr className="mb-4 text-feintwhite dark:text-divide"/>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Learning Steps</label>
            <input id="learnSteps" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.learnSteps}/>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Graduating Interval</label>
            <input id="graduatingInterval" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.graduatingInterval}/>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Easy Interval</label>
            <input id="easyInterval" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.easyInterval}/>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-2 text-neutral dark:text-white">Lapses</h2>
        <hr className="mb-4 text-feintwhite dark:text-divide"/>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Relearning Steps</label>
            <input id="relearnSteps" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.relearnSteps}/>
          </div>

        </div>
      </div>

      {/* Card 3. The Save button will be here since it's the last card */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-2 text-neutral dark:text-white">Advanced</h2>
        <hr className="mb-4 text-feintwhite dark:text-divide"/>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Maximum Interval</label>
            <input id="maximumInterval" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.maximumInterval}/>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Starting Ease</label>
            <input id="startingEase" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.startingEase}/>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Easy Bonus</label>
            <input id="easyBonus" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.easyBonus}/>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-neutral dark:text-white">Interval Modifier</label>
            <input id="intervalModifier" type="text" className="border border-neutral dark:border-transparent p-2 rounded" defaultValue={data.intervalModifier}/>
          </div>
          <div className="flex justify-end items-center">
            <button onClick={handleSave} className="inline-flex justify-center items-center gap-x-3 text-center bg-blue text-neutral text-lg font-medium rounded-md focus:ring-1 py-3 px-8 transition-transform duration-200 hover:scale-95">Save</button>
          </div>
        </div>
      </div>
      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  );
};

export default Settings;