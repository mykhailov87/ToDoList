import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './main.css';

Modal.setAppElement('#root')

function Main(){
  
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
    axios.get('http://localhost:3000/posts')
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
    // TODO: add server request
    // TODO: save data
  }, []);
  
  const handleChange = function (ev) {
    const post = ev.target.value;
    setPostData(post);
  }

  const onClickDelete = function (ev) {
    const id = ev.currentTarget.id;
    setDeleteData(id);
  }

  const handleChangePatch = function (ev) {
    const patch = ev.target.value;
    setPatchData(patch);
  }

  function handleSubmit (event) {
    event.preventDefault();

    axios.post(`http://localhost:3000/posts`, { 
      title: postData,
      author: 'Bogdan'
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
  }

  function handleSubmitDelete (event) {
    event.preventDefault();

    axios.delete(`http://localhost:3000/posts/${deleteData}`)
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
  }

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
          <form onSubmit={handleSubmitDelete}>
            <p id={post.id}
               title={post.title}>
                 {post.title}
            </p>
            <button onClick={openModal}
                    id={post.id}>
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
            <button type="submit" 
                    id={post.id}
                    onClick={onClickDelete}>
                    DELETE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Main;
