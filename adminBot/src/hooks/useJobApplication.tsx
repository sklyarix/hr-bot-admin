import { useQuery } from "@tanstack/react-query";
import { jobApplicationService } from "../services/jobResponsesService.tsx";

export const useJobApplication = () => {
  return useQuery({
    queryFn: jobApplicationService.getAll,
    queryKey: ["job application"],
  });
};
