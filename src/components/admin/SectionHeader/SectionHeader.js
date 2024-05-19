import React from 'react';

const SectionHeader = ({ title, buttonText, onButtonClick }) => {


	return (
		<div className="flex justify-between items-center py-4 px-6.5">
			<h4 className="text-title-md2 font-semibold text-black dark:text-white">{title}</h4>

			{buttonText && (
				<button className="border-primary text-primary py-2 px-8 rounded-md border text-gray font-medium rounded" onClick={onButtonClick}>
					{buttonText}
				</button>
			)}
		</div>
	);
};

export default SectionHeader;
