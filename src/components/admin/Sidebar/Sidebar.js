import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/images/svgImages/logo.svg';
import SidebarLinkGroup from './SidebarLinkGroup';
import DashboardSvgIcon from '../Icon/DashboardSvgIcon';
import UserSvgIcon from '../Icon/UserSvgIcon';
import SettingsSvgIcon from '../Icon/SettingsSvgIcon';

import { NavLink } from 'react-router-dom';



const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	// const [pathname, setPathname] = useState(window.location.pathname);
	let pathname = window.location.pathname
	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
	);

	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
				return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector('body')?.classList.add('sidebar-expanded');
		} else {
			document.querySelector('body')?.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);


	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
		>
			<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
				<NavLink to="/">
					<img src={Logo} alt="Logo" />
				</NavLink>
			</div>

			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				{/* Sidebar Menu */}
				<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
					{/* Menu Group */}
					<div>
						<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

						<ul className="mb-6 flex flex-col gap-1.5">

							<li>
								<NavLink
									to="/calendar"
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
									${(pathname === '/' || pathname.includes('dashboard')) &&
										'bg-graydark dark:bg-meta-4'
										}`}
								>
									<DashboardSvgIcon />
									Dashboard
								</NavLink>
							</li>


							<SidebarLinkGroup activeCondition={pathname.includes('user-management')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('user-management')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<UserSvgIcon />
												User Management
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
													<li>
														<NavLink to="/user-management/departments" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Departments
														</NavLink>
													</li>

													<li>
														<NavLink to="/user-management/roles" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Roles
														</NavLink>
													</li>

													<li>
														<NavLink to="/user-management/users" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Users
														</NavLink>
													</li>

													<li>
														<NavLink to="/user-management/vendors" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Vendors
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activeCondition={pathname.includes('material-management')}							>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('material-management')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<DashboardSvgIcon />
												Raw Materials
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
													<li>
														<NavLink to="/material-management/material-type" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Materials Type
														</NavLink>
													</li>

													<li>
														<NavLink to="/material-management/materials" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Materials
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activeCondition={pathname.includes('requisitions-management')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('requisitions-management')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<DashboardSvgIcon />
												Requisitions
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
													<li>
														<NavLink to="/requisitions-management/requisitions" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Requisitions List
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activeCondition={pathname.includes('/order-management')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('order-management')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<DashboardSvgIcon />
												Order Management
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
													<li>
														<NavLink to="/order-management/purchase-orders" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Purchase Order
														</NavLink>
													</li>

													<li>
														<NavLink to="/order-management/received-orders" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Received Order List
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activeCondition={pathname.includes('productions-management')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('productions-management')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<DashboardSvgIcon />
												Productions
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
													<li>
														<NavLink to="/productions-management/productions" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Productions
														</NavLink>
													</li>

													<li>
														<NavLink to="/productions-management/production-plant" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Production plant
														</NavLink>
													</li>

												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activeCondition={pathname.includes('product-management')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('product-management')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<DashboardSvgIcon />
												Product Management
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
													<li>
														<NavLink to="/product-management/products" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Product
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activeCondition={pathname.includes('settings')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to="#"
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
												${(pathname.includes('settings')) &&
													'bg-graydark dark:bg-meta-4'
													}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded
														? handleClick()
														: setSidebarExpanded(true);
												}}
											>
												<SettingsSvgIcon />
												Settings
												<svg className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd" clipRule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill="" />
												</svg>
											</NavLink>
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

													<li>
														<NavLink to="/settings/checklist" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Check Lists
														</NavLink>
													</li>


													<li>
														<NavLink to="/settings/units" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Units
														</NavLink>
													</li>

													<li>
														<NavLink to="/settings/warehouse" className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}>
															Warehouse
														</NavLink>
													</li>


												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>



						</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
