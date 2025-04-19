// post.ts
import { ProjectSubmitData } from "../type/types";
import axiosIntercepter from "../util/axiosInstance";

// 프로젝트 생성 API
export const createProject = async (projectData: any) => {
  try {
    const response = await axiosIntercepter.post("/project", projectData, {
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
export const updateProject = async (projectId: number, projectData: any) => {
  try {
    const response = await axiosIntercepter.put(
      `/project/${projectId}`,
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
  const response = await axiosIntercepter.get(`project/${projectId}`);
  // console.log(response.data.data);
  return response.data.data;
};

export const deleteProject = async (projectId: number) => {
  const response = await axiosIntercepter.delete(`/project/${projectId}`);
  return response.data.data;
};

export const updateStatus = async (projectId: number, status: string) => {
  const response = await axiosIntercepter.patch(`project/${projectId}/status`, {
    status,
  });
  return response.data.data;
};

export const getAllProject = async (
  page: number,
  size: number,
  params: Record<string, any> = {}
) => {
  const response = await axiosIntercepter.get("/project", {
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
  const response = await axiosIntercepter.get("/project/my-project", {
    params: { page, size },
  });
  return response.data.data;
};

export const getBookmarkedProjects = async (page: number, size: number = 8) => {
  const response = await axiosIntercepter.get("/project/bookmarked", {
    params: { page, size },
  });
  return response.data.data;
};

export const checkBookmarkStatus = async (numericId: number) => {
  const response = await axiosIntercepter.get(`/bookmark/${numericId}`);
  return response.data.data;
};
