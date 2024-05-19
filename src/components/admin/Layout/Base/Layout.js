import { useState } from 'react';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import SectionHeader from '../../SectionHeader/SectionHeader';

const Layout = ({ children, title, buttonText, onButtonClick }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="dark:bg-boxdark-2 dark:text-bodydark">
			<div className="flex h-screen overflow-hidden">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<main>
						<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
							<div className="grid grid-cols-1 gap-1 sm:grid-cols-1 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
								<div className="flex flex-col gap-1">
									<div className="rounded-sm  p-10">
										<SectionHeader title={title} buttonText={buttonText} onButtonClick={onButtonClick} />
										{children}
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
