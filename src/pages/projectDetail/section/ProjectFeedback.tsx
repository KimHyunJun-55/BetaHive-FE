import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import styles from "./ProjectFeedback.module.css";
import { createComment, getComments } from "../../../api/commnet";

export interface Feedback {
  id: number;
  nickname: string;

  content: string;
  score: number;
  createdAt: string; // 서버가 제공하는 날짜 필드
}

export interface FeedbackForm {
  content: string;
  score: number;
}

const ProjectFeedback: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [score, setScore] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

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

      // 새로고침 없이 반영하고 싶다면 다시 불러오기
      const updated = await getComments(projectId);
      setFeedbacks(updated);
    } catch (error) {
      console.error("피드백 전송 실패:", error);
      alert("피드백을 전송하는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await getComments(projectId); // ✅ await 추가
        setFeedbacks(data.content);
        console.log(data);
      } catch (err) {
        console.error("피드백 불러오기 실패:", err);
      }
    };

    loadFeedbacks();
  }, [projectId]);

  return (
    <div className={styles.container}>
      {/* Feedback Form */}
      <div className={styles.feedbackForm}>
        <h3 className={styles.sectionTitle}>피드백 작성</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            placeholder="프로젝트에 대해 어떠셨나요? 개발자에게 피드백이나 댓글을 남겨주세요!"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <div className={styles.formFooter}>
            <div className={styles.ratingContainer}>
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
            </div>
            <div className={styles.submitButton}>
              <FaPaperPlane className={styles.submitIcon} />
              피드백 제출
            </div>
          </div>
        </form>
      </div>

      {/* Feedback List */}
      <div className={styles.feedbackList}>
        <h3 className={styles.sectionTitle}>
          피드백 목록 ({feedbacks.length})
        </h3>
        {feedbacks.length === 0 ? (
          <div className={styles.emptyFeedback}>
            아직 등록된 피드백이 없습니다.
          </div>
        ) : (
          <div className={styles.feedbackItems}>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className={styles.feedbackItem}>
                <div className={styles.feedbackHeader}>
                  {/* <div className={styles.userAvatar}>{feedback.avatar}</div> */}
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{feedback.nickname}</span>
                    <span>•</span>
                    <span className={styles.feedbackDate}>
                      {feedback.createdAt}
                    </span>
                  </div>
                  <div className={styles.feedbackRating}>
                    {Array(feedback.score)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} className={styles.filledStar} />
                      ))}
                  </div>
                </div>
                <div className={styles.feedbackText}>{feedback.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFeedback;
