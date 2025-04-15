import {
  faCheck,
  faQuestionCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicInfoSection from "../../components/project/section/BasicInfoSection";
import MediaSection from "../../components/project/section/MediaSection";
import RewardsSection from "../../components/project/section/RewardsSection";
import TestSettingsSection from "../../components/project/section/TestSettingsSection";
import { useProjectForm } from "../../hooks/useProjectHook";
import styles from "./ProjectCreate.module.css";
import { fetchProjectDetails } from "../../api/project";
const CreateProject: React.FC = () => {
  const { projectId } = useParams();
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
  } = useProjectForm(projectId);
  // console.log("렌더링되는 mediaFiles:", formState.media.mediaFiles);
  useEffect(() => {
    if (projectId) {
      const fetchProjectData = async () => {
        const data = await fetchProjectDetails(Number(projectId));
        console.log(data);
        // useProjectForm의 resetForm 또는 초기화 로직으로 데이터 채우기
        resetForm(data); // 가정: useProjectForm에 resetForm 함수가 있다면
      };
      fetchProjectData();
    }
  }, [projectId]);
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {projectId ? "프로젝트 수정" : "새 프로젝트 등록"}
          </h1>
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
            mediaFiles={formState.media.mediaFiles}
            onThumbnailUpload={handleThumbnailUpload}
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
            criteria={formState.rewards.criteria}
            onCriteriaChange={(value) =>
              updateField("rewards", "criteria", value)
            }
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
                projectId ? (
                  "수정 중..."
                ) : (
                  "등록 중..."
                )
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} />
                  {projectId ? "프로젝트 수정" : "프로젝트 등록"}
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
