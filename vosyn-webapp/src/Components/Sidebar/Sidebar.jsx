import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Modal from "../Modal/Modal";

function Sidebar(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let sideBarItems = [
    {
      name: "Home",
      icon: "fa-home",
    },
    {
      name: "Live Tv",
      icon: "fa-tv",
    },
    {
      name: "My Playlist",
      icon: "fa-photo-film",
    },
    {
      name: "Watch Together",
      icon: "fa-users",
      event: () => openModal(),
    },
    {
      type: "line",
    },
    {
      name: "Streaming Providers",
      type: "title",
    },
    {
      name: "Netflix",
      icon: "netflix",
      type: "provider",
    },
    {
      name: "Prime Video",
      icon: "prime",
      type: "provider",
    },
    {
      name: "Hulu",
      icon: "hulu",
      type: "provider",
    },
    {
      name: "Show More",
      icon: "fa-chevron-down",
    },
    {
      type: "line",
    },
    {
      name: "Explore",
      type: "title",
    },
    {
      name: "Trending",
      icon: "fa-arrow-trend-up",
    },
    {
      name: "Watch Later",
      icon: "fa-clock",
    },
    {
      name: "Friends Watching",
      icon: "fa-user-group",
    },
    {
      name: "Lives",
      icon: "fa-calendar-days",
    },
    {
      type: "line",
    },
    {
      name: "Subscriptions",
      type: "title",
    },
    {
      name: "Vosyn Originals",
      icon: "fa-image",
      owner: "subscriptions",
    },
    {
      name: "Vosyn Gaming",
      icon: "fa-image",
      owner: "subscriptions",
    },
    {
      name: "Vosyn Music",
      icon: "fa-image",
      owner: "subscriptions",
    },
    {
      name: "Vosyn Sports",
      icon: "fa-image",
      owner: "subscriptions",
    },
    {
      name: "Vosyn News",
      icon: "fa-image",
      owner: "subscriptions",
    },
    {
      name: "Vosyn Movies",
      icon: "fa-image",
      owner: "subscriptions",
    },
    {
      type: "showMore",
    },
    {
      type: "line",
    },
    {
      name: "Settings",
      icon: "fa-cog",
    },
    {
      name: "Privacy Policy",
      icon: "fa-file-contract",
    },
    {
      name: "Help Center",
      icon: "fa-circle-question",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleShowAllSubscriptions = () => {
    setShowAllSubscriptions(!showAllSubscriptions);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const renderedSubscriptions = sideBarItems
    .filter((item) => item.owner === "subscriptions")
    .slice(0, showAllSubscriptions ? sideBarItems.length : 3);

  const showMoreLessButton = (
    <div className="sidebar-item" onClick={toggleShowAllSubscriptions}>
      <i
        className={`fa-solid ${
          showAllSubscriptions ? "fa-chevron-up" : "fa-chevron-down"
        }`}
      ></i>
      <div className="sidebar-item-name">
        {showAllSubscriptions ? "Show Less" : "Show More"}
      </div>
    </div>
  );

  const sideBar = sideBarItems.map((sideBarItem, index) => {
    if (sideBarItem.owner === "subscriptions" && !isPortrait) {
      if (!renderedSubscriptions.includes(sideBarItem)) {
        return null;
      }
    }

    if (sideBarItem.type === "showMore" && !isPortrait) {
      return showMoreLessButton;
    }

    if (sideBarItem.type === "line" && !isPortrait) {
      return <div key={`line-${index}`} className="sidebar-line"></div>;
    }

    if (sideBarItem.type === "title" && !isPortrait) {
      return (
        <div key={`title-${sideBarItem.name}`} className="sidebar-item-title">
          {sideBarItem.name}
        </div>
      );
    }

    return (
      <div
        key={`item-${sideBarItem.name}`}
        className={`sidebar-item ${isPortrait && "sidebar-portrait-item"}`}
        onClick={sideBarItem.event}
      >
        {sideBarItem.icon && sideBarItem.type === "provider" ? (
          <img src={`assets/${sideBarItem.icon}.png`} alt={sideBarItem.name} />
        ) : (
          sideBarItem.icon &&
          sideBarItem.icon.includes("fa") && (
            <i className={`fa-solid ${sideBarItem.icon}`}></i>
          )
        )}

        {!isPortrait && (
          <div className="sidebar-item-name">{sideBarItem.name}</div>
        )}
      </div>
    );
  });

  useEffect(() => {
    //check if screen is in portrait mode
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  });

  return (
    <div
      className={`sidebar-container ${isCollapsed && "sidebar-collapsed"} ${
        isPortrait && "sidebar-portrait"
      }`}
    >
      <div
        className={`sidebar-title-container ${
          isCollapsed && "sidebar-title-collapsed"
        }`}
      >
        <i
          onClick={toggleSidebar}
          className={`fa-solid ${isCollapsed ? "fa-bars" : "fa-times"}`}
        ></i>
        {!isPortrait && (
          <img src="assets/vosyn_logo_long.png" alt="Vosyn Logo" />
        )}
      </div>
      <div
        className={`sidebar-item-container ${
          isCollapsed && "sidebar-item-collapsed"
        }`}
        style={{ overflowY: "auto" }}
      >
        {sideBar}
      </div>
      <ThemeSwitch
        className={`sidebar-night-toggle ${isCollapsed && "theme-collapsed"}`}
        triggerRender={props?.triggerRender}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Sidebar;
