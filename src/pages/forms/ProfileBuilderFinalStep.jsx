const ProfileBuilderFinalStep = () => {
    return (
        <>
            <div>
                <StepCounter step={2} />
            </div>
            <div id="form-container" className="flex flex-col gap-4">
                <div class="flex flex-col">
                    <label>Website</label>
                    <div class="bg-gray-500 p-2 rounded-xl">
                        <span class="text-gray-400">https://</span>
                        <input name="website" type="url" class="bg-gray-500 focus:outline-none text-white" />
                    </div>
                </div>
            </div>
        </>
    );
};


export default ProfileBuilderFinalStep;
