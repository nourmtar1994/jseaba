import { Image } from "antd";
import React from "react";

import QrReader from "react-qr-scanner";
import scannerLogo from "../../assets/images/scanner.gif";
const previewStyle = {
  height: 240,
  width: 320,
};

const Scanner = () => {
  return (
    <div style={{ minHeight: 387 }}>
      {/* <QrReader
        delay={100}
        style={previewStyle}
        onError={(error) => console.log(error)}
        onScan={(data) => console.log(data)}
      /> */}
      <Image preview={false} src={scannerLogo} />
    </div>
  );
};

export default Scanner;
