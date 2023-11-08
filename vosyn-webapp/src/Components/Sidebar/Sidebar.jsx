import React from 'react';
import './Sidebar.css';

function Sidebar() {
    let sideBarItems = [
        {
            name: "Home",
            icon: "fa-home"
        },
        {
            name: "Live Tv",
            icon: ""
        },
        {
            name: "My Playlist",
            icon: ""
        },
        {
            type: "line"
        },
        {
            name: "Streaming Providers",
            type: "title"
        },
        {
            name: "Netflix",
            icon: ""
        },
        {
            name: "Prime Video",
            icon: ""
        },
        {
            name: "Hulu",
            icon: ""
        },
        {
            name: "Show More",
            icon: ""
        },
        {
            type: "line"
        },
        {
            name: "Explore",
            type: "title"
        },
        {
            name: "Trending",
            icon: ""
        },
        {
            name: "Watch Later",
            icon: ""
        },
        {
            name: "Friends Watching",
            icon: ""
        },
        {
            name: "Lives",
            icon: ""
        },
        {
            type: "line"
        },
        {
            name: "Subscriptions",
            type: "title"
        },
        {
            name: "Vosyn Originals",
            icon: "",
            owner: "Subcriptions"
        },
        {
            name: "Vosyn Gaming",
            icon: "",
            owner: "Subcriptions"
        },
        {
            name: "Vosyn Music",
            icon: "",
            owner: "Subcriptions"
        },
        {
            name: "Vosyn Sports",
            icon: "",
            owner: "Subcriptions"
        },
        {
            name: "Vosyn News",
            icon: "",
            owner: "Subcriptions"
        },
        {
            name: "Vosyn Movies",
            icon: "",
            owner: "Subcriptions"
        },
        {
            type: "line"
        },
        {
            name: "Settings",
            icon: ""
        },
        {
            name: "Privacy Policy",
            icon: ""
        },
        {
            name: "Help Center",
            icon: ""
        },

    ]

    const subscriptionItems = sideBarItems
        .filter(item => item.owner === "Subcriptions")
        .slice(0, 3);

    const sideBar = sideBarItems.map((sideBarItem, index) => {
        if (sideBarItem.owner === "Subcriptions" && !subscriptionItems.includes(sideBarItem)) {
            return null;
        }

        if (sideBarItem.type === "line") {
            return <div key={`line-${index}`} className="sidebar-line"></div>;
        }

        if (sideBarItem.type === "title") {
            return (
                <div key={`title-${sideBarItem.name}`} className="sidebar-item-title">
                    {sideBarItem.name}
                </div>
            );
        }

        return (
            <div key={`item-${sideBarItem.name}`} className="sidebar-item">
                <i className={`fa-solid ${sideBarItem.icon}`}></i>
                <div className="sidebar-item-name">
                    {sideBarItem.name}
                </div>
            </div>
        );
    });

    return (
        <div className='sidebar-container'>
            <div className='sidebar-title-container'>
                <i class="fa-solid fa-bars"></i>
                <img src="assets/vosyn_logo_long.png" />
            </div>
            <div className='sidebar-item-container'>
                {sideBar}
            </div>
        </div>
    );
}

export default Sidebar;
