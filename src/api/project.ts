// post.ts
import { ProjectSubmitData } from "../type/types";
import axiosIntercepter from "../util/axiosInstance";
import { projects } from "../data/dummy";

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
// 프로젝트 생성 API
export const updateProject = async (
  projectId: number,
  projectData: ProjectSubmitData
) => {
  try {
    const response = await axiosIntercepter.put(
      `/product/${projectId}`,
      projectData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

export const updateStatus = async (projectId: number, status: string) => {
  const response = await axiosIntercepter.patch(`product/${projectId}/status`, {
    status,
  });
  return response.data.data;
};

export const getAllProject = async (
  page: number,
  size: number,
  params: Record<string, any> = {}
) => {
  const response = await axiosIntercepter.get("/product", {
    params: {
      page,
      size,
      ...params,
    },
  });
  return response.data.data;
};

//내가등록한 프로젝트 조회
export const getMyProjects = async (page: number, size: number = 8) => {
  const response = await axiosIntercepter.get("/product/my-project", {
    params: { page, size },
  });
  return response.data.data;
};

export const checkBookmarkStatus = async (numericId: number) => {
  const response = await axiosIntercepter.get(`/bookmark/${numericId}`);
  return response.data.data;
};
