import { type FC } from "react";
import type { IJobApplication } from "../../../../shared/job_application/job_application.interface.ts";
import { jobApplicationStatus } from "../../../../shared/job_application/job_application.ts";

import { UserNameTg } from "../../components/ui/user/UserNameTg.tsx";

interface jobApplicationCardProps {
  jobApplication: IJobApplication;
  activeStatus: string;
}

export const JobApplicationCard: FC<jobApplicationCardProps> = ({
  jobApplication,
  activeStatus,
}) => {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <button
      className={`relative block max-w-3xl lg:max-w-4xl p-4 bg-white rounded-2xl shadow-md space-y-2 text-left ${jobApplication.status !== activeStatus && activeStatus !== "all" && "hidden"}`}
      onClick={() => console.log("1") /* setIsModalOpen(true) */}
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {jobApplication.vacancy.name}
      </h2>
      <div>
        <p className="text-lg font-medium text-gray-900">
          {jobApplication.user.profile.fullName}
        </p>
        <p className="text-sm text-gray-500">
          <UserNameTg idTg={jobApplication.user.id} />
        </p>
      </div>
      <div className="absolute right-4 top-4 w-40 text-right">
        {jobApplicationStatus[jobApplication.status]}
      </div>
    </button>
  );
};

/*
<JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobApplication={jobApplication}
      />

{isExpanded && (
        <div className="space-y-2 text-sm text-gray-700 pt-2">
          <p>
            <strong>Возраст:</strong> {jobApplication.user.profile.age ?? "—"}
          </p>
          <p>
            <strong>Город:</strong> {jobApplication.user.profile.city ?? "—"}
          </p>
          <p>
            <strong>Описание:</strong>{" "}
            {jobApplication.user.profile.description
              ?.split("\n")
              .map((line, index) => <p key={index}>{line}</p>) ?? "—"}
          </p>
          <p>
            <strong>Опыт работы в креативных агентствах:</strong>{" "}
            {jobApplication.user.profile.workExperienceCreativeAgencies ?? "—"}
          </p>
          <p>
            <strong>Желаемая зарплата:</strong>{" "}
            {jobApplication.user.profile.salary ?? "—"}
          </p>
          <p>
            <strong>Тестовое задание:</strong> {jobApplication.testTask ?? "—"}
          </p>
          <p>
            <strong>Резюме:</strong>{" "}
            <a
              href={jobApplication.resume.link}
              className="text-blue-600 underline"
              target="_blank"
            >
              Ссылка
            </a>
          </p>
        </div>
      )}
 */
