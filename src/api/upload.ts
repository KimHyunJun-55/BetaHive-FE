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
      // console.log(`파일 업로드 진행률: ${percentCompleted}%`);
    },
  });

  return response.data.data; // 서버에서 반환된 파일 URL
};
