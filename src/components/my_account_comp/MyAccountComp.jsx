import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMyAcc from "../../hooks/useMyAcc";
import LineLoader from "../common/skeletons/LineLoader";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

import useModalChangeName from "../../hooks/useModalChangeName";
import ModalChangeMyData from "../modalChangeMyData/ModalChangeMyData.jsx";
import useModalChangeTel from "../../hooks/useModalChangeTel";
import useModalChangeAvatar from "../../hooks/useModalChangeAvatar";
import ButtonUniversal from "../common/buttons/ButtonUniversal";
import CircularLoader from "../common/skeletons/CircularLoader";

function MyAccountComp() {
  const { handleUnLogin } = useMyAcc();

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
    isloading,
  } = useModalChangeAvatar();

  return (
    <div className="my_acc_wrapper">
      <div className="my_acc_avatar">
        {isloading ? (
          <CircularLoader />
        ) : (
          <div className="my_acc_edit_wrapper">
            {user.avatar ? (
              <>
                <img className="avatar" src={user.avatar} />
              </>
            ) : (
              <Avatar shape="square" size={128} icon={<UserOutlined />} />
            )}

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
              editButtonText={`EDIT AVATAR`}
            />
          </div>
        )}
      </div>
      <div className="my_acc_info_wrapper">
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
              editButtonText={`EDIT NAME`}
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
              type={`number`}
              editButtonText={`EDIT NUMBER`}
            />
          </div>
        </form>
        <form className="my_acc_email">
          <div className="my_acc_edit_wrapper">
            {user.email ? <p>{user.email}</p> : <LineLoader />}
          </div>
        </form>

        <ButtonUniversal
          className={"primary-button button"}
          title={`LOG OUT`}
          func={handleUnLogin}
        />
      </div>
    </div>
  );
}

export default MyAccountComp;
