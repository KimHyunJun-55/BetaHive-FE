// post.ts
import { ProjectSubmitData } from "../type/types";
import axiosIntercepter from "../util/axiosInstance";

// 파일 업로드 전용 API
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosIntercepter.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      console.log(`파일 업로드 진행률: ${percentCompleted}%`);
    },
  });
  console.log(response.data);

  return response.data; // 서버에서 반환된 파일 URL
};

// 프로젝트 생성 API
export const createProject = async (projectData: ProjectSubmitData) => {
  try {
    const response = await axiosIntercepter.post("/product", projectData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

export const fetchProjectDetails = async (projectId: number) => {
  const response = await axiosIntercepter.get(`product/${projectId}`);
  // console.log(response.data.data);
  return response.data.data;
};

export const getAllProject = async () => {
  const response = await axiosIntercepter.get(`product`);
  return response.data.data;
};
