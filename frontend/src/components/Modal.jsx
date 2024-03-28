import React, { useState } from "react";

const Modal = ({ mode, setShowModal, task }) => {
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "ali@test.com",
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date(),
  });

  const postData = async () => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    console.log("changing!", e);
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    console.log(data);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} a task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Enter task title"
            name="title"
            value={data.title}
            onChange={handleChange}
            type="text"
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            required
            min="0"
            max="100"
            placeholder="Task progress"
            name="progress"
            value={data.progress}
            onChange={handleChange}
            type="range"
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? "" : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
