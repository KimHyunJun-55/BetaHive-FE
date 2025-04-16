import React from "react";
import styles from "./ConfirmDeleteModal.module.css"; // 필요 시 스타일 모듈로 분리

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3>정말 삭제할까요?</h3>
        <p>삭제한 프로젝트는 되돌릴 수 없어요.</p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            취소
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
