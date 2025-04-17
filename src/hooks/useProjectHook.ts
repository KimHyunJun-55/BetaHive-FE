import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject, updateProject, uploadFile } from "../api/project";
import { MAX_MEDIA_FILES } from "../type/contants";
import { MediaFile, ProjectFormState } from "../type/types";

const initialFormState: ProjectFormState = {
  basicInfo: {
    name: "",
    category: "",
    description: "",
    detailedDescription: "",
    objective: "",
    webLink: "",
    androidLink: "",
    iosLink: "",
  },
  testSettings: {
    testersCount: 50,
    testType: "functional",
    testDuration: "7",
    requirements: [],
    newRequirement: "",
    instructions: "",
    contact: "",
  },
  media: {
    thumbnail: "",
    mediaFiles: [] as MediaFile[],
  },
  rewards: {
    hasReward: false,
    baseReward: "",
    bonusRewards: [],
    criteria: "",
  },
};

export const useProjectForm = (projectId?: string | undefined) => {
  const numericProjectId = projectId ? Number(projectId) : undefined;

  const [formState, setFormState] =
    useState<ProjectFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  // 미리보기 URL 정리
  console.log(formState);
  const inflateFormData = (data: any) => ({
    basicInfo: {
      name: data.name,
      category: data.category,
      description: data.description,
      detailedDescription: data.detailedDescription,
      objective: data.objective,
      webLink: data.webLink,
      androidLink: data.androidLink,
      iosLink: data.iosLink,
    },
    testSettings: {
      testersCount: data.testersCount,
      testType: data.testType,
      testDuration: data.testDuration,
      requirements: data.requirements || [],
      newRequirement: "",
      instructions: data.instructions,
      contact: data.contact,
    },
    media: {
      thumbnail: data.thumbnailUrl,
      thumbnailDescription: data.thumbnailDescription || "",
      mediaFiles: data.mediaFiles || [],
    },
    rewards: {
      hasReward: data.hasReward,
      baseReward: data.baseReward,
      bonusRewards: data.bonusRewards || [],
      newBonusReward: "",
      criteria: data.criteria,
    },
  });

  // 폼 필드 업데이트 함수들
  const updateField = useCallback(
    (section: keyof ProjectFormState, field: string, value: any) => {
      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    },
    []
  );

  const handleThumbnailUpload = useCallback(async (file: File) => {
    try {
      const uploadedUrl = await uploadFile(file);
      setFormState((prev) => ({
        ...prev,
        media: {
          ...prev.media,
          thumbnail: uploadedUrl,
        },
      }));
    } catch (error) {
      console.error("썸네일 업로드 실패:", error);
    }
  }, []);

  // useProjectForm.ts
  const handleAddMedia = useCallback(() => {
    setFormState((prev) => {
      // console.log("현재 mediaFiles 상태:", prev.media.mediaFiles);
      if (prev.media.mediaFiles.length >= MAX_MEDIA_FILES) return prev;
      const updated = {
        ...prev,
        media: {
          ...prev.media,
          mediaFiles: [
            ...prev.media.mediaFiles,
            { url: null, description: "" },
          ],
        },
      };
      // console.log("업데이트할 mediaFiles 상태:", updated.media.mediaFiles);
      return updated;
    });
  }, []);

  const handleMediaUpload = useCallback(async (index: number, file: File) => {
    try {
      const uploadedUrl = await uploadFile(file);
      setFormState((prev) => {
        const newMediaFiles = [...prev.media.mediaFiles];
        newMediaFiles[index] = {
          ...newMediaFiles[index],
          url: uploadedUrl,
        };
        return {
          ...prev,
          media: {
            ...prev.media,
            mediaFiles: newMediaFiles,
          },
        };
      });
    } catch (error) {
      console.error("미디어 업로드 실패:", error);
    }
  }, []);

  const handleDeleteMedia = useCallback((index: number) => {
    setFormState((prev) => {
      const newMediaFiles = [...prev.media.mediaFiles];
      newMediaFiles.splice(index, 1);
      return {
        ...prev,
        media: {
          ...prev.media,
          mediaFiles: newMediaFiles,
        },
      };
    });
  }, []);

  const handleAddRequirement = useCallback(() => {
    const { newRequirement, requirements } = formState.testSettings;
    if (
      newRequirement.trim() &&
      !requirements.includes(newRequirement.trim())
    ) {
      setFormState((prev) => ({
        ...prev,
        testSettings: {
          ...prev.testSettings,
          requirements: [
            ...prev.testSettings.requirements,
            newRequirement.trim(),
          ],
          newRequirement: "",
        },
      }));
    }
  }, [formState.testSettings]);

  const handleRemoveRequirement = useCallback((index: number) => {
    setFormState((prev) => {
      const newRequirements = [...prev.testSettings.requirements];
      newRequirements.splice(index, 1);
      return {
        ...prev,
        testSettings: {
          ...prev.testSettings,
          requirements: newRequirements,
        },
      };
    });
  }, []);

  const handleAddBonusReward = useCallback(() => {
    if (formState.rewards.newBonusReward.trim()) {
      setFormState((prev) => ({
        ...prev,
        rewards: {
          ...prev.rewards,
          bonusRewards: [
            ...prev.rewards.bonusRewards,
            formState.rewards.newBonusReward.trim(),
          ],
          newBonusReward: "",
        },
      }));
    }
  }, [formState.rewards.newBonusReward]);

  const handleRemoveBonusReward = useCallback((index: number) => {
    setFormState((prev) => {
      const newBonusRewards = [...prev.rewards.bonusRewards];
      newBonusRewards.splice(index, 1);
      return {
        ...prev,
        rewards: {
          ...prev.rewards,
          bonusRewards: newBonusRewards,
        },
      };
    });
  }, []);

  const resetForm = (data: any) => {
    const inflated = inflateFormData(data);
    setFormState(inflated);
  };

  const validateForm = useCallback(() => {
    const errors = [];
    if (!formState.basicInfo.name.trim())
      errors.push("프로젝트 이름을 입력해주세요");
    if (!formState.basicInfo.category) errors.push("카테고리를 선택해주세요");
    if (!formState.media.thumbnail)
      errors.push("썸네일 이미지를 업로드해주세요");
    if (formState.rewards.hasReward && !formState.rewards.baseReward.trim()) {
      errors.push("기본 참여 보상을 입력해주세요");
    }
    return errors;
  }, [formState]);

  const flattenFormData = (formState: ProjectFormState) => {
    return {
      ...formState.basicInfo,
      ...formState.testSettings,
      thumbnailUrl: formState.media.thumbnail,
      mediaFiles: formState.media.mediaFiles.filter((m) => m.url),
      ...formState.rewards,
    };
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("폼 제출 시작");

      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
        return;
      }

      setIsSubmitting(true);

      try {
        const projectData = flattenFormData(formState);
        console.log("최종 전송 데이터:", JSON.stringify(projectData, null, 2));

        let resultProjectId;

        if (projectId) {
          await updateProject(Number(numericProjectId), projectData);
          toast.success("프로젝트가 성공적으로 수정되었습니다.");
          resultProjectId = projectId;
        } else {
          const newProjectId = await createProject(projectData);
          toast.success("프로젝트가 성공적으로 등록되었습니다.");
          resultProjectId = newProjectId;
        }

        navigate(`/projects/detail/${resultProjectId}`);
      } catch (error) {
        console.error("프로젝트 저장 오류:", error);
        alert("프로젝트 저장에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validateForm, numericProjectId]
  );

  return {
    formState,
    isSubmitting,
    uploadProgress,
    resetForm,
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
  };
};
