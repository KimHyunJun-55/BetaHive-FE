import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject, uploadFile } from "../api/project";
import { MAX_MEDIA_FILES } from "../type/contants";
import { MediaFile, ProjectFormState } from "../type/types";

const initialFormState: ProjectFormState = {
  basicInfo: {
    name: "test",
    category: "mobile",
    description: "test",
    detailedDescription: "test",
    objective: "",
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
    thumbnail: "ttt",
    mediaFiles: [] as MediaFile[],
  },
  rewards: {
    hasReward: false,
    baseReward: "",
    bonusRewards: [],
    newBonusReward: "",
  },
};

export const useProjectForm = () => {
  const [formState, setFormState] =
    useState<ProjectFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      formState.media.mediaFiles.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });

      // thumbnail이 File 객체인지 확인
      if (
        formState.media.thumbnail &&
        formState.media.thumbnail instanceof File
      ) {
        URL.revokeObjectURL(URL.createObjectURL(formState.media.thumbnail));
      }
    };
  }, [formState.media]);

  // 파일 업로드 처리

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

  // const resetForm = useCallback(() => {
  //   setFormState(initialFormState);
  //   setUploadedThumbnailUrl("");
  //   setUploadedMediaUrls([]);
  //   setUploadProgress(0);
  // }, []);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("폼 제출 시작");

      // 유효성 검사
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        alert(validationErrors.join("\n"));
        return;
      }

      setIsSubmitting(true);

      try {
        // 최종 전송 데이터 구성
        const projectData = {
          ...formState.basicInfo,
          ...formState.testSettings,
          thumbnailUrl: formState.media.thumbnail, // 이미 업로드된 썸네일 URL
          thumbnailDescription: formState.media.thumbnailDescription,
          mediaFiles: formState.media.mediaFiles
            .filter((media) => media.url) // URL이 있는 항목만 필터링
            .map((media) => ({
              url: media.url,
              description: media.description,
            })),
          ...formState.rewards,
        };

        console.log("최종 전송 데이터:", JSON.stringify(projectData, null, 2));

        // API 호출
        const projectId = await createProject(projectData);
        console.log(projectId);
        toast.success("프로젝트가 성공적으로 등록되었습니다.");
        navigate(`/projects/detail/${projectId}`);

        // 폼 초기화 (필요시)
        // setFormState(initialFormState);
      } catch (error) {
        console.error("프로젝트 생성 오류:", error);
        alert("프로젝트 등록에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validateForm]
  );

  return {
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
  };
};
