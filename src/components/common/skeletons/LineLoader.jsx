import React from "react";
import ContentLoader from "react-content-loader";
function LineLoader(props) {
  return (
    <ContentLoader
      speed={3}
      width={170}
      height={15}
      viewBox="0 0 170 15"
      backgroundColor="#bdbdbd"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect width="170" height="20" />
    </ContentLoader>
  );
}

export default LineLoader;
