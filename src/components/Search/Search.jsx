import { Input, Typography, Space } from "antd";
import React from "react";
import { useState } from "react";

const { Search: AntdSearch } = Input;
const { Title, Text } = Typography;

const Search = ({ contract, api }) => {
  const [loading, setLoading] = useState(false);
  const [carDetails, setCarDetails] = useState(null);

  const onSearch = async (carNumber) => {
    setLoading(true);
    const carDetails = await contract.get(carNumber);
    const owner = await contract.getOwner(carNumber);
    if (owner === "0x0000000000000000000000000000000000000000") {
      api.info({
        message: `Search Completed`,
        description: `Record not found for car number "${carNumber}"`,
        placement: "top",
      });
      setCarDetails(null);
    } else {
      setCarDetails({ ...carDetails, owner });
      api.success({
        message: `Search Completed`,
        description: `Record found for car number "${carNumber}"`,
        placement: "top",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <AntdSearch
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        loading={loading}
      />
      {carDetails && (
        <>
          <div>
            <Title level={2}>Car Details Found</Title>
            <Space direction="vertical">
              <Text>
                Car Number: <Text keyboard>{carDetails.number}</Text>
              </Text>
              <Text>
                Car Model: <Text italic>{carDetails.model}</Text>
              </Text>
              <Text>
                Car Manufacturer: <Text code>{carDetails.manufacturer}</Text>
              </Text>
              <Text>
                Car Owner: <Text code>{carDetails.owner}</Text>
              </Text>
            </Space>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
