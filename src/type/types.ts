// types.ts
export interface ProjectSubmitData {
  basicInfo: {
    name: string;
    category: string;
    description: string;
    detailedDescription: string;
    objective: string;
    webLink?: string;
    androidLink?: string;
    iosLink?: string;
  };
  testSettings: {
    newRequirement: string;
    testersCount: number;
    testType: string;
    testDuration: string;
    requirements: string[];
    instructions: string;
    contact: string;
  };
  thumbnailUrl: string;
  mediaFiles: {
    url: string;
    description: string;
  }[];
  rewards: {
    hasReward: boolean;
    baseReward?: string;
    bonusRewards?: string[];
    criteria?: string;
  };
}
// types.ts
export interface ProjectFormState {
  basicInfo: {
    name: string;
    category: string;
    description: string;
    detailedDescription: string;
    objective: string;
    webLink?: string;
    androidLink?: string;
    iosLink?: string;
  };
  testSettings: {
    testersCount: number;
    testType: string;
    testDuration: string;
    requirements: string[];
    newRequirement: string;
    instructions: string;
    contact: string;
  };
  media: {
    thumbnail: string;
    mediaFiles: MediaFile[];
  };
  rewards: {
    hasReward: boolean;
    baseReward: string;
    bonusRewards: string[];
    criteria: string;
  };
}

export interface MediaFile {
  url: string | null; // File 대신 URL만 저장
  description: string;
}
export enum FilterType {
  ALL = "ALL",
  MOBILE = "MOBILE",
  WEB = "WEB",
  REWARD = "REWARD",
  IN_PROGRESS = "IN_PROGRESS", // 테스트 진행중
  COMPLETED = "COMPLETED", // 테스트 종료
  MODIFYING = "MODIFYING", // 수정중
}
