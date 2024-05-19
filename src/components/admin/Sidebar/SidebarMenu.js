import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import DropdownSvgIcon from '../Icon/DropdownSvgIcon';


const SidebarMenu = ({ link, label, handleButtonClick, pathname, icon, dynamicItems }) => {
	return (
		<SidebarLinkGroup activeCondition={pathname === link}>
			{(handleClick, open) => (
				<>
					<NavLink
						to={link}
						onClick={(e) => handleButtonClick(e, handleClick)}
						className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === link || pathname.includes(link)) && 'bg-graydark dark:bg-meta-4'}`}
					>
						{icon}
						{label}
						<DropdownSvgIcon dropdownOpen={open} className={"absolute right-4"} />
					</NavLink>

					<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
						<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
							{dynamicItems.map((item) => (
								<li key={item.id}>
									<NavLink to={item.link} className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
										{item.label}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</SidebarLinkGroup>
	);
};

export default SidebarMenu;
