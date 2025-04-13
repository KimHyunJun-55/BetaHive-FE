import React from "react";
import styles from "./ProjectCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useProjectForm } from "../../hooks/useProjectHook";
import BasicInfoSection from "../../components/project/section/BasicInfoSection";
import MediaSection from "../../components/project/section/MediaSection";
import TestSettingsSection from "../../components/project/section/TestSettingsSection";
import RewardsSection from "../../components/project/section/RewardsSection";
import { toast } from "react-toastify";

const CreateProject: React.FC = () => {
  const {
    formState,
    isSubmitting,
    uploadProgress,
    updateField,
    handleThumbnailUpload,
    handleMediaUpload,
    handleAddMedia,
    handleDeleteMedia,
    handleAddRequirement,
    handleRemoveRequirement,
    handleAddBonusReward,
    handleRemoveBonusReward,
    handleSubmit,
    resetForm,
  } = useProjectForm();
  // console.log("렌더링되는 mediaFiles:", formState.media.mediaFiles);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>새 프로젝트 등록</h1>
          <div className={styles.pageActions}>
            <button className={`${styles.btn} ${styles.btnOutline}`}>
              <FontAwesomeIcon icon={faQuestionCircle} /> 가이드 보기
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <BasicInfoSection
            formState={formState.basicInfo}
            onFieldChange={(field, value) =>
              updateField("basicInfo", field, value)
            }
          />

          <MediaSection
            thumbnailUrl={formState.media.thumbnail}
            thumbnailDescription={formState.media.thumbnailDescription}
            mediaFiles={formState.media.mediaFiles}
            onThumbnailUpload={handleThumbnailUpload}
            onThumbnailDescriptionChange={(desc) =>
              updateField("media", "thumbnailDescription", desc)
            }
            onMediaUpload={handleMediaUpload}
            onAddMedia={handleAddMedia}
            onDeleteMedia={handleDeleteMedia}
            onMediaDescriptionChange={(index, desc) => {
              const newFiles = [...formState.media.mediaFiles];
              newFiles[index].description = desc;
              updateField("media", "mediaFiles", newFiles);
            }}
            uploadProgress={uploadProgress}
          />

          <TestSettingsSection
            testersCount={formState.testSettings.testersCount}
            testType={formState.testSettings.testType}
            testDuration={formState.testSettings.testDuration}
            requirements={formState.testSettings.requirements}
            newRequirement={formState.testSettings.newRequirement}
            instructions={formState.testSettings.instructions} // 추가
            contact={formState.testSettings.contact} // 추가
            onInstructionsChange={(value) =>
              updateField("testSettings", "instructions", value)
            }
            onContactChange={(value) =>
              updateField("testSettings", "contact", value)
            }
            onTestersCountChange={(count) =>
              updateField("testSettings", "testersCount", count)
            }
            onTestTypeChange={(type) =>
              updateField("testSettings", "testType", type)
            }
            onTestDurationChange={(duration) =>
              updateField("testSettings", "testDuration", duration)
            }
            onAddRequirement={handleAddRequirement}
            onRemoveRequirement={handleRemoveRequirement}
            onNewRequirementChange={(requirement) =>
              updateField("testSettings", "newRequirement", requirement)
            }
          />

          <RewardsSection
            hasReward={formState.rewards.hasReward}
            baseReward={formState.rewards.baseReward}
            bonusRewards={formState.rewards.bonusRewards}
            newBonusReward={formState.rewards.newBonusReward}
            onHasRewardChange={(hasReward) =>
              updateField("rewards", "hasReward", hasReward)
            }
            onBaseRewardChange={(reward) =>
              updateField("rewards", "baseReward", reward)
            }
            onAddBonusReward={handleAddBonusReward}
            onRemoveBonusReward={handleRemoveBonusReward}
            onNewBonusRewardChange={(reward) =>
              updateField("rewards", "newBonusReward", reward)
            }
          />

          <div className={styles.formActions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={resetForm}
            >
              <FontAwesomeIcon icon={faTimes} /> 취소
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "등록 중..."
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} /> 프로젝트 등록
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProject;
