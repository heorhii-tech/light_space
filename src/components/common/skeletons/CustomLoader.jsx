import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
const CustomLoader = () => (
  <Flex align="center" gap="middle">
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
            color: "white",
            marginLeft: "10px",
          }}
          spin
        />
      }
    />
  </Flex>
);
export default CustomLoader;
