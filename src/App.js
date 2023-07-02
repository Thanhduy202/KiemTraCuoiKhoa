import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [begin, setBegin] = useState(1);
  const [input, setInput] = useState("");
  const [listOne, setListOne] = useState([]);
  const [listTwo, setListTwo] = useState([]);
  const [listThree, setListThree] = useState([]);

  useEffect(() => {
    const newListActive = listOne?.filter((item) => item?.active === false);
    const newListCompleted = listOne?.filter((item) => item?.active === true);

    if (newListActive) {
      setListTwo(newListActive);
    }
    if (newListCompleted) {
      setListThree(newListCompleted);
    }
  }, [listOne]);

  const statusClick = (name) => {
    if (name === 1) {
      setBegin(1);
    } else if (name === 2) {
      setBegin(2);
    } else if (name === 3) {
      setBegin(3);
    }
  };

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const genId = () => {
    const Id = Math.floor(Math.random() * 100);
    const check = listOne?.find((x) => x.id === Id);
    if (check) {
      genId();
    }
    return Id;
  };

  const actThem = () => {
    if (input) {
      const newUser = {
        id: genId(),
        active: false,
        name: input,
      };
      const newList = [...listOne, newUser];
      setListOne(newList);
      setInput("");
    } else {
      alert("Không được để trống");
    }
  };

  const checkboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const newList = listOne?.map((user) => {
        if (user.id === parseInt(value)) {
          return { ...user, active: true };
        }
        return user;
      });
      setListOne(newList);
    } else {
      const newList = listOne?.map((user) => {
        if (user.id === parseInt(value)) {
          return { ...user, active: false };
        }
        return user;
      });
      setListOne(newList);
    }
  };

  const actXoa = (id) => {
    const updatedList = listOne.filter((item) => item.id !== id);
    const updatedListComplete = listThree.filter((item) => item.id !== id);
    if (updatedListComplete) {
      setListThree(updatedListComplete);
    }
    if (updatedList) {
      setListOne(updatedList);
      localStorage.setItem("ListDetail", JSON.stringify(updatedList));
    }
  };

  const xoaAll = () => {
    setListThree([]);

    const updatedList = listOne.filter(
      (item) => !listThree.some((completedItem) => completedItem.id === item.id)
    );
    setListOne(updatedList);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="testTitle">#todo</h1>
        <div className="header">
          <button
            className={`${begin === 1 ? "header-abc" : ""} abc`}
            type="button"
            onClick={() => {
              statusClick(1);
            }}
          >
            All
          </button>
          <button
            className={`${begin === 2 ? "header-abc" : ""} abc`}
            type="button"
            onClick={() => {
              statusClick(2);
            }}
          >
            Active
          </button>
          <button
            className={`${begin === 3 ? "header-abc" : ""} abc`}
            type="button"
            onClick={() => {
              statusClick(3);
            }}
          >
            Completed
          </button>
        </div>
        {(begin === 1 || begin === 2) && (
          <form className="form-all">
            <input
              className="form-one"
              type="text"
              placeholder="add"
              value={input}
              onChange={inputChange}
            />
            <button className="form-bi" type="button" onClick={actThem}>
              Add
            </button>
          </form>
        )}
        {begin === 1 && (
          <div className="list-tenn">
            {listOne &&
              listOne.map((item) => (
                <div key={item.id} className="checkbox">
                  <input
                    type="checkbox"
                    value={item.id}
                    name={item.name}
                    checked={item.active}
                    onChange={checkboxChange}
                  />
                  <label className={item.active ? "label" : ""}>
                    {item.name}
                  </label>
                </div>
              ))}
          </div>
        )}

        {begin === 2 && (
          <div className="list-nike">
            {listTwo &&
              listTwo.map((item) => (
                <div key={item.id} className="checkbox">
                  <input
                    type="checkbox"
                    value={item.id}
                    name={item.name}
                    checked={item.active}
                    onChange={checkboxChange}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
          </div>
        )}

        {begin === 3 && (
          <div className="list-table">
            {listThree &&
              listThree.map((item) => (
                <div className="delete" key={item.id}>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      value={item.id}
                      name={item.name}
                      checked={item.active}
                      onChange={checkboxChange}
                    />
                    <label className={item.active ? "label" : ""}>
                      {item.name}
                    </label>
                  </div>
                  <button
                    className="delete_lpp"
                    type="button"
                    onClick={() => actXoa(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            <button className="delete-kjl" onClick={xoaAll}>
              Xóa tất cả
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
