import React, { useEffect, useState } from "react";
import "./Sidebar.scoped.css";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Modal from "../Modal/Modal";

function Sidebar(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let sideBarItems = [
    {
      name: "Home",
      icon: "fa-home",
    },
    {
      name: "Live Tv",
      icon: "fa-tv",
      event: () => {
        window.location.href = "/CONTENT-PLATFORM/video";
      },
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
    props.setIsCollapsed(!isCollapsed);
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

  const showMoreLessButton = (i) => (
    <div key={i} className="sidebar-item" onClick={toggleShowAllSubscriptions}>
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
    if (sideBarItem.owner === "subscriptions" && !props.isPortrait) {
      if (!renderedSubscriptions.includes(sideBarItem)) {
        return null;
      }
    }

    if (sideBarItem.type === "showMore" && !props.isPortrait) {
      return showMoreLessButton(index);
    }

    if (sideBarItem.type === "line" && !props.isPortrait) {
      return <div key={`line-${index}`} className="sidebar-line"></div>;
    }

    if (sideBarItem.type === "title" && !props.isPortrait) {
      return (
        <div key={`title-${index}`} className="sidebar-item-title">
          {sideBarItem.name}
        </div>
      );
    }

    return (
      <div
        key={`item-${sideBarItem.name}`}
        className={`sidebar-item ${
          props.isPortrait && "sidebar-portrait-item"
        }`}
        onClick={sideBarItem.event}
      >
        {sideBarItem.icon && sideBarItem.type === "provider" ? (
          <img
            src={process.env.PUBLIC_URL + `/assets/${sideBarItem.icon}.png`}
            alt={sideBarItem.name}
          />
        ) : (
          sideBarItem.icon &&
          sideBarItem.icon.includes("fa") && (
            <i className={`fa-solid ${sideBarItem.icon}`}></i>
          )
        )}

        {!props.isPortrait && (
          <div className="sidebar-item-name">{sideBarItem.name}</div>
        )}
      </div>
    );
  });

  return (
    <div
      className={`sidebar-container ${isCollapsed && "sidebar-collapsed"} ${
        props.isPortrait && "sidebar-portrait"
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
        {!props.isPortrait && (
          <img
            src={process.env.PUBLIC_URL + "/assets/vosyn_logo_long.png"}
            alt="Vosyn Logo"
            onClick={() => (window.location.href = "/CONTENT-PLATFORM/")}
          />
        )}
      </div>
      <div
        className={`sidebar-item-container scroll-y ${
          isCollapsed && "sidebar-item-collapsed"
        }`}
        onScroll={(e) => {
          console.log(e);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {sideBar}
      </div>
      {!props.isPortrait && (
        <ThemeSwitch
          className={`sidebar-night-toggle ${isCollapsed && "theme-collapsed"}`}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Sidebar;
