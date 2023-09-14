// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     useReactTable
// } from '@tanstack/react-table'

// export default function Table({ columns: userColumns, data }) {
//     console.log(userColumns,
//         data,"data");
//     const table = useReactTable({
//         data : data?.addVariant,
//         columns :userColumns,
//         getCoreRowModel: getCoreRowModel()
//     })
//   console.log(table,"table");
//     return (
//       <>
//      <table className='table'>
//                     <thead>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <tr key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => (
//                                     <th
//                                         // className={`text-left ${excludes.includes(header.id)? Style["nofilter"]:""}`}
//                                         key={header.id}
//                                         // onClick={() => {
//                                         //     if (!excludes.includes(header.id)) {
//                                         //         setFilter((pre) => {
//                                         //             if (
//                                         //                 pre.sortKey ===
//                                         //                 header.id
//                                         //             ) {
                                                        
//                                         //                 return {
//                                         //                     ...pre,
//                                         //                     sortBy:
//                                         //                         pre.sortBy === 1
//                                         //                             ? -1
//                                         //                             : 1
//                                         //                 }
//                                         //             }
//                                         //             return {
//                                         //                 ...pre,
//                                         //                 sortKey: header.id,
//                                         //                 sortBy: 1
//                                         //             }
//                                         //         })
//                                         //         if (typeof getfilter === "function") {
//                                         //             getfilter(
//                                         //                 filter.sortKey === header.id
//                                         //                     ? {
//                                         //                           ...filter,
//                                         //                           sortBy:
//                                         //                               filter.sortBy ===
//                                         //                               1
//                                         //                                   ? -1
//                                         //                                   : 1
//                                         //                       }
//                                         //                     : {
//                                         //                           ...filter,
//                                         //                           sortKey:
//                                         //                               header.id,
//                                         //                           sortBy: 1
//                                         //                       }
//                                         //             )
//                                         //         }
                                              
//                                         //     }
//                                         // }}
//                                     >
//                                         {header.isPlaceholder
//                                             ? null
//                                             : flexRender(
//                                                   header.column.columnDef
//                                                       .header,
//                                                   header.getContext()
//                                               )}
//                                         {/* <span>
//                                             {filter.sortBy !== '' &&
//                                             filter.sortKey !== '' &&
//                                             filter.sortKey === header.id ? (
//                                                 filter.sortBy === 1 ? (
//                                                     <>&uarr;</>
//                                                 ) : (
//                                                     <>&darr;</>
//                                                 )
//                                             ) : (
//                                                 ''
//                                             )} */}
//                                         {/* </span> */}
//                                     </th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     {  (
//                      (
//                             <>
//                                 <tbody>
//                                     {table.getRowModel().rows.map((row) => (
//                                         <tr key={row.id}>
//                                             {row
//                                                 .getVisibleCells()
//                                                 .map((cell) => (
//                                                     <td
//                                                         className="text-left"
//                                                         key={cell.id}
//                                                     >
//                                                         {flexRender(
//                                                             cell.column
//                                                                 .columnDef.cell,
//                                                             cell.getContext()
//                                                         )}
//                                                     </td>
//                                                 ))}
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </>
//                         )
//                     )}
//                 </table>
//       </>
//     )
//   }



import React from 'react'
import {createColumnHelper,flexRender,getCoreRowModel, useReactTable} from '@tanstack/react-table'

const TableListing = ({table}) => {
  return (
   <>
         <table className='table'>
            <thead>
            {table?.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup?.headers?.map((header) => (
                                <th
                                    key={header?.id}
                                    // align="center"
                                    colSpan={header?.colSpan}
                                    // className={`${
                                    //     header?.column?.id ===
                                    //     'thoughtDescription'
                                    //         ? 'active'
                                    //         : ''
                                    // }`}
                                >
                                    {header?.isPlaceholder ? null : (
                                        <div
                                            // onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header?.column?.columnDef?.header,
                                                header?.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽'
                                            }[header?.column?.getIsSorted()] ??
                                                null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
            </thead>
            <tbody>
            {table?.getRowModel()?.rows?.map((row) => {
                        return (
                            <tr key={row?.id}>
                                {row?.getVisibleCells()?.map((cell) => {
                                    return (
                                        <td
                                            key={cell?.id}
                                            // align="center"
                                            className={`${
                                                cell?.column?.id ===
                                                'thoughtDescription'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                        >
                                            {flexRender(
                                                cell?.column?.columnDef?.cell,
                                                cell?.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
   </>
  )
}

export default React.memo(TableListing)