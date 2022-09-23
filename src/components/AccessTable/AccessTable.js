import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, Space, Table, Typography } from "antd";
import React, { useState } from "react";
const { Text, Link } = Typography;

const data = [
  {
    key: "1",
    id: "58447963",
    name: "John Brown",
    phone: +325655467654,
    nationality: "New York No. 1 Lake Park",
    status: true,
  },
  {
    key: "2",
    id: "777846565",

    name: "Jim Green",
    phone: +22485475474,
    nationality: "London No. 1 Lake Park",
    status: false,
  },
  {
    key: "3",
    id: "8474898521",

    name: "Joe Black",
    phone: +585625963,
    nationality: "Sidney No. 1 Lake Park",
    status: false,
  },
  {
    key: "4",
    id: "3300021515",
    name: "Jim Red",
    phone: +3336658950,
    nationality: "London No. 2 Lake Park",
    status: true,
  },
];
const AccessTable = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns = [
    {
      title: "#ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Present",
          value: "present",
        },
        {
          text: "Absent",
          value: "absent",
        },
      ],

      filteredValue: filteredInfo.status || null,
      render: (status) =>
        status ? (
          <>
            <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
            <Text type="secondary">2 Days ago</Text>
          </>
        ) : (
          <>
            <CloseCircleTwoTone twoToneColor="#e93f3f" />{" "}
          </>
        ),
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default AccessTable;
