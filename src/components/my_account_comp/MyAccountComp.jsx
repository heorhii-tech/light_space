import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMyAcc from "../../hooks/useMyAcc";
import edit from "../../assets/edit.png";
import AvatarLoader from "../skeletons/AvatarLoader";
import LineLoader from "../skeletons/LineLoader";

import useModalChangeName from "../../hooks/useModalChangeName";
import ModalChangeMyData from "../modalChangeMyData/modalChangeMyData";
import useModalChangeTel from "../../hooks/useModalChangeTel";
import useModalChangeAvatar from "../../hooks/useModalChangeAvatar";

function MyAccountComp() {
  const {
    fetchUserData,
    file,
    setFile,
    handleUnLogin,

    setChangeName,
    changeName,
    changePhone,
    setChangePhone,
  } = useMyAcc();

  const user = useSelector((state) => state.user);
  const {
    showModalName,
    handleCancelName,
    isModaNameOpen,
    handleUpdateName,
    name,
    setName,
  } = useModalChangeName();

  const {
    tel,
    setTel,
    showModalTel,
    handleCancelTel,
    handleUpdateTel,
    isModaTelOpen,
  } = useModalChangeTel();
  const {
    setAvatar,
    avatar,
    showModalAvatar,
    handleCancelAvatar,
    isModAvatarOpen,
    uploadAvatar,
  } = useModalChangeAvatar();

  useEffect(() => {
    if (user.uid) {
      fetchUserData();
    }
  }, [user.uid]);

  return (
    <>
      <div className="my_acc_wrapper">
        {user.avatar ? (
          <div className="my_acc_edit_wrapper">
            <img className="avatar" src={user.avatar} />
            <ModalChangeMyData
              isModalOpen={isModAvatarOpen}
              handleUpdate={uploadAvatar}
              handleCancel={handleCancelAvatar}
              showModal={showModalAvatar}
              setData={setAvatar}
              data={avatar}
              placeholder={"New name"}
              title={"Change avatar"}
              type={`file`}
              user={user}
              file={avatar}
            />
          </div>
        ) : (
          <AvatarLoader />
        )}
        <form className="my_acc_name">
          <div className="my_acc_edit_wrapper">
            {user.name ? <p>{user.name}</p> : <LineLoader />}
            <ModalChangeMyData
              isModalOpen={isModaNameOpen}
              handleUpdate={handleUpdateName}
              handleCancel={handleCancelName}
              showModal={showModalName}
              setData={setName}
              data={name}
              placeholder={"New name"}
              title={"Change name"}
              type={`text`}
            />
          </div>
        </form>
        <form onSubmit={handleUpdateTel} className="my_acc_number">
          <div className="my_acc_edit_wrapper">
            {user.tel ? <p>{user.tel}</p> : <LineLoader />}
            <ModalChangeMyData
              isModalOpen={isModaTelOpen}
              handleUpdate={handleUpdateTel}
              handleCancel={handleCancelTel}
              showModal={showModalTel}
              setData={setTel}
              data={tel}
              placeholder={"New number"}
              title={"Change number"}
              type={`text`}
            />
          </div>
        </form>
        <form className="my_acc_email">
          <div className="my_acc_edit_wrapper">
            {user.email ? <p>{user.email}</p> : <LineLoader />}
          </div>
        </form>
        <button className="my_acc_logout" onClick={handleUnLogin}>
          LOGOUT
        </button>
      </div>
    </>
  );
}

export default MyAccountComp;
