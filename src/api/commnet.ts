import { FeedbackForm } from "../pages/projectDetail/section/ProjectFeedback";
import axiosIntercepter from "../util/axiosInstance";

export const createComment = async (
  projectId: number,
  formdata: FeedbackForm
) => {
  const response = await axiosIntercepter.post(
    `comment/${projectId}`,
    formdata,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(response.data.data);
  return response.data.data;
};

// api/comment.ts
export const getComments = async (
  projectId: number,
  page: number = 0,
  size: number = 5
) => {
  const response = await axiosIntercepter.get(`/comment/${projectId}`, {
    params: {
      page,
      size,
    },
  });
  return response.data.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await axiosIntercepter.delete(`comment/${commentId}`);
  // console.log(response.data.data);
  return response.data.data;
};

export const updateComments = async (
  commentId: number,
  formdata: FeedbackForm
) => {
  const response = await axiosIntercepter.put(
    `comment/${commentId}`,
    formdata,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(response.data.data);
  return response.data.data;
};
