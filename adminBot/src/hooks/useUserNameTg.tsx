import { useQuery } from "@tanstack/react-query";

import { tgService } from "../services/tgService.tsx";

export const useUserNameTg = (idTg: number) => {
  return useQuery({
    queryFn: () => tgService.getUserName(idTg),
    queryKey: [`Get UserNameTg ${idTg}`],
  });
};
