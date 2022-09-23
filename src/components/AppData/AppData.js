import {
  Affix,
  Col,
  Divider,
  Row,
  Typography,
  Upload,
  message,
  Button,
  Checkbox,
  Form,
  Input,
  Switch,
  Space,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import MiniBanner from "../MiniBanner/MiniBanner";
import { InboxOutlined } from "@ant-design/icons";
import { FilePond, File, registerPlugin } from "react-filepond";

// Import React FilePond

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import Badge from "../Badge/Badge";
import ImportPersonnel from "./Components/ImportPersonnel/ImportPersonnel";
import ExportPersonnel from "./Components/ExportPersonnel/ExportPersonnel";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AppData = () => {
  const [loading, setLoading] = useState(false);
  const [importExport, setImportExport] = useState(false);

  return (
    <Row>
      <MiniBanner />
      <Col span={20} className="custom-space">
        <Col span={24}>
          <Space style={{ width: "100%" }}>
            <span className="title">
              <Typography.Title
                level={2}
                className={"appTitle"}
                style={{ color: "#000" }}
              >
                البيانات
              </Typography.Title>
            </span>
            <span className="extra">
              <Switch
                checkedChildren="تنزيل"
                unCheckedChildren="تحميل"
                onChange={(e) => setImportExport(e)}
              />
            </span>
          </Space>
        </Col>
        <Divider />
        <Col span={24}>
          {importExport ? <ImportPersonnel /> : <ExportPersonnel />}
        </Col>
      </Col>
    </Row>
  );
};
export default AppData;
