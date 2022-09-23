import React from "react";
import { Col, Row, Typography } from "antd";

import * as classes from "./AppHeader.module.css";
import logo from "../../assets/images/Scanner.png";

const { Title } = Typography;

const AppHeader = () => {
  return (
    <>
      <Row className={classes.AppHeader} style={{ padding: 0 }}>
        {/* <Col span={1} align="center">
        <Switch
          onChange={(e) => handleChangeMode(e)}
          checkedChildren={<FcNightPortrait />}
          unCheckedChildren={<FcPortraitMode />}
          checked={switchValue}
        />
      </Col> */}
        <Col span={24}>
          <Title level={2} className={classes.app_title}>
            JS-EABA <img width={40} height={45} src={logo} alt="scanner"></img>
            CANNER
          </Title>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};
export default AppHeader;
