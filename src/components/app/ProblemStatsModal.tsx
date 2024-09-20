import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProblemStatsModal = ({ isOpen, onClose, problem }: { isOpen: boolean, onClose: () => void, problem: any }) => {
  if (!isOpen || !problem) return null;

  const data = {
    labels: ['Again', 'Hard', 'Good', 'Easy'],
    datasets: [
      {
        data: [problem.againCount, problem.hardCount, problem.goodCount, problem.easyCount],
        backgroundColor: ['#FF395F', '#FFBF1A', '#87cf3a', '#59FF00'],
        borderColor: ['#FF395F', '#FFBF1A', '#87cf3a', '#59FF00'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right' as 'right' | 'left' | 'top' | 'bottom',
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatInterval = (interval: number) => {
    return `${Math.round(interval / (60 * 24))} days`;
  };

  const isDataEmpty = data.datasets[0].data.every((value) => value === 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-base_100 bg-opacity-50">
      <div className="bg-[#1E1E20] p-6 rounded-lg shadow-lg w-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-primary text-lg font-bold">{problem.name}</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-secondary">Created</p>
              <p className="text-primary">{formatDate(problem.creationDate)}</p>
            </div>
            <div>
              <p className="text-secondary">Next Due</p>
              <p className="text-primary">{formatDate(problem.dueDate)}</p>
            </div>
            <div>
              <p className="text-secondary">Difficulty</p>
              <p className="text-primary">{problem.difficulty}</p>
            </div>
            <div>
              <p className="text-secondary">Type</p>
              <p className="text-primary">{problem.type}</p>
            </div>
            <div>
              <p className="text-secondary">Ease Factor</p>
              <p className="text-primary">{problem.ease.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-secondary">Current Interval</p>
              <p className="text-primary">{formatInterval(problem.interval)}</p>
            </div>
            <div>
              <p className="text-secondary">Relearn Interval</p>
              <p className="text-primary">{formatInterval(problem.relearnInterval)}</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <h3 className="text-primary text-center mr-20">Feedback Breakdown:</h3>
              {isDataEmpty ? (
                <p className="text-secondary text-center">(No data yet)</p>
              ) : (
                <Pie data={data} options={options} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatsModal;