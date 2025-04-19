// RewardsSection.tsx
import { faGift, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import styles from "../../../pages/projectCreate/ProjectCreate.module.css";

interface RewardsSectionProps {
  hasReward: boolean;
  baseReward: string;
  bonusRewards: string[];
  newBonusReward: string;
  criteria: string;
  onHasRewardChange: (hasReward: boolean) => void;
  onBaseRewardChange: (reward: string) => void;
  onAddBonusReward: () => void;
  onRemoveBonusReward: (index: number) => void;
  onNewBonusRewardChange: (reward: string) => void;
  onCriteriaChange: (value: string) => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
  hasReward,
  baseReward,
  bonusRewards,
  newBonusReward,
  criteria,
  onHasRewardChange,
  onBaseRewardChange,
  onAddBonusReward,
  onRemoveBonusReward,
  onNewBonusRewardChange,
  onCriteriaChange,
}) => {
  return (
    <div className={styles.formSection}>
      <h2>
        <FontAwesomeIcon icon={faGift} /> 보상 설정
      </h2>
      <div className={styles.formGroup}>
        <label>보상 제공 여부 *</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reward-type"
              checked={hasReward}
              onChange={() => onHasRewardChange(true)}
            />{" "}
            예
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="reward-type"
              checked={!hasReward}
              onChange={() => onHasRewardChange(false)}
            />{" "}
            아니오
          </label>
        </div>
      </div>

      {hasReward && (
        <div id="reward-settings">
          <div className={styles.rewardTier}>
            <div className={styles.rewardTierHeader}>
              <h3 className={styles.rewardTierTitle}>기본 참여 보상 (선택)</h3>
            </div>
            <input
              type="text"
              className={styles.rewardTierInput}
              value={baseReward}
              onChange={(e) => onBaseRewardChange(e.target.value)}
              placeholder="예: 5,000원 상당의 기프티콘"
              required={hasReward}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className={styles.rewardTier}>
            <div className={styles.rewardTierHeader}>
              <h3 className={styles.rewardTierTitle}>
                우수 테스터 추가 보상 (선택) - 엔터키로 추가
              </h3>
            </div>
            <div className={styles.bonusRewardInputContainer}>
              <input
                type="text"
                placeholder="예: TOP 3명, 10,000원 상당의 기프티콘"
                className={styles.rewardTierInput}
                value={newBonusReward}
                onChange={(e) => onNewBonusRewardChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (bonusRewards.length < 3) {
                      onAddBonusReward();
                    } else {
                      toast.error("추가 보상은 최대 3개까지만 추가가능합니다");
                    }
                  }
                }}
              />
            </div>
            {bonusRewards.length > 0 && (
              <ul className={styles.bonusRewardsList}>
                {bonusRewards.map((reward, index) => (
                  <li key={index} className={styles.bonusRewardItem}>
                    <span>{index + 1}. </span>
                    {reward}
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => onRemoveBonusReward(index)}
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.rewardTier}>
            <div className={styles.rewardTierHeader}>
              <h3 className={styles.rewardTierTitle}>우수 테스터 선별 기준</h3>
            </div>
            <input
              type="text"
              value={criteria}
              placeholder="예: 가장 상세한 피드백을 제공한 테스터"
              className={styles.formControl}
              onChange={(e) => onCriteriaChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsSection;
