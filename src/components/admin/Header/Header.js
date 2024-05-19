import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/admin/admin_logo.png';
import DropdownUser from './DropdownUser.js';
import SidebarToggleButton from './SidebarToggleButton.js';
import DropdownNotification from './DropdownNotification';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props) => {
	const handleSidebarToggle = (e) => {
		e.stopPropagation();
		props.setSidebarOpen(!props.sidebarOpen);
	};

	return (
		<header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
			<div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
				<div className="flex items-center gap-2 sm:gap-4 lg:hidden">
					<SidebarToggleButton
						sidebarOpen={props.sidebarOpen}
						onClick={(e) => handleSidebarToggle(e)}
					/>
					<Link className="block flex-shrink-0" to="/">
						<img src={Logo} alt="Admin Panel" width={140} />
					</Link>
				</div>

				<div></div>

				<div className="flex items-center gap-3 2xsm:gap-7">
					<ul className="flex items-center gap-2 2xsm:gap-4">
						<DarkModeSwitcher />
						<DropdownNotification />
					</ul>
					<DropdownUser />
				</div>
			</div>
		</header>
	);
};

export default Header;
