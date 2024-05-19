import React from 'react';
import DataTable from 'react-data-table-component';
import SearchForm from '../Search';

const Table = ({ columns, data, totalCount, handlePageChange, defaultPage, searchFields, handleFieldSearch, handleFilterClick, handleClearSearch, searchParam }) => {
	const customStyles = {
		headCells: {
			style: {
				fontSize: '14px',
				fontWeight: 'bold',
			},
		},
		cells: {
			style: {
				fontSize: '13px',
			},
		},
	};

	return (
		<>
			{searchFields && (
				<SearchForm
					searchFields={searchFields}
					handleFieldSearch={handleFieldSearch}
					handleFilterClick={handleFilterClick}
					searchParam={searchParam}
					handleClearSearch={handleClearSearch}
				/>
			)}

			<DataTable
				columns={columns}
				data={data}
				paginationPerPage={10}
				pagination
				paginationServer
				paginationTotalRows={totalCount}
				onChangePage={handlePageChange}
				striped
				responsive={true}
				paginationDefaultPage={defaultPage}
				customStyles={customStyles}
			/>
		</>
	);
};

export default Table;
