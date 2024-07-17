/* eslint-disable react/prop-types */
const StepCounter = ({step}) => {
  return (
    <div className="flex items-start mt-10 mb-10">
      <div className="bg-blue-500/40 rounded">
        <span className="font-bold text-xs p-2 text-[#768de9]">Step {step}/2</span>
      </div>
    </div>
  );
};

export default StepCounter;
