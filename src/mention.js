import React, { useState, useRef } from "react";
import Select from "react-select";

const MentionInput = () => {
  const [comment, setComment] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const textareaRef = useRef(null);

  if (textareaRef.current) {
    textareaRef.current.focus();
  }
  const users = [
    { value: "Samuel Jackson", label: "Samuel Jackson" },
    { value: "Binoy David", label: "Binoy David" },
    { value: "Jackson", label: "Jackson" },
    { value: "Selar", label: "Selar" },
  ];

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setComment(inputValue);

    setShowSelect(inputValue.endsWith("@"));
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);

    const mention = `@${user.value} `;
    const updatedComment = comment.slice(0, -1) + mention;
    setComment(updatedComment);

    setShowSelect(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaClick = () => {
    setShowSelect(false);
  };

  const defaultMenuIsOpen = showSelect && users.length > 0;

  return (
    <div
      className="comment-form"
      style={{ position: "relative", width: "100%" }}
    >
      <textarea
        value={comment}
        ref={textareaRef}
        onChange={handleInputChange}
        onClick={handleTextareaClick}
        placeholder="Write your comment..."
        style={{ width: "100%", minHeight: "120px", resize: "vertical" }}
      />

      {showSelect && (
        <div
          className="select-dropdown"
          style={{
            position: "absolute",
            top: "32px",
            left: "4px",
            width: "150px",
            zIndex: 1,
          }}
        >
          <Select
            options={users}
            onChange={handleUserSelect}
            autoFocus
            isClearable
            value={selectedUser}
            placeholder={
              defaultMenuIsOpen ? "Select user..." : "Type @ to mention..."
            }
            menuIsOpen={defaultMenuIsOpen}
          />
        </div>
      )}
    </div>
  );
};

export default MentionInput;
