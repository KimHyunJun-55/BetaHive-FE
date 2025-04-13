import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "../ProjectDetail.module.css";

interface Feedback {
  id: string;
  user: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

const ProjectFeedback: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.length < 300) {
      alert("피드백은 300자 이상 작성해주세요.");
      return;
    }

    const newFeedback: Feedback = {
      id: `f${feedbacks.length + 1}`,
      user: "나",
      date: new Date().toISOString().split("T")[0],
      rating: feedbackRating,
      text: feedbackText,
      avatar: "나",
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setFeedbackText("");
    setFeedbackRating(0);
  };

  return (
    <div className={styles.feedbackContent}>
      <div className={styles.feedbackForm}>
        <h3>피드백 작성</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="프로젝트에 대한 피드백을 자세히 작성해주세요 (최소 300자)"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <div className={styles.ratingInput}>
            <span>평점: </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setFeedbackRating(star)}
                className={styles.star}
              >
                {star <= feedbackRating ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>
          <button type="submit">피드백 제출</button>
        </form>
      </div>

      <div className={styles.feedbackList}>
        <h3>피드백 목록 ({feedbacks.length})</h3>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className={styles.feedbackItem}>
            <div className={styles.feedbackHeader}>
              <div className={styles.userAvatar}>{feedback.avatar}</div>
              <div className={styles.userInfo}>
                <span>{feedback.user}</span>
                <span>{feedback.date}</span>
              </div>
              <div className={styles.feedbackRating}>
                {Array(feedback.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
            </div>
            <p>{feedback.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFeedback;
