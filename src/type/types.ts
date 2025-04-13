// types.ts
export interface ProjectSubmitData {
  basicInfo: {
    name: string;
    category: string;
    description: string;
    detailedDescription: string;
    objective: string;
  };
  testSettings: {
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
  };
}

export interface MediaFile {
  url: string | null; // File 대신 URL만 저장
  description: string;
}
