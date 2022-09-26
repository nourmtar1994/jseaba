import React, { useEffect, useState } from "react";
//DESIGN COMPONENTS
import { BackTop, Layout } from "antd";
//APP COMPONENTS
//STYLE & ICONS
import "antd/dist/antd.css";
import { UpCircleOutlined } from "@ant-design/icons";
import ProtectedRoute from "./components/Services/ProtectedRoute";
import { Switch } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

import { useDispatch, useSelector } from "react-redux";
import { fetchArmy } from "./redux/Slices/ArmySlice";

const Home = React.lazy(() => import("./components/Home/Home"));

const App = () => {
  const dispatch = useDispatch();

  const mode = useSelector * ((state) => state.mode.value);
  const [progress, setProgress] = useState(80);
  useEffect(() => {
    dispatch(fetchArmy());

    setTimeout(() => {
      setProgress(20);
    }, 500);
    setTimeout(() => {
      setProgress(40);
    }, 800);
    setTimeout(() => {
      setProgress(60);
    }, 1000);
    setTimeout(() => {
      setProgress(85);
    }, 1300);

    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);
  return (
    <Layout style={{ height: "fit-content", background: "#efefef" }}>
      <>
        <LoadingBar
          color={"#26c6da"}
          progress={progress}
          transitionTime={1000}
          onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <ProtectedRoute path="/" exact component={Home} title="Home" />
        </Switch>

        <BackTop
          className={"backtop"}
          style={{ right: 20, bottom: 30 }}
          duration={1000}
        >
          <UpCircleOutlined style={{ fontSize: 40 }} />
        </BackTop>
      </>
    </Layout>
  );
};

export default App;
