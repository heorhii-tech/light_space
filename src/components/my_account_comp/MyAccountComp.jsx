import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMyAcc from "../../hooks/useMyAcc";

function MyAccountComp() {
  const {
    fetchUserData,
    uploadAvatar,
    setFile,
    handleUpdateName,
    handleUpdateTel,
    handleUnLogin,
    name,
    setName,
    tel,
    setTel,
    file,
  } = useMyAcc();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.uid) {
      fetchUserData();
    }
  }, [user.uid]);

  return (
    <div className="account_wrapper">
      <img
        className="avatar"
        src={user.avatar || "default-avatar.png"}
        alt="User Avatar"
      />

      <div className="user_info">
        <p className="user_name">Name: {user.name || "Loading..."}</p>
        <p className="user_email">Email: {user.email || "Loading..."}</p>
        <p className="user_tel">Tel: {user.tel || "Loading..."}</p>
      </div>

      <form className="input_group">
        <input
          type="text"
          placeholder="New name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button onClick={handleUpdateName}>Change Name</button>
      </form>

      <div className="input_group">
        <input
          type="text"
          placeholder="New tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />
        <button onClick={handleUpdateTel}>Change Tel</button>
      </div>

      <div className="input_group">
        <input
          type="file"
          defaultValue={file}
          onChange={(event) => setFile(event.target.files[0])}
        />
        <button onClick={() => uploadAvatar(file, user.uid)}>
          Upload Photo
        </button>
      </div>

      <button onClick={handleUnLogin}>Exit</button>
    </div>
  );
}

export default MyAccountComp;
