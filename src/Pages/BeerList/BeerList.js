import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "./tableIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  requestedFetchList,
  updateTableColumns,
  getFiltering,
} from "../../Modules/Actions/Actions";
import Modal from "../../Components/Modal/Modal";
import "antd/dist/antd.css";
import { Select } from "antd";

const BeerList = () => {
  const dispatch = useDispatch();
  // const [columns, setColumns] = useState([]);
  const columns = useSelector((state) => state.columnsReducer.columns);
  const beerList = useSelector((state) => state.columnsReducer.beerList);
  const filterBeerList = useSelector(
    (state) => state.columnsReducer.filterBeerList
  );
  const [openModal, setOpenModal] = useState(false);

  const { Option } = Select;

  const children = [];
  for (let i = 1; i <= 55; i++) {
    children.push(<Option key={i}>{`${i}-${i + 1}`}</Option>);
  }

  const handleChangeSelect = (value) => {
    dispatch(getFiltering(value));
  };

  const changeTableColumn = (sourceIndex, destinationIndex, columns) => {
    let value = columns.splice(sourceIndex, 1)[0];
    columns.splice(destinationIndex, 0, value);
    dispatch(updateTableColumns(columns));
  };

  useEffect(() => {
    dispatch(requestedFetchList());
  }, []);

  return (
    <>
      <Select
        // mode="multiple"
        style={{ width: "100%" }}
        placeholder="맥주의 알콜 도수를 선택하세요."
        onChange={(value) => handleChangeSelect(value)}
      >
        {children}
      </Select>
      <MaterialTable
        title="Tradir Beer List"
        columns={columns}
        data={filterBeerList.length ? filterBeerList : beerList}
        icons={tableIcons}
        style={{ padding: "20px" }}
        onColumnDragged={(sourceIndex, destinationIndex) =>
          changeTableColumn(sourceIndex, destinationIndex, columns)
        }
        onRowClick={() => setOpenModal(true)}
      />
      {openModal && <Modal closeModal={setOpenModal} />}
    </>
  );
};

export default BeerList;
