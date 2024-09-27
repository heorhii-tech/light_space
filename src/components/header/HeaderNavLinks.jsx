import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // игнорируем все, кроме левого клика
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
      component={NavLink}
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

function HeaderNavLinks({ headerMenu }) {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  useEffect(() => {
    headerMenu.map((item, index) => {
      if (location.pathname === item.link) {
        setValue(index);
      }
    });
  }, [location]);

  const handleChange = (event, newValue) => {
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <div className="header_links_wrapper">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          role="navigation"
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "white",
            },
          }}
        >
          {headerMenu &&
            headerMenu.map((item, index) => (
              <LinkTab
                sx={{
                  color: "white",
                  backgroundColor: "transparent",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                key={index}
                label={item.item}
                to={item.link} // Замените href на to
              />
            ))}
        </Tabs>
      </Box>
    </div>
  );
}

export default HeaderNavLinks;
