import axios from "axios";
import { useEffect, useState } from "react";
import css from "./Input.module.css";
import Modal from "../modal/Modal";

const url = "https://0862a5cfa13ed70e.mokky.dev/todos";

const Input = () => {
  const [data, setData] = useState([]);
  const [valueImg, setValueImg] = useState("");
  const [valueText, setValueText] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [putClicked, setPutClicked] = useState(false);

  const openModal = (id) => {
    setSelectedItemId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItemId(null);
    setModalOpen(false);
  };

  const handleAdd = async () => {
    if (valueDate === "" || valueImg === "" || valueText === "") {
      alert("write something");
    } else {
      const newData = {
        img: valueImg,
        text: valueText,
        date: valueDate,
      };
      try {
        const response = await axios.post(url, newData);
        setData([...data, response.data]);
        setValueImg("");
        setValueText("");
        setValueDate("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getRequest = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((item) => item.id !== id));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const putRequest = async (id) => {
    try {
      await axios.put(`${url}/${id}`);
      setPutClicked(true);
      setTimeout(() => setPutClicked(false), 1000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="img"
        value={valueImg}
        onChange={(e) => setValueImg(e.target.value)}
      />
      <input
        type="text"
        placeholder="title"
        value={valueText}
        onChange={(e) => setValueText(e.target.value)}
      />
      <input
        type="date"
        value={valueDate}
        onChange={(e) => setValueDate(e.target.value)}
      />
      <button onClick={handleAdd}>add</button>
      <div className={css.items}>
        {data.map((item) => (
          <div className={css.aside} key={item.id}>
            <h3>{item.text}</h3>
            <img src={item.img} alt="image" />
            <p>{item.date}</p>
            <button
              onClick={() => putRequest(item.id)}
              className={putClicked ? css.putClicked : ""}
            >
              put
            </button>
            <button onClick={() => openModal(item.id)}>delete</button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className={css.modal}>
          <h3>Вы точно хотите удалить?</h3>
          <button onClick={() => deleteItem(selectedItemId)}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default Input;
