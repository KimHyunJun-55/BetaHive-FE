import React, { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaSpinner } from "react-icons/fa";
import styles from "./ProfileEditModal.module.css";
import { checkNickname, updateNickname } from "../../api/auth"; // 닉네임 중복 체크 API 함수 가져오기
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface ProfileEditModalProps {
  currentNickname: string;
  onClose: () => void;
  onNicknameUpdate?: (newNickname: string) => void; // ✅ 추가
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  currentNickname,
  onClose,
  onNicknameUpdate,
}) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastCheckedNickname, setLastCheckedNickname] = useState("");
  const { updateUserName } = useAuth();

  // 닉네임 변경 시 중복 확인 상태 초기화
  useEffect(() => {
    if (nickname !== lastCheckedNickname) {
      setIsAvailable(null);
    }
  }, [nickname, lastCheckedNickname]);

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요");
      return;
    }
    if (nickname === currentNickname) {
      setError("현재 사용 중인 닉네임입니다");
      setIsAvailable(false);
      return;
    }
    if (nickname.length > 10) {
      setError("닉네임은 10자 이내로 입력해주세요");
      setIsAvailable(false);
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const available = await checkNickname(nickname);
      setIsAvailable(available);
      setLastCheckedNickname(nickname);
      if (!available) {
        setError("이미 사용 중인 닉네임입니다");
      }
    } catch (err) {
      setError("닉네임 확인 중 오류가 발생했습니다");
      console.error("닉네임 확인 오류:", err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요");
      return;
    }
    if (nickname.length > 10) {
      setError("닉네임은 10자 이내로 입력해주세요");
      return;
    }
    if (isAvailable !== true) {
      setError("닉네임 중복 확인을 해주세요");
      return;
    }

    try {
      await updateNickname(nickname); // 닉네임 서버에 반영

      onNicknameUpdate?.(nickname);
      updateUserName(nickname);
      localStorage.setItem("userName", nickname); // 새로고침 시 유지
      toast.success(`닉네임이 ${nickname} 으로 변경되었습니다.`);

      onClose(); // 모달 닫기 등
    } catch (error) {
      setError("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 style={{ color: "var(--text)" }}>닉네임 변경</h2>
            <div className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="nickname" style={{ color: "var(--text)" }}>
                새 닉네임
              </label>
              <div className={styles.inputContainer}>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setError("");
                  }}
                  maxLength={10}
                  placeholder="변경할 닉네임을 입력하세요"
                  className={styles.inputField}
                  style={{ color: "var(--text)" }}
                  autoFocus
                />
                <div
                  className={styles.checkButton}
                  onClick={handleCheckNickname}
                  style={{
                    backgroundColor:
                      isAvailable === true ? "#28a745" : "var(--primary)",
                    color: "white",
                  }}
                >
                  {isChecking ? (
                    <FaSpinner className={styles.spinner} />
                  ) : (
                    "중복 확인"
                  )}
                </div>
              </div>
              <div className={styles.statusContainer}>
                <div className={styles.charCount}>{nickname.length}/10</div>
                {isAvailable === true && (
                  <div
                    className={styles.availableText}
                    style={{ color: "#28a745" }}
                  >
                    <FaCheck /> 사용 가능한 닉네임입니다
                  </div>
                )}
              </div>
              {error && (
                <div
                  className={styles.errorMessage}
                  style={{ color: "#ff4d4f" }}
                >
                  {error}
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <div
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={onClose}
                style={{ color: "var(--text)" }}
              >
                취소
              </div>
              <div
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSubmit}
              >
                변경 저장
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
