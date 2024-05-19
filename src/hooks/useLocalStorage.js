import React, { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			const valueToStore =
				typeof storedValue === 'function'
					? storedValue(storedValue)
					: storedValue;
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	}, [key, storedValue]);

	const updateStoredValue = (value) => {
		try {
			const newValue =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(newValue);
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, updateStoredValue];
};

export default useLocalStorage;
