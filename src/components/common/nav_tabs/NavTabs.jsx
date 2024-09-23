import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // игнорировать всё кроме левого клика
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected ? "page" : undefined}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function NavTabs({
  labelOne,
  linkOne,
  labelTwo,
  linkTwo,
  value,
}) {
  const [tabValue, setTabValue] = React.useState(value);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setTabValue(newValue);
      navigate(newValue === 0 ? linkOne : linkTwo); // Обработка навигации
    }
  };

  return (
    <Box>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{
          width: { xs: "360px", sm: "auto" },
          margin: { xs: "auto" },
        }}
      >
        <LinkTab
          sx={{
            paddingY: { xs: 0, sm: "auto" },
            fontSize: { xs: 12, sm: 18 },
            width: { xs: "50%", sm: "auto" },
          }}
          label={labelOne}
          href={linkOne}
          selected={tabValue === 0}
        />
        <LinkTab
          sx={{
            paddingY: { xs: 0, sm: "auto" },
            fontSize: { xs: 12, sm: 18 },
            width: { xs: "50%", sm: "auto" },
          }}
          label={labelTwo}
          href={linkTwo}
          selected={tabValue === 1}
        />
      </Tabs>
    </Box>
  );
}
