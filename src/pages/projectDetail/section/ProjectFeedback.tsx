import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import styles from "./ProjectFeedback.module.css";
import { createComment, getComments } from "../../../api/commnet";

export interface Feedback {
  id: number;
  nickname: string;
  content: string;
  score: number;
  createdAt: string;
}

export interface FeedbackForm {
  content: string;
  score: number;
}

const ProjectFeedback: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [score, setScore] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [expandedFeedbackIds, setExpandedFeedbackIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedFeedbackIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("댓글 전송 실패:", error);
      alert("댓글 전송하는 중 문제가 발생했습니다.");
    }
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
            {/* <div className={styles.ratingContainer}>
              <span className={styles.ratingLabel}>평점:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setScore(star)}
                  className={styles.star}
                >
                  {star <= score ? (
                    <FaStar className={styles.filledStar} />
                  ) : (
                    <FaRegStar className={styles.emptyStar} />
                  )}
                </span>
              ))}
            </div> */}
            <div className={styles.submitButton} onClick={handleSubmit}>
              <FaPaperPlane className={styles.submitIcon} />
              댓글 등록
            </div>
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
              <div key={feedback.id} className={styles.feedbackItem}>
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
                </div>
                <div className={styles.feedbackText}>
                  <div
                    className={
                      expandedFeedbackIds.includes(feedback.id)
                        ? styles.expandedText
                        : styles.collapsedText
                    }
                  >
                    {feedback.content}
                  </div>
                  {feedback.content && feedback.content.length > 100 && (
                    <div
                      className={styles.toggleButton}
                      onClick={() => toggleExpand(feedback.id)}
                    >
                      {expandedFeedbackIds.includes(feedback.id) ? (
                        <>접기</>
                      ) : (
                        <>더보기</>
                      )}
                    </div>
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
