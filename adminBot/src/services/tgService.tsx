import { instance } from "../helpers/api.tsx";

const URL = "/tg";

export const tgService = {
  getUserName: async (id: number) => {
    const { data } = await instance.get(`${URL}/user-name?id=${id}`);
    return data;
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
