import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './main.css';

Modal.setAppElement('#root');

function Main() {
  let [data, setData] = useState([]);
  let [postData, setPostData] = useState('');
  let [deleteData, setDeleteData] = useState();
  let [patchDataId, setPatchDataId] = useState();
  let [patchData, setPatchData] = useState('');

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3004/posts')
      .then((response) => {
        const post = response.data;
        setData(post);
        console.log(post);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      // TODO: add server request
      // TODO: save data
  }, []);

  const handleChange = useCallback((ev) => {
    const post = ev.target.value;
    setPostData(post);
  }, []);

  const onClickDelete = useCallback((ev) => {
    const id = ev.currentTarget.id;
    setDeleteData(id);
  }, []);

  const handleChangePatch = useCallback((ev) => {
    const patch = ev.target.value;
    setPatchData(patch);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    axios.post(`http://localhost:3004/posts`, {
      title: postData,
      author: 'Bogdan'
     })
      .then(() => axios.get('http://localhost:3004/posts'))
      .then((response) => {
        const post = response.data;
        setData(post);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }, [postData]);

  const handleSubmitDelete = useCallback((event) => {
    event.preventDefault();

    // axios.delete(`http://localhost:3004/posts/${deleteData}`)
    //   .then(() => axios.get('http://localhost:3004/posts'))
    //   .then((response) => {
    //     const post = response.data;
    //     setData(post);
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.log(error);
    //   })
  }, [deleteData]);

  function handleSubmitPatch (event) {
    event.preventDefault();

    axios.patch(`http://localhost:3000/posts/${patchDataId}`, {
      title: patchData
    })
     .then(function () {
      return axios.get('http://localhost:3000/posts')
    })
    .then(function (response) {
      const post = response.data;
      setData(post);
      console.log(post);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

    setIsOpen(false);
  }


  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal(ev) {
    const id = ev.currentTarget.id;
    setPatchDataId(id);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal(){
    setIsOpen(false);
  }

  return(
    <div className="main">
      <form className="inputfield" onSubmit={handleSubmit}>
        <input
          onChange = {handleChange}
          type="text"
          id="input"
          placeholder="What shall I do today?"
          value={postData}
        />
        <button>+</button>
      </form>

      <div id="textfield">
        {data.map((post) =>
          <form key={post.id} onSubmit={handleSubmitDelete}>
            <p id={post.id} title={post.title}>
               {post.title}
            </p>
            <button onClick={openModal} id={post.id}>
              EDIT
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}

              contentLabel="Example Modal"
            >
              <button onClick={closeModal}>close</button>
              <form onSubmit={handleSubmitPatch}>
                <input
                  onChange = {handleChangePatch}
                  type="text"
                  id="input"
                  placeholder="What shall I do today?"
                  value={patchData}
                />
                <button>Apply</button>
              </form>
            </Modal>
            <SubmitButton
              id={post.id}
              onClickHandler={onClickDelete}
            />
          </form>
        )}
      </div>
    </div>
  );
}

function SubmitButton(props) {
  const { id, onClickHandler } = props;
  return (
    <button
      type="submit"
      id={id}
      onClick={onClickHandler}
    >
      DELETE
    </button>
  );
}

export default Main;
