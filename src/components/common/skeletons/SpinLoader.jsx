import React from "react";
import { Button, Spin } from "antd";
const SpinLoader = ({ fullscreen }) => {
  const [spinning, setSpinning] = React.useState(true);
  const [percent, setPercent] = React.useState(0);

  return (
    <Spin
      spinning={spinning}
      percent={percent}
      fullscreen={fullscreen}
      
    />
  );
};
export default SpinLoader;
