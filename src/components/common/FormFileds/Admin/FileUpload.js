import React, { useState, useEffect } from 'react';
import FileUploadSvgIcon from '../../../admin/Icon/FileUploadSvgIcon';

const FileUpload = ({ formik, id, multiple = false, brand, isDisabled = false }) => {
	const [preview, setPreview] = useState(null);

	useEffect(() => {
		if (formik.values.image) {
			if (
				Array.isArray(formik.values.image) &&
				formik.values.image.length > 0
			) {
				// Display the preview of the first image in the array
				setPreview(URL.createObjectURL(formik.values.image[0]));
			} else if (typeof formik.values.image === 'string') {
				// Display the preview of the single image (if it's a string)
				setPreview(`${formik.values.image}`);
			}
		} else {
			setPreview(null);
		}
	}, [formik.values.image]);

	const handleFileChange = (e) => {
		const files = e.target.files;

		if (files && files.length > 0) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				formik.setFieldValue('image', Array.from(files)); // Convert files to an array
			};
			reader.readAsDataURL(files[0]);
		}
	};

	return (
		<div
			id="FileUpload"
			className="relative mb-15 block w-full cursor-pointer border-2 border-dashed border-stroke bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
		>
			<input
				type="file"
				id={id}
				name={id}
				// value={formik.values[id]}
				disabled={isDisabled ? true : false}
				onBlur={formik.handleBlur}
				accept="image/*"
				className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
				onChange={handleFileChange}
				multiple={multiple}
			/>
			<div className="flex flex-col items-center justify-center space-y-3">
				{preview && (
					<div className="w-full h-40 overflow-hidden flex items-center justify-center">
						<img
							src={preview}
							alt="Preview"
							className="object-contain w-1/3 h-full"
						/>
					</div>
				)}
				{!preview && (
					<span className="flex h-10 w-10 items-center justify-center border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
						<FileUploadSvgIcon />
					</span>
				)}
				{
					!isDisabled && <p>
						<span className="text-primary">Click to upload</span> or drag and drop
					</p>
				}
				{
					!isDisabled && <><p className="my-1">PNG, JPG, JPEG </p>
						{brand && <p className="">Image size should be 105 x 105 pixels.</p>}
						{formik.touched.image && formik.errors.image && (
							<p className="text-sm text-[#F87171] mt-1">{formik.errors.image}</p>
						)}</>
				}

			</div>
		</div>
	);
};

export default FileUpload;
