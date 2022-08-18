import { useState } from "react";
export const AddNew = () => {
  const [addingNew, setAddingNew] = useState(false);

  const handleClick = () => {
    setAddingNew(!addingNew);
  };

  return (
    <div className ="add-new">
      <div  >
        {!addingNew ? (
          <input
          className ="add-new"
            type="text"
            placeholder="Add new"
            onClick={handleClick}
          ></input>
        ) : (
          <div className="addingNew">
            <input className="add-new" ></input>
            <button className="btn">Add new</button>
          </div>
        )}
      </div>
    </div>
  );
};
