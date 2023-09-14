import React, { useState } from "react";
import { ReactComponent as IconLive } from "../../../../../assets/images/icons/icon-live-green.svg";
import { ReactComponent as IconInProgress } from "../../../../../assets/images/icons/icon-inprogress.svg";
import { ReactComponent as IconInfo } from "../../../../../assets/images/icons/icon-info.svg";
import { ReactComponent as IconDownloadError } from "../../../../../assets/images/icons/icon-download-error.svg";
import { Link } from "react-router-dom";
import TableListing from "../../../../../components/TableListing/TableListing";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { addcatalog, viewcatalog, viewmaincatalog } from "../../../../../config/routingConsts";


function CatalogsUploadData({ ListProductDD ,tabName }) {
  console.log(ListProductDD,"ListProductDD",tabName);
  const transformDataForTable = (data) => {
    console.log(data,"data category view");
    return data?.map((item, index, arr) => ({
      no: index + 1,
      category: item?.mainCategoryName,
      subcategory: item?.categoryName,
      // fileId: item?.id,
      productName:item?.productName,
      createDate: item?.createdDate,
      status: item?.status===1 ? (<p className='status'><IconLive/> Live</p>) 
              :(item?.status===7) ? (<p className='status'> <IconInProgress/> In-Progress</p>)
              :(item?.status===3) ? (<p className='status'><IconInfo/> QC Error</p>)
              : null,
      action: (
        <div className="action-group">
          {item?.status===1 ? 
          // (<Link className="solid-black-btn table-btn" to={`${viewmaincatalog}/${item?.id}`}>View</Link> )
          (<Link className="solid-black-btn table-btn" to={`${viewcatalog}/${item?.id}`} state = "Catalogs Upload">View</Link>) 
              :(item?.status===7) ? ''
              :(item?.status===3) ? (<div className='action-group'>
              <p className='text-red status'><IconDownloadError/> Download Error File</p> 
              <Link className='solid-black-btn table-btn' to={addcatalog}>Upload New File</Link>
          </div>)
              : null}
          {/* <Link className="solid-black-btn table-btn" to={`${viewcatalog}/${item?.id}`} state = "Catalogs Upload">View</Link> */}
          {/* <Link className="solid-black-btn table-btn" to={viewcatalog}>View</Link> */}
        </div>
      ),
    }));
  };

  const columnHelper = createColumnHelper();

  const columns = [

    columnHelper.accessor((row) => row?.no, {
      id: "no",
      header: () => "No.",
    }),
    columnHelper.accessor((row) => row?.category, {
      id: "category",
      header: () => "Category",
    }),
    columnHelper.accessor((row) => row?.subcategory, {
      id: "subcategory",
      header: () => "Sub-Category",
    }),
    // columnHelper.accessor((row) => row?.fileId, {
    //   id: "fileId",
    //   header: () => "File ID",
    // }),
    columnHelper.accessor((row) => row?.productName, {
      id: "productName",
      header: () => "product Name",
    }),
    columnHelper.accessor((row) => row?.createDate, {
      id: "createDate",
      header: () => "Created Date",
    }),
    columnHelper.display({
      id: "status",
      header: () => "QC Status",
      cell : (row) => row?.row?.original?.status
    }),  

    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (row) => row?.row?.original?.action,
    }),
  ];
  const transformedData = transformDataForTable(ListProductDD.data);
  const table = useReactTable({
    data: transformedData || [],
    columns: columns || [],
    // createColumnHelper : getCreateColumnHelper(),
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="catalogs-table">
        {/* <table className='table'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                    <th>File ID</th>
                    <th>Created Date</th>
                    <th>QC Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Women</td>
                    <td>Lehenga</td>
                    <td>18552285585588-Lehenga-10256=-External</td>
                    <td>26-07-2022   03:45 PM</td>
                    <td><p className='status'><IconLive/> Live</p></td>
                    <td><Link className='solid-black-btn table-btn'>View</Link></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Women</td>
                    <td>Lehenga</td>
                    <td>18552285585588-Lehenga-10256=-External</td>
                    <td>26-07-2022   03:45 PM</td>
                    <td><p className='status'><IconInProgress/> In-Progress</p></td>
                    <td><Link className='solid-black-btn table-btn'>View</Link></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Women</td>
                    <td>Lehenga</td>
                    <td>18552285585588-Lehenga-10256=-External</td>
                    <td>26-07-2022   03:45 PM</td>
                    <td><p className='status'><IconInfo/> QC Error</p></td>
                    <td>
                        <div className='action-group'>
                            <p className='text-red status'><IconDownloadError/> Download Error File</p> 
                            <Link className='solid-black-btn table-btn'>Upload New File</Link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table> */}
        <TableListing
          table={table}
          ListProductDD={ListProductDD.data}
        />
      </div>
    </>
  );
}

export default CatalogsUploadData;