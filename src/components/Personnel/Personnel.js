import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  InfoOutlined,
} from "@ant-design/icons";
import { Affix, Col, Divider, Popover, Row, Tag, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonnel } from "../../redux/PersonnelSlice";
import DataTables from "../DataTables/DataTables";
import FilterZone from "../FilterZone/FilterZone";
import MiniBanner from "../MiniBanner/MiniBanner";
import { getDate } from "../Services/Extra";
import { PersonnelEdit } from "./PersonnelEdit";
import PersonnelInfo from "./PersonnelInfo";
import moment from "moment";
import Item from "antd/lib/list/Item";
import { getGradeCategory } from "../../utils/JsUtils";

const typeAge = [
  {
    type: "أ",
    tag: <Tag color="#f50">أ</Tag>,
  },
  {
    type: "ب",
    tag: <Tag color="#2db7f5">ب</Tag>,
  },
  {
    type: "ج",
    tag: <Tag color="#87d068">ج</Tag>,
  },
  {
    type: "د",
    tag: <Tag color="#108ee9">د</Tag>,
  },
  {
    type: "ز",
    tag: <Tag color="#f50">ز</Tag>,
  },
  {
    type: "ه",
    tag: <Tag color="#2db7f5">ه</Tag>,
  },
];

const Personnel = () => {
  const columns = [
    {
      name: "صنف الرتب",
      selector: (d) => d.matricule,
      sortable: true,
      cell: (d) => <span>{getGradeCategory(d?.grade)}</span>,
    },
    {
      name: "رقم التجنيد",
      selector: (d) => d.matricule,
      sortable: true,
      cell: (d) => <span>{d.matricule}</span>,
    },
    {
      name: "الرتبة",
      selector: (d) => d.grade,
      sortable: true,
      cell: (d) => <span>{d.grade}</span>,
    },
    {
      name: "الإسم و اللقب",
      selector: (d) => d.nom_prenom,
      sortable: true,
      cell: (d) => <span>{d.nom_prenom}</span>,
    },
    {
      name: "تاريخ الولادة",
      selector: (d) => d.date_naissance,
      sortable: true,
      cell: (d) => getDate(d.date_naissance),
    },
    {
      name: "الصنف",
      selector: (d) => d.category_age,
      cell: (d) =>
        typeAge?.filter((item) => d?.category_age === item?.type)?.[0].tag,
      sortable: true,
    },
    {
      name: "أنموذج 8",
      selector: () => "model8",
      cell: (d) => (
        <span className="app-link-text">
          {d.model8 ? (
            <CheckCircleOutlined
              style={{ color: "green", fontSize: "1.5em" }}
            />
          ) : (
            <CloseCircleOutlined style={{ color: "red", fontSize: "1.5em" }} />
          )}
        </span>
      ),
      sortable: true,
    },
    {
      name: "BMI",
      selector: () => "model8",
      cell: (d) => (
        <span className=" app-link-text">
          {
            <Popover
              content={
                <div>
                  <p>
                    <b>الطول : </b>
                    {d?.taille?.toLocaleString("en-US")} متر
                  </p>
                  <p>
                    <b>الوزن : </b>
                    {d?.poids?.toLocaleString("en-US")} كغ
                  </p>
                </div>
              }
            >
              {d.poids / (d.taille * 2) < 18 ? (
                //
                <p style={{ color: "#dddd34" }}>
                  {(d.poids / (d.taille * 2))?.toLocaleString("en-US")}
                </p>
              ) : d.poids / (d.taille * 2) >= 18.5 &&
                d.poids / (d.taille * 2) < 25 ? (
                //
                <p style={{ color: "#52c41a" }}>
                  {" "}
                  {(d.poids / (d.taille * 2))?.toLocaleString("en-US")}
                </p>
              ) : d.poids / (d.taille * 2) >= 25 &&
                d.poids / (d.taille * 2) < 30 ? (
                <p style={{ color: "orange" }}>
                  {" "}
                  {(d.poids / (d.taille * 2))?.toLocaleString("en-US")}
                </p>
              ) : d.poids / (d.taille * 2) >= 30 &&
                d.poids / (d.taille * 2) < 35 ? (
                <p style={{ color: "#ff7875" }}>
                  {" "}
                  {(d.poids / (d.taille * 2))?.toLocaleString("en-US")}
                </p>
              ) : (
                d.poids / (d.taille * 2) >= 35 &&
                d.poids / (d.taille * 2) < 40 && (
                  <p style={{ color: "red" }}>
                    {" "}
                    {(d.poids / (d.taille * 2))?.toLocaleString("en-US")}
                  </p>
                )
              )}
            </Popover>
          }
        </span>
      ),
      sortable: true,
    },
    {
      name: "المعدل",
      selector: () => "moyen",
      cell: (d) => (
        <span className="app-link-text">
          <Popover
            content={
              <div>
                <p>
                  <b>مد و عطف الذراعين : </b>
                  {d?.moyen_pompe?.toLocaleString("en-US")} ({d?.result_pompe})
                </p>
                <p>
                  <b>حركات الجوف : </b>
                  {d?.moyen_updos?.toLocaleString("en-US")} ({d?.result_updos})
                </p>
                <p>
                  <b>سباق مايل : </b>
                  {d?.moyen_malle?.toLocaleString("en-US")} (
                  {d?.result_malle?.toLocaleString("en-US")})
                </p>
              </div>
            }
          >
            {d.moyen_generale?.toLocaleString("en-US")}
          </Popover>
        </span>
      ),
      sortable: true,
    },
    // {   name: "معلومات",
    //       selector: () => "moyen",
    //       cell: (d) => (
    //         <span>
    //           {
    //             <InfoOutlined
    //               onClick={() => handleGetEdit(d)}
    //               style={{ color: "#07d1ff", fontSize: "1.5em" }}
    //             />
    //           }
    //         </span>
    //       ),
    //     },
  ];

  const [isOnTopPosition, setisOnTopPosition] = useState(false);
  const [personneInfo, setPersonneInfo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const personnelFiltredData = useSelector(
    (state) => state.personnel.filtredData
  );

  useEffect(() => {
    dispatch(fetchPersonnel());
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleGetEdit = async (personne) => {
    showModal();
    setPersonneInfo(personne);
  };

  const conditionalRowStyles = [
    // You can also pass a callback to style for additional customization
    {
      when: (row) => row.poids / (row.taille * 2) < 18.5,
      style: (row) => ({
        borderRight: "3px solid yellow",
      }),
    },
    {
      when: (row) =>
        row.poids / (row.taille * 2) >= 18.5 &&
        row.poids / (row.taille * 2) < 25,
      style: (row) => ({
        borderRight: "3px solid #52c41a",
      }),
    },
    {
      when: (row) =>
        row.poids / (row.taille * 2) >= 25 && row.poids / (row.taille * 2) < 30,
      style: (row) => ({
        borderRight: "3px solid orange",
      }),
    },
    {
      when: (row) =>
        row.poids / (row.taille * 2) >= 30 && row.poids / (row.taille * 2) < 35,
      style: (row) => ({
        borderRight: "3px solid #ff7875",
      }),
    },
    {
      when: (row) =>
        row.poids / (row.taille * 2) >= 35 && row.poids / (row.taille * 2) < 40,
      style: (row) => ({
        borderRight: "3px solid red",
      }),
    },
  ];

  return (
    <Row>
      <MiniBanner />
      <div className="custom-space">
        <Col span={24}>
          <Affix offsetTop={60} onChange={(e) => setisOnTopPosition(e)}>
            <Typography.Title
              level={2}
              className={"appTitle"}
              style={{ color: isOnTopPosition ? "#fff" : "#000" }}
            >
              الأفراد
            </Typography.Title>
          </Affix>
        </Col>
        <Divider />
        <Col span={24}>
          <FilterZone />
        </Col>
        <Col span={24}>
          <DataTables
            conditionalRowStyles={conditionalRowStyles}
            columns={columns}
            data={personnelFiltredData}
          />
        </Col>
      </div>
      {/* <PersonnelInfo /> */}
      <PersonnelEdit
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={personneInfo}
      />
    </Row>
  );
};

export default Personnel;
