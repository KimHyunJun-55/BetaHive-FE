import React, { useState } from "react";
import styles from "./ProfileEditModal.module.css";
import { FaTimes, FaCheck } from "react-icons/fa";

interface ProfileEditModalProps {
  currentNickname: string;
  onClose: () => void;
  onSave: (newNickname: string) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  currentNickname,
  onClose,
  onSave,
}) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요");
      return;
    }
    if (nickname.length > 10) {
      setError("닉네임은 10자 이내로 입력해주세요");
      return;
    }
    onSave(nickname);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* 수정 아이콘을 div로 변경 */}
        <div className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </div>

        <h2>프로필 수정</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError("");
              }}
              maxLength={10}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>

          {/* 버튼을 div로 변경 */}
          <div className={styles.buttonGroup}>
            <div className={styles.cancelButton} onClick={onClose}>
              취소
            </div>
            <div
              className={styles.saveButton}
              //   onClick={() => handleSubmit(new Event("submit"))}
            >
              저장
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
