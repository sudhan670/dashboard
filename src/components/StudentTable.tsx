import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { format } from 'date-fns';

const StudentTable = () => {
  const { students } = useSelector((state: RootState) => state.students);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Student Name',
        accessor: 'name',
      },
      {
        Header: 'Cohort',
        accessor: 'cohort',
      },
      {
        Header: 'Courses',
        accessor: 'courses',
        Cell: ({ value }: { value: string[] }) => value.join(', '),
      },
      {
        Header: 'Date Joined',
        accessor: 'dateJoined',
        Cell: ({ value }: { value: string }) =>
          format(new Date(value), 'dd MMM yyyy'),
      },
      {
        Header: 'Last Login',
        accessor: 'lastLogin',
        Cell: ({ value }: { value: string }) =>
          format(new Date(value), 'dd MMM yyyy'),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              value === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {value}
          </span>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: students }, useSortBy);

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map(headerGroup => {
                  const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...headerGroupProps}>
                      {headerGroup.headers.map(column => {
                        const { key, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                        return (
                          <th
                            key={key}
                            {...columnProps}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {column.render('Header')}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map(row => {
                  prepareRow(row);
                  const { key, ...rowProps } = row.getRowProps();
                  return (
                    <tr key={key} {...rowProps}>
                      {row.cells.map(cell => {
                        const { key, ...cellProps } = cell.getCellProps();
                        return (
                          <td
                            key={key}
                            {...cellProps}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;