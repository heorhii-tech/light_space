import React from "react";
import ContentLoader from "react-content-loader";
function AvatarLoader(props) {
  return (
    <ContentLoader
      speed={3}
      width={129}
      height={151}
      viewBox="0 0 129 151"
      backgroundColor="#bdbdbd"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="18" ry="18" width="127" height="151" />
    </ContentLoader>
  );
}

export default AvatarLoader;
