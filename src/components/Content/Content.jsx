import { Collapse } from "antd";
import React from "react";
import CarForm from "../CarForm/CarForm";
import Search from "../Search/Search";
import TransferForm from "../TransferForm/TransferForm";

const { Panel } = Collapse;

const Content = ({ contract, api }) => {
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Search Car Details" key="1">
        <Search contract={contract} api={api} />
      </Panel>
      <Panel header="Register a new Car" key="2">
        <CarForm contract={contract} api={api} />
      </Panel>
      <Panel header="Transfer a vehicle" key="3">
        <TransferForm contract={contract} api={api} />
      </Panel>
    </Collapse>
  );
};

export default Content;
