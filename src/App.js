import { useState } from "react";

export default function App() {
  const initialData = [
    { id: 1, name: "list 1" },
    { id: 2, name: "list 2" },
    { id: 3, name: "list 3" }
  ];

  const [list, setList] = useState(initialData);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState({ id: null, name: "" });

  const onDeleteHandler = (id) => {
    const updatedList = list.filter((el) => el.id !== id);
    setList(updatedList);
  };

  const onAddHandler = () => {
    const newId = Math.max(...list.map((item) => item.id)) + 1; // Find the highest id and add 1
    const newList = [...list, { id: newId, name: newItem }];
    setList(newList);
    setNewItem(""); // Clear the input after adding
  };

  const onEditChange = (event) => {
    setEditItem({ ...editItem, name: event.target.value });
  };

  const onEditSubmit = () => {
    const updatedList = list.map((item) =>
      item.id === editItem.id ? editItem : item
    );
    setList(updatedList);
    setEditItem({ id: null, name: "" }); // Clear the edit form after updating
  };

  return (
    <div className="App">
      <h1>All List Items</h1>

      {list.map((item) => (
        <div
          style={{ border: "1px solid black", margin: "10px" }}
          key={item.id}
        >
          <h1>{item.id}</h1>
          <p>{item.name}</p>
          <button onClick={() => onDeleteHandler(item.id)}>Delete</button>
          <button onClick={() => setEditItem(item)}>Edit</button>
        </div>
      ))}

      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New List Item"
        />
        <button onClick={onAddHandler}>Add Item</button>
      </div>

      {editItem.id && (
        <div>
          <input
            value={editItem.name}
            onChange={onEditChange}
            placeholder="Edit Item"
          />
          <button onClick={onEditSubmit}>Update Item</button>
        </div>
      )}
    </div>
  );
}
