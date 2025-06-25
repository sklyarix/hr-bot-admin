import { instance } from "../helpers/api.tsx";

const URL = "/job_applications";

export const jobApplicationService = {
  getAll: async () => {
    try {
      const { data } = await instance.get(`${URL}`);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
/*

try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении job_responses:", error);
    return [];
  }


 */
