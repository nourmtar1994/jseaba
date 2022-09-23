import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../Badge/Badge";
//SERVICES
import axios from "axios";
import { fetchPersonnel } from "../../redux/PersonnelSlice";
import { Col, Row } from "antd";
import AccessTable from "../AccessTable/AccessTable.js";
import Scanner from "../Scanner/Scanner";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const Home = () => {
  const dispatch = useDispatch();
  const [personnelData, setPersonnelData] = useState([]);

  const personnel = useSelector((state) => state.personnel);
  useEffect(() => {
    dispatch(fetchPersonnel(123));
    // getBase();
  }, []);

  useEffect(() => {
    setPersonnelData(personnel);
  }, [personnel]);

  return (
    <Row gutter={[10, 30]}>
      <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
        <Badge title="Scanner">
          <Scanner />
        </Badge>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 16 }}>
        <Badge
          title="List"
          extra={
            <div>
              <CheckCircleTwoTone twoToneColor="#52c41a" /> 24 &nbsp;&nbsp;
              <CloseCircleTwoTone twoToneColor="#e93f3f" /> 50
            </div>
          }
        >
          <AccessTable />
        </Badge>
      </Col>
    </Row>
  );
};

export default Home;
