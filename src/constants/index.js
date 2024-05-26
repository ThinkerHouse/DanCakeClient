const activeStatusOptions = [
	{ value: 1, label: 'Active' },
	{ value: 0, label: 'Inactive' },
];

const approveOptions = [
	{ value: 1, label: 'Approved' },
	{ value: 0, label: 'Not Approved' },
];

const currentYear = new Date().getFullYear();
const years = Array.from(
	{ length: currentYear - 1900 + 1 },
	(_, index) => 1900 + index
).reverse();
const yearOptions = years.map((year) => ({
	value: year,
	label: `${year}`,
}));

const userTypeOptions = [
	{ label: 'Vendor', value: 'vendor' },
	{ label: 'Administrator', value: 'administrator' },
];

const checkListTypeOptions = [
	{ label: 'Common', value: 'common' },
	{ label: 'Raw', value: 'raw' },
	{ label: 'Finish', value: 'finish' },
]

const storageTypeOptions = [
	{ label: 'Cold Storage', value: 'cold_storage' },
	{ label: 'Regular', value: 'regular' }
]


const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
];

const receivedOrderStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'quarantine', label: 'Quarantine' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
];

const wastageFromOptions = [
    { value: 'production', label: 'Production' },
    { value: 'finish_good', label: 'Finish Good' },
];

const wastageTypeOptions = [
    { value: 'actual', label: 'Actual' },
    { value: 'overflow', label: 'Overflow' },
];

const countryOptions = [{ value: 1, label: 'Bangladesh' }];

export {
	statusOptions,
	activeStatusOptions,
	approveOptions,
	yearOptions,
	userTypeOptions,
	countryOptions,
	checkListTypeOptions,
	storageTypeOptions,
	receivedOrderStatusOptions,
	wastageFromOptions,
	wastageTypeOptions
};
