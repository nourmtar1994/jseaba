import React, { useEffect, useState } from "react";
import { message, Button, Form, Input, Select, Col, Row, Space } from "antd";
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
import { Workbook } from "react-excel-workbook";
import moment from "moment";
const data1 = [
  {
    foo: "123",
    bar: "456",
    baz: "789",
  },
  {
    foo: "abc",
    bar: "dfg",
    baz: "hij",
  },
  {
    foo: "aaa",
    bar: "bbb",
    baz: "ccc",
  },
];

const data2 = [
  {
    aaa: 1,
    bbb: 2,
    ccc: 3,
  },
  {
    aaa: 4,
    bbb: 5,
    ccc: 6,
  },
];
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ExportPersonnel = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [armies, setArmies] = useState([]);
  const [personnelList, setPersonnelList] = useState([]);
  const [information, setInformation] = useState({
    army: undefined,
    unity: undefined,
    type: undefined,
  });

  console.log(information);
  useEffect(() => {
    getArmy();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("myFile", files);
    try {
      const { data } = await axios.get("/personnel");

      if (data?.success) {
        setLoading(false);
        setPersonnelList(data?.data);
      } else {
        console.log(data?.error);
        message.error(data?.error);
      }
    } catch (error) {
      message.error(error);
      setLoading(false);
      console.log(error);
    }
  };

  const getArmy = async () => {
    try {
      const { data } = await axios.get("/army");
      if (data?.success) {
        setArmies(data?.data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row>
      <Col span={24} align="center">
        <Space>
          <Select
            style={{ width: 150 }}
            placeholder="جيش الإنتماء"
            allowClear
            showSearch
            onChange={(e) =>
              setInformation({
                ...information,
                army: e,
              })
            }
          >
            {armies?.map((item, index) => (
              <Select.Option key={index} value={item?.armyName}>
                {item?.armyName}
              </Select.Option>
            ))}
          </Select>

          <Select
            style={{ width: 150 }}
            placeholder="الوحدة"
            allowClear
            showSearch
            onChange={(e) =>
              setInformation({
                ...information,
                unity: e,
              })
            }
          >
            {armies?.map((item, index) => (
              <Select.Option key={index} value={item?.unity}>
                {item?.unity}
              </Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 150 }}
            placeholder="الصنف"
            allowClear
            showSearch
            onChange={(e) =>
              setInformation({
                ...information,
                type: e,
              })
            }
          >
            {armies?.map((item, index) => (
              <Select.Option key={index} value={item?.armyCategory}>
                {item?.armyCategory}
              </Select.Option>
            ))}
          </Select>

          <Workbook
            // filename="example.xlsx"
            filename={
              information.army +
              " - " +
              information.unity +
              "( " +
              moment().format("ll") +
              " ) " +
              moment() +
              ".xlsx"
            }
            element={
              <Button
                type="default"
                danger
                htmlType="submit"
                disabled={
                  information?.unity === undefined ||
                  information?.army === undefined ||
                  information?.type === undefined
                }
              >
                تحميل الملف
              </Button>
            }
          >
            <Workbook.Sheet data={[]} name="Sheet1">
              <Workbook.Column label="الرقم بالوحدة" value="matricule" />
              <Workbook.Column label="الرتبة" value="grade" />
              <Workbook.Column label="الإسم و اللقب" value="nom_prenom" />
              <Workbook.Column label="تاريخ الولادة" value="date_naissance" />
              <Workbook.Column label="الصنف" value="category" />
              <Workbook.Column label="الخطة" value="fonction" />
              <Workbook.Column label="حصص مبرمجة" value="seance" />
              <Workbook.Column label="تمارين فردية" value="bar" />
              <Workbook.Column label="نتيجة مد وعطف الذراعين" value="bar" />
              <Workbook.Column label="معدل مد و عطف الذراعين" value="bar" />
              <Workbook.Column label="نتيجة حركات الجوف" value="bar" />
              <Workbook.Column label="معدل حركات الجوف" value="bar" />
              <Workbook.Column label="نتيجة سباق 2 مايل" value="bar" />
              <Workbook.Column label="معدل سباق 2 مايل" value="bar" />
              <Workbook.Column label="المعدل العام" value="bar" />
              <Workbook.Column label="الطول" value="bar" />
              <Workbook.Column label="الوزن" value="bar" />
            </Workbook.Sheet>
            <Workbook.Sheet data={[]} name="Sheet2">
              <Workbook.Column
                label="جيش الإنتماء"
                value={information?.unity}
              />
              <Workbook.Column label="صنف" value={information?.type} />
              <Workbook.Column label="الوحدة" value={information?.unity} />
            </Workbook.Sheet>
          </Workbook>
        </Space>
      </Col>
    </Row>
  );
};
export default ExportPersonnel;
