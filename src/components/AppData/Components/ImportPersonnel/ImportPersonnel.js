import React, { useEffect, useState } from "react";
import { message, Button, Form, Input, Select } from "antd";
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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImportPersonnel = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [armies, setArmies] = useState([]);

  useEffect(() => {
    getArmy();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("myFile", files);
    try {
      const { data } = await axios.post("/exel", formData);

      if (data?.success) {
        setLoading(false);
        console.log(data);
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
    <Form
      layout="vertical"
      name="basic"
      labelCol={{ span: 8, offset: 4 }}
      wrapperCol={{ span: 16, offset: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {/* <Form.Item
        label="جيش الإنتماء"
        name="army"
        rules={[{ message: "الرجاء تحديد جيش الإنتماء" }]}
      >
        <Select placeholder="جيش الإنتماء" allowClear showSearch>
          {armies?.map((item, index) => (
            <Select.Option key={index} value={item?._id}>
              {item?.armyName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="الوحدة"
        name="unite"
        rules={[{ required: true, message: "الرجاء تحديد الوحدة" }]}
      >
        <Select placeholder="جيش الإنتماء" allowClear showSearch>
          {armies?.map((item, index) => (
            <Select.Option key={index} value={item?._id}>
              {item?.unity}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}
      <Form.Item
        label=" البيانات"
        name="myFile"
        rules={[{ required: true, message: "الرجاء تحديد الوحدة" }]}
      >
        <Input type={"file"} onChange={(e) => setFiles(e.target.files[0])} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 4 }}>
        <Button type="primary" htmlType="submit">
          تنزيل
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ImportPersonnel;
