// Layout.js
import React from 'react';
import './../../../../index.css';
import logoImage from '../../../../assets/images/web/logo.png';
import { useLocation } from 'react-router-dom';

import './Layout.css';



const Layout = ({ children }) => {
	return (
		<div className="dark:bg-boxdark-2 dark:text-bodydark">
			<div className="flex h-screen justify-center items-center overflow-hidden">
				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<main>
						<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
							{children}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};


export default Layout;
