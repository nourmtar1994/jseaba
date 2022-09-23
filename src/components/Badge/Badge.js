import React, { useState } from "react";
import {
  DownSquareTwoTone,
  LineChartOutlined,
  UpSquareTwoTone,
} from "@ant-design/icons";
import * as classes from "./badge.module.css";
import { Card } from "antd";

const Badge = (props) => {
  const [collapse, setCollapse] = useState(true);
  let {
    color,
    size = 80,
    icon = false,
    title = false,
    hoverable = false,
    align,
    action,
    loading,
    extra = false,
  } = props;

  /*
   *********color set*********
   */

  const badgeColor =
    color === "danger"
      ? classes.customDangerBadge
      : color === "success"
      ? classes.customSuccessBadge
      : color === "primary"
      ? classes.customPrimaryBadge
      : classes.customWarningBadge;
  /*
   *********color position*********
   */

  const [postion, setPostion] = useState(
    align === "right"
      ? {
          top: "-20px",
          right: "20px",
        }
      : {
          top: "-20px",
          left: "20px",
        }
  );
  /*
   *********color set*********
   */
  const badgeSize = {
    width: size,
    height: size,
    fontSize: size / 2 - 5 + "px",
    ...postion,
  };

  /*
   *********color set*********
   */
  const MouseEnterEffect = () => {
    hoverable &&
      setPostion({
        ...postion,
        top: "-50px",
      });
  };

  const MouseLeaveEffect = () => {
    hoverable &&
      setPostion({
        ...postion,
        top: "-20px",
      });
  };

  return (
    <Card
      extra={extra}
      className={classes.card}
      bordered={false}
      title={
        title ? (
          <div className={classes.CardHeader}>
            <div className={classes.collapseButton}>
              {collapse ? (
                <UpSquareTwoTone
                  twoToneColor={"#2b4fc2"}
                  className={classes.collapseIcon}
                  onClick={() => setCollapse(false)}
                />
              ) : (
                <DownSquareTwoTone
                  className={classes.collapseIcon}
                  onClick={() => setCollapse(true)}
                  twoToneColor={"#2b4fc2"}
                />
              )}
            </div>
            <label
              className={classes.CardHeader}
              style={
                align === "right" ? { marginLeft: "90px" } : { marginLeft: 10 }
              }
            >
              {title}
            </label>
            {action?.map((item, key) => (
              <b key={key} style={{ float: "left" }}>
                {item}
              </b>
            ))}
          </div>
        ) : (
          false
        )
      }
      hoverable={hoverable}
      onMouseEnter={() => MouseEnterEffect()}
      onMouseLeave={() => MouseLeaveEffect()}
      bodyStyle={!collapse ? { display: "none" } : {}}
    >
      {icon && (
        <div
          className={`${classes.customBadge} ${badgeColor}`}
          style={{ ...badgeSize }}
        >
          {icon ? icon : <LineChartOutlined />}
        </div>
      )}
      {props?.children}
    </Card>
  );
};
export default Badge;
