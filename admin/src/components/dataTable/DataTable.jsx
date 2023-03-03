import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

export const DataTable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const {data} = useFetch(`/${path}`);
  const [list, setList] = useState(data);

  useEffect(()=>{
    setList(data)
  },[data])
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter(item=>item._id !==id));
    } catch (error) {
      
    }
    
  }


  const actionColum = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              <Link
                to="/users/test"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                View
              </Link>
            </div>
            <div className="editButton">
            <Link
                to="/users/new/test"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Edit
              </Link>
            </div>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        {path}
        <Link
          to={`/${path}/new`}
          className="link"
        >
          Add New{" "}
        </Link>
      </div>
      <DataGrid
      className="dataGrid"
        rows={list}
        columns={columns.concat(actionColum)}
        pageSize={9}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};
