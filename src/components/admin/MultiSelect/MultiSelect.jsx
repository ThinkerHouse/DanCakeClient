import React from 'react'
import Select from 'react-select';
import { DropdownArrow } from '../../../assets/images/svgImages/';


export const MultiSelect = ({ required = false, label, selectedOptions, optionsData, placeholder, setSelectedOptions, isDisabled }) => {
	/// --- react select dropdown package --- ///
	const IndicatorSeparator = () => {
		return null;
	};

	const DropdownIndicator = () => {
		return null;
	};

	return (
		<div>
			<label className="mb-2.5 block text-black dark:text-white">{label}</label>
			<Select
				required={required}
				onChange={(selectedOption) => {
					setSelectedOptions(selectedOption);
				}}
				options={optionsData}
				value={selectedOptions}
				placeholder={
					<div className="flex justify-between items-center">
						<p>{placeholder}</p>

						<DropdownArrow />
					</div>
				}
				className="w-full text-left custom-select"
				isMulti
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: 'black',
					},
				})}
				isDisabled={isDisabled}
				components={{ IndicatorSeparator, DropdownIndicator }}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						paddingTop: '5px',
						paddingBottom: '5px'
					}),
				}}
			/>
		</div>
	)
}
