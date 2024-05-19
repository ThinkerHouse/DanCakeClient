import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserOne from '../../../assets/images/admin/user-01.png';
import LogOutSvgIcon from '../Icon/LogOutSvgIcon';
import UserSvgIcon from '../Icon/UserSvgIcon';
import DropdownSvgIcon from '../Icon/DropdownSvgIcon';

const DropdownUser = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const trigger = useRef(null);
	const dropdown = useRef(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!dropdown.current) return;
			if (
				!dropdownOpen ||
				dropdown.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setDropdownOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	}, [dropdownOpen]);

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	}, [dropdownOpen]);

	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen);
	};

	return (
		<div className="relative">
			<Link
				ref={trigger}
				onClick={handleDropdownToggle}
				className="flex items-center gap-4"
				to="#"
				aria-haspopup="true"
				aria-expanded={dropdownOpen}
			>
				<span className="hidden text-right lg:block">
					<span className="block text-sm font-medium text-black dark:text-white">
						Thomas Anree
					</span>
					<span className="block text-xs">UX Designer</span>
				</span>

				<span className="h-12 w-12 rounded-full">
					<img src={UserOne} alt="User" />
				</span>
				<DropdownSvgIcon dropdownOpen={dropdownOpen} />
			</Link>

			<div
				ref={dropdown}
				className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
					}`}
			>
				<ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
					<li>
						<Link
							to="/profile"
							className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
						>
							<UserSvgIcon />
							My Profile
						</Link>
					</li>
				</ul>
				<Link
					to="/logout"
					className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
				>
					<LogOutSvgIcon />
					Logout
				</Link>
			</div>
		</div>
	);
};

export default DropdownUser;