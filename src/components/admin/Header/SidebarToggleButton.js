import React from 'react';

const SidebarToggleButton = ({ sidebarOpen, onClick }) => {
	return (
		<button
			type="button"
			aria-controls="sidebar"
			onClick={onClick}
			className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
		>
			<span className="relative block h-5.5 w-5.5 cursor-pointer">
				<span className="du-block absolute right-0 h-full w-full">
					{[0, 1, 2].map((index) => (
						<span
							key={index}
							className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-${index * 50} duration-200 ease-in-out dark:bg-white ${!sidebarOpen && `!w-full delay-${index * 150 + 300}`
								}`}
						/>
					))}
				</span>
				<span className="absolute right-0 h-full w-full rotate-45">
					{[0, 1].map((index) => (
						<span
							key={index}
							className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-${index * 100 + 300} duration-200 ease-in-out dark:bg-white ${!sidebarOpen && `!h-0 !delay-${index * 200}`
								}`}
						/>
					))}
				</span>
			</span>
		</button>
	);
};

export default SidebarToggleButton;
