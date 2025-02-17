import React from 'react';

const ActionButton = ({ row, onEdit, showViewButton = true, showDeleteButton = true, showEditButton = true, onDelete, onView }) => {
	return (
		<div className="flex space-x-2">
			{showViewButton && (
				<button
					onClick={() => onView(row?.id)}
					className="flex justify-center rounded bg-secondary py-2 px-4 font-medium text-gray hover:bg-opacity-70"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
				</button>
			)}

			{showEditButton && (
				<button
					onClick={() => onEdit(row.id)}
					className="flex justify-center rounded bg-cyanBg py-2 px-4 font-medium text-gray hover:bg-opacity-70"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
					</svg>
				</button>
			)}
			{showDeleteButton && (
				<button
					onClick={() => onDelete(row.id)}
					className="flex justify-center rounded bg-danger py-2 px-4 font-medium text-gray hover:bg-opacity-70"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default ActionButton;
