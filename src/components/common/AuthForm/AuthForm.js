import React from 'react';

const AuthForm = ({
	formik,
	error,
	formBlock,
	buttonText,
}) => {
	return (
		<form className="w-full" onSubmit={formik.handleSubmit}>
			{formBlock}
			<div className="mb-14">
				<button
					type="submit"
					className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
				>
					{buttonText}
				</button>
			</div>
			
		</form>
	);
};

export default AuthForm;
