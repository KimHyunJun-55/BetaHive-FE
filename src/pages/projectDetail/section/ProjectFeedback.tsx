import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaEdit,
  FaPaperPlane,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import {
  createComment,
  deleteComment,
  getComments,
  updateComments,
} from "../../../api/commnet";
import styles from "./ProjectFeedback.module.css";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

export interface Feedback {
  commentId: number;
  nickname: string;
  content: string;
  score: number;
  createdAt: string;
  writerId: number;
}

export interface FeedbackForm {
  content: string;
  score: number;
}

const ProjectFeedback: React.FC<{ projectId: any }> = ({ projectId }) => {
  const [score, setScore] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [expandedFeedbackIds, setExpandedFeedbackIds] = useState<number[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const { userId } = useAuth();

  const toggleExpand = (id: number) => {
    setExpandedFeedbackIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사 추가
    if (!feedbackText.trim()) {
      toast.error("댓글을 입력해주세요");
      return;
    }

    const newFeedback = {
      content: feedbackText,
      score: score,
    };

    try {
      await createComment(projectId, newFeedback);
      setFeedbackText("");
      setScore(0);
      const updated = await getComments(projectId);
      setFeedbacks(updated.content);
      toast.success("댓글이 등록되었습니다.");
    } catch (error) {
      console.error("댓글 전송 실패:", error);
      toast.error("댓글 전송하는 중 문제가 발생했습니다.");
    }
  };

  const startEditing = (comment: Feedback) => {
    setEditingCommentId(comment.commentId);
    setEditText(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleEditSubmit = async (commentId: number) => {
    // 유효성 검사 추가
    if (!editText.trim()) {
      toast.error("댓글을 입력해주세요");
      return;
    }

    try {
      const newFeedback = {
        content: editText,
        score: score,
      };
      await updateComments(commentId, newFeedback);
      const updated = await getComments(projectId);
      setFeedbacks(updated.content);
      setEditingCommentId(null);
      setEditText("");
      toast.success("댓글이 수정되었습니다.");
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      toast.error("댓글 수정하는 중 문제가 발생했습니다.");
    }
  };

  const handleDelete = async (commentId: number) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId);
        const updated = await getComments(projectId);
        setFeedbacks(updated.content);
        toast.success("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        toast.error("댓글 삭제하는 중 문제가 발생했습니다.");
      }
    }
  };

  // 줄바꿈으로 인한 높이 계산 함수
  const shouldShowToggle = (content: string, elementId: number) => {
    if (!content) return false;

    // 내용 길이가 100자 이상인 경우
    if (content.length > 100) return true;

    // DOM 요소로 높이 체크 (줄바꿈으로 인한 경우)
    const element = document.getElementById(`feedback-content-${elementId}`);
    if (element) {
      return element.scrollHeight > element.clientHeight;
    }
    return false;
  };

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const updated = await getComments(projectId);
        setFeedbacks(updated.content);
      } catch (err) {
        console.error("댓글 불러오기 실패:", err);
      }
    };

    loadFeedbacks();
  }, [projectId]);

  return (
    <div className={styles.container}>
      {/* Feedback Form */}
      <div className={styles.feedbackForm}>
        <h3 className={styles.sectionTitle}>댓글 작성</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.textareaContainer}>
            <textarea
              className={styles.textarea}
              placeholder="프로젝트에 대해 어떠셨나요? 개발자에게 댓글을 남겨주세요!"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              maxLength={300}
            />
            <span
              className={`${styles.charCount} ${
                feedbackText.length > 250 ? styles.warning : ""
              }`}
            >
              {feedbackText.length} / 300
            </span>
          </div>
          <div className={styles.formFooter}>
            <button type="submit" className={styles.submitButton}>
              <FaPaperPlane className={styles.submitIcon} />
              댓글 등록
            </button>
          </div>
        </form>
      </div>

      {/* Feedback List */}
      <div className={styles.feedbackList}>
        <h3 className={styles.sectionTitle}>댓글 목록 ({feedbacks.length})</h3>
        {feedbacks.length === 0 ? (
          <div className={styles.emptyFeedback}>
            아직 등록된 댓글이 없습니다.
          </div>
        ) : (
          <div className={styles.feedbackItems}>
            {feedbacks.map((feedback) => (
              <div key={feedback.commentId} className={styles.feedbackItem}>
                <div className={styles.feedbackHeader}>
                  <div className={styles.userAvatar}>
                    {feedback.nickname.substring(0, 1)}
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{feedback.nickname}</span>
                    <span className={styles.feedbackDate}>
                      {feedback.createdAt}
                    </span>
                  </div>
                  {userId === feedback.writerId && (
                    <div className={styles.commentActions}>
                      {editingCommentId === feedback.commentId ? (
                        <>
                          <div
                            className={styles.actionButton}
                            onClick={() => handleEditSubmit(feedback.commentId)}
                          >
                            <FaCheck />
                            <span>전송</span>
                          </div>
                          <button
                            className={styles.actionButton}
                            onClick={cancelEditing}
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={styles.actionButton}
                            onClick={() => startEditing(feedback)}
                          >
                            <FaEdit />
                            <span>수정</span>
                          </button>
                          <button
                            className={styles.actionButton}
                            onClick={() => handleDelete(feedback.commentId)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.feedbackText}>
                  {editingCommentId === feedback.commentId ? (
                    <textarea
                      className={styles.editTextarea}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      maxLength={300}
                    />
                  ) : (
                    <>
                      <div
                        id={`feedback-content-${feedback.commentId}`}
                        className={
                          expandedFeedbackIds.includes(feedback.commentId)
                            ? styles.expandedText
                            : styles.collapsedText
                        }
                      >
                        {feedback.content}
                      </div>
                      {shouldShowToggle(
                        feedback.content,
                        feedback.commentId
                      ) && (
                        <div
                          className={styles.toggleButton}
                          onClick={() => toggleExpand(feedback.commentId)}
                        >
                          {expandedFeedbackIds.includes(feedback.commentId) ? (
                            <>접기</>
                          ) : (
                            <>더보기</>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFeedback;
