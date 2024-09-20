import { useState, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';
import Toast from './Toast';
import { Tooltip as ReactTooltip } from "react-tooltip";

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
        async (newSettings: any) => {
            const token = await auth.currentUser?.getIdToken();

            if (!token) {
                throw new Error('Authentication token is not available.');
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const response = await fetch('/api/updateUserSettings', {
                method: 'PUT',
                headers: headers,
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
            relearnGraduatingInterval: parseFloat((document.getElementById('relearnGraduatingInterval') as HTMLInputElement)?.value),
            easyInterval: parseInt((document.getElementById('easyInterval') as HTMLInputElement)?.value, 10),
            maximumInterval: parseInt((document.getElementById('maximumInterval') as HTMLInputElement)?.value, 10),
            startingEase: parseFloat((document.getElementById('startingEase') as HTMLInputElement)?.value),
            easyBonus: parseFloat((document.getElementById('easyBonus') as HTMLInputElement)?.value),
            intervalModifier: parseFloat((document.getElementById('intervalModifier') as HTMLInputElement)?.value),
            apiKey: (document.getElementById('apiKey') as HTMLInputElement)?.value,
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
            <div className="flex justify-center items-center h-screen h-full">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-12 h-12 text-base_100 animate-spin dark:text-base_100 fill-load"
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
        <div className="bg-base_100 p-6 max-w-4xl mx-auto my-10">
            <div className="flex flex-wrap gap-12">
                {/* New Cards Section */}
                <div className="flex-1 card">
                    <h2 className="text-lg font-semibold mb-2 text-primary">New Cards</h2>
                    <hr className="mb-4 text-divide" />
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <label className="text-secondary">Learning Steps <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="One or more delays, separated by spaces.<br/>The first delay will be used when you press the Again button on a new problem.<br/>The Good button will advance to the next step.<br/>Once all steps have been passed, the problem will become a review problem.">help</span></label>
                            <input id="learnSteps" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.learnSteps} />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-secondary">Graduating Interval <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="The number of days to wait before showing a problem again,<br/>after the Good button is pressed on the final learning step.">help</span></label>
                            <input id="graduatingInterval" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.graduatingInterval} />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-secondary">Easy Interval <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="The number of days to wait before showing a problem again,<br/>after the Easy button is used to immediately remove a problem from the learning stage.">help</span></label>
                            <input id="easyInterval" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.easyInterval} />
                        </div>
                    </div>
                </div>

                {/* Lapses Section */}
                <div className="flex-1 card">
                    <h2 className="text-lg font-semibold mb-2 text-primary">Lapses</h2>
                    <hr className="mb-4 text-divide" />
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <label className="text-secondary">Relearning Steps <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="Like the learning steps, except this is specifically for pressing<br/> the Again button on a review problem, making it enter the <br/> relearning stage and it now has to go through these relearning <br/>steps before becoming a review problem again.">help</span></label>
                            <input id="relearnSteps" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.relearnSteps} />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-secondary">New Interval <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="The multiplier applied to a review interval when answering Again.">help</span></label>
                            <input id="relearnGraduatingInterval" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.relearnGraduatingInterval} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Section and Save Button */}
            <div className="flex flex-wrap gap-8 mt-8">
              <div className="flex flex-wrap gap-8 mt-8">
              <div className="flex-1 card">
                <h2 className="text-lg font-semibold mb-2 text-primary">Advanced</h2>
                <hr className="mb-4 text-divide" />
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 items-center">
                    <label className="text-secondary">
                      Maximum Interval <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="The maximum number of days a review problem can go into the future.<br/>The shorter you set this, the greater your workload will be.">help</span>
                    </label>
                    <input id="maximumInterval" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.maximumInterval} />
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <label className="text-secondary">
                      Starting Ease <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="The default ease multiplier new problems start with.">help</span>
                    </label>
                    <input id="startingEase" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.startingEase} />
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <label className="text-secondary">
                      Easy Bonus <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="An extra multiplier that is applied to a review problem's interval when you rate it Easy.">help</span>
                    </label>
                    <input id="easyBonus" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.easyBonus} />
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <label className="text-secondary">
                      Interval Modifier <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="This multiplier is applied to all problems.<br/>Use it to make the algorithm more or less aggressive.">help</span>
                    </label>
                    <input id="intervalModifier" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue={data.intervalModifier} />
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <label className="text-secondary">
                      OpenAI API Key <span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="Enter your OpenAI API key here to use the Check With AI feature.">help</span>
                    </label>
                    <input id="apiKey" type="text" className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300" defaultValue="[Hidden]" />
                  </div>
                </div>
              </div>
            </div>

                <div className="flex items-end">
                    <button onClick={handleSave} className="inline-flex justify-center items-center gap-x-3 text-center bg-pop text-neutral text-lg font-medium rounded-md focus:ring-1 py-3 px-8 transition-transform duration-200 hover:scale-95">Save</button>
                </div>
                <ReactTooltip
                    id="my-tooltip-1"
                    place="bottom"
                    style={{ backgroundColor: "#111111" }}
                />
            </div>
            <Toast message={toastMessage} isVisible={isToastVisible} />
        </div>
    );
};

export default Settings;