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

export const getComments = async (projectId: number) => {
  const response = await axiosIntercepter.get(`comment/${projectId}`);
  // console.log(response.data.data);
  return response.data.data;
};
