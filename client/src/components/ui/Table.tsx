import { Button, Checkbox, Input, Table, TableProps, TextInput } from '@mantine/core';
import React, { useEffect } from 'react';
import { GoPlus } from 'react-icons/go';
import PaginationComponent from './Pagination';
import { CellContext, Column, IPagination, RowContext, TableContext } from './types';
import { getObjValue } from '../../utils/funcs';

export interface DataTableProps {
   data: any[];
   columns: Column[];
   tableHeader?: (tableContext: TableContext) => React.ReactNode;
   pagination?: IPagination;
   paginationPosition?: 'top' | 'bottom' | 'both';
   paginate?: boolean; // default: true
   title?: string | React.ReactNode;
   buttonText?: string | React.ReactNode;
   showHeader?: boolean;
   minWidth?: React.CSSProperties['minWidth'];
   tableProps?: TableProps;
   onPress?: () => void;
}

const DataTable = (props: DataTableProps) => {
   const {
      data,
      columns,
      tableHeader,
      pagination,
      paginate = true,
      title,
      showHeader = true,
      minWidth,
      tableProps,
      buttonText,
      onPress,
   } = props;
   const [_data, setData] = React.useState(data);
   const [globalFilter, setGlobalFilter] = React.useState('');
   const [selectedRows, setSelectedRows] = React.useState<RowContext[]>([]);


   const toggleRow = (row: RowContext) => {
      // console.log('---row---', row);
      const selectedRow = selectedRows.find((r) => JSON.stringify(r.data) === JSON.stringify(row.data));
      if (selectedRow) {
         setSelectedRows(selectedRows.filter((r) => JSON.stringify(r.data) !== JSON.stringify(row.data)));
      } else {
         setSelectedRows([...selectedRows, row]);
      }
   };

   const toggleAllRows = () => {
      if (selectedRows.length === data.length) {
         setSelectedRows([]);
      } else {
         setSelectedRows(data.map((row) => ({ data: row, isSelected: true })));
      }
   };

   const getSelectedRows = () => selectedRows.map((r) => r.data);

   useEffect(() => {
      const filteredData = data.filter((row) => {
         return Object.values(row).some((value) => {
            return String(value).toLowerCase().includes(globalFilter.toLowerCase());
         });
      });
      setData(filteredData);
   }, [data, globalFilter]);

   const tableContext: TableContext = {
      setGlobalFilter,
      globalFilter,
      data,
      getSelectedRows,
   };

   console.log('---selectedRows---', selectedRows);
   const filteredColumns = columns.filter((col) => !col.omit);
   return (
      <div className=" w-full bg-white shadow overflow-hidden p-6 rounded-xl flex flex-col gap-4">
         {showHeader &&
            (tableHeader ? (
               tableHeader(tableContext)
            ) : (
               <div className="flex w-full items-center justify-between">
                  <div className="flex">
                     {typeof title === 'string' ? <h1 className=" font-bold text-2xl">{title}</h1> : title}
                  </div>

                  <div className="flex gap-x-4">
                     {typeof buttonText === 'string' ? (
                        <Button leftSection={<GoPlus />} variant="filled" onClick={onPress}>
                           {props.buttonText}
                        </Button>
                     ) : (
                        buttonText
                     )}
                     <input
                        type="text"
                        placeholder="Search ..."
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                     />
                  </div>
               </div>
            ))}
         <div className="flex w-full pb-5 flex-col overflow-x-scroll">
            <Table stickyHeader style={{ minWidth: minWidth ?? '' }} className=" w-full" {...tableProps}>
               <Table.Thead>
                  <Table.Tr  className='bg-gray-100 h-[50px]'>
                     <Table.Th className=" w-6" align="center">
                        <input
                           type="checkbox"
                           className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                           onChange={toggleAllRows}
                           checked={selectedRows.length === data.length}
                        />
                     </Table.Th>
                     {filteredColumns.map((column, i) => (
                        <Table.Th align={column.align} className="text-gray-800 font-semibold" key={(column.key, i)}>
                           {typeof column.header === 'function' ? column.header(tableContext) : column.header}
                        </Table.Th>
                     ))}
                  </Table.Tr>
               </Table.Thead>
               <Table.Tbody>
                  {_data.map((row, rowIndex) => (
                     <Table.Tr className='h-[50px]' key={rowIndex}>
                        <Table.Td align="center">
                           <input
                              type="checkbox"
                              className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                              checked={selectedRows.some((r) => JSON.stringify(r.data) === JSON.stringify(row))}
                              onChange={() => toggleRow({ data: row, isSelected: false })}
                           />
                        </Table.Td>
                        {columns.map((column, columnIndex) => {
                           const value = column.getValue ? column.getValue(row) : getObjValue(column.key, row);
                           const cellContext: CellContext = {
                              value,
                              row: {
                                 data: row,
                                 isSelected: selectedRows.some((r) => JSON.stringify(r.data) === JSON.stringify(row)),
                              },
                              table: tableContext,
                           };
                           return (
                              <Table.Td key={columnIndex} align={column.align} style={{ textAlign: column.align }}>
                                 {column.cell ? column.cell(cellContext) : value}
                              </Table.Td>
                           );
                        })}
                     </Table.Tr>
                  ))}
                  {_data.length === 0 && (
                     <Table.Tr>
                        <Table.Td colSpan={columns.length + 1}>No data found</Table.Td>
                     </Table.Tr>
                  )}
               </Table.Tbody>
            </Table>
         </div>
         {paginate && <PaginationComponent pagination={pagination} setData={setData} data={data} />}
      </div>
   );
};

export default DataTable;