import { useState } from "react";
import type { IJobApplication } from "../../../../shared/job_application/job_application.interface.ts";

import { jobApplicationStatus } from "../../../../shared/job_application/job_application.ts";
import { Loader_1 } from "../../components/ui/loaders/Loader_1.tsx";
import { useJobApplication } from "../../hooks/useJobApplication.tsx";

import { JobApplicationCard } from "./JobApplicationCard.tsx";

export const JobApplication = () => {
  const [activeStatus, setActiveStatus] = useState<string>("all");

  const { data, isSuccess, isLoading } = useJobApplication();

  const onClickFilter = (status: string) => {
    setActiveStatus(status);
  };

  if (isLoading) return <Loader_1 />;

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-4">
        <button
          onClick={() => onClickFilter("all")}
          className={`px-4 py-2 rounded-full hover:bg-gray-300 transition ${"all" === activeStatus ? "bg-gray-400 text-gray-100 " : "bg-gray-200 text-gray-800"} `}
        >
          Все
        </button>
        {Object.entries(jobApplicationStatus).map(([key, label]) => (
          <button
            onClick={() => onClickFilter(key)}
            className={`px-4 py-2 rounded-full hover:bg-gray-300 transition ${key === activeStatus ? "bg-gray-400 text-gray-100" : "bg-gray-200 text-gray-800"} `}
          >
            {label}
          </button>
        ))}
      </div>

      {isSuccess && (
        <div className="grid gap-4 grid-cols-1 p-4">
          {data.map((jobApplication: IJobApplication) => (
            <JobApplicationCard
              key={jobApplication.id}
              jobApplication={jobApplication}
              activeStatus={activeStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/*
	<div>{isSuccess && }</div>
	
	
возможность сообщить запрос, когда он будет готов к запуску:

// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
*/
