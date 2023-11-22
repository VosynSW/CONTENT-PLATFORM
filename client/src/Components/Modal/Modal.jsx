import React, { useState } from "react";
import "./Modal.css"; // Import your CSS here

function Modal({ isOpen, onClose }) {
  const [selectedFriends, setSelectedFriends] = useState([]);

  const toggleFriendSelection = (name) => {
    if (selectedFriends.includes(name)) {
      setSelectedFriends(selectedFriends.filter((friend) => friend !== name));
    } else {
      setSelectedFriends([...selectedFriends, name]);
    }
  };

  if (!isOpen) return null;

  let friends = [
    {
      name: "John Doe",
      picture: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jane Smith",
      picture: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Michael Johnson",
      picture: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Emily Davis",
      picture: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "David Wilson",
      picture: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Sarah Thompson",
      picture: "https://i.pravatar.cc/150?img=6",
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <i className="fa-solid fa-close" onClick={onClose}></i>
          <h1>Watch Party Name</h1>
          <input type="text" placeholder="Enter Watch Party Name" />
        </div>
        <div className="modal-main">
          <h1>Add Participants</h1>
          <div>
            <div className="modal-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search for friends" />
            </div>
            {friends.map((friend, index) => {
              const isSelected = selectedFriends.includes(friend.name);

              return (
                <div className="modal-friend" key={index}>
                  <div>
                    <img src={friend.picture} alt={friend.name} />
                    <div className="modal-friend-name">{friend.name}</div>
                  </div>
                  <button
                    className={`modal-friend-add-button ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => toggleFriendSelection(friend.name)}
                  >
                    {isSelected && <i className="fa-solid fa-check"></i>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button className="modal-create-button">Create Watch Party 🍿</button>
      </div>
    </div>
  );
}

export default Modal;
