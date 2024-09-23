import React from "react";
import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";

function AvatarLoader(props) {
  // Определяем, какое устройство используется
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const width = isLaptop ? 324 : 129;
  const height = isLaptop ? 280 : 151;

  return (
    <ContentLoader
      speed={3}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#bdbdbd"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="18" ry="18" width={width - 2} height={height} />
    </ContentLoader>
  );
}

export default AvatarLoader;
