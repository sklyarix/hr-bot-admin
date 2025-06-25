import { type FC } from "react";

import { Modal } from "../../components/ui/modals/ Modal.tsx";
import { UserNameTg } from "../../components/ui/user/UserNameTg.tsx";

interface jobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobApplication: IjobApplication;
}

export const JobApplicationModal: FC<jobApplicationModalProps> = ({
  isOpen,
  onClose,
  jobApplication,
}) => {
  let jobApplicationStatus = null;

  switch (jobApplication.status) {
    case jobApplicationStatus.NO_REVIEW:
      jobApplicationStatus = (
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded">
            🟡 Рассмотреть
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            🔴 Отказать
          </button>
        </div>
      );
      break;

    case jobApplicationStatus.REVIEW:
      jobApplicationStatus = (
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            ✅ Принять
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            🔴 Отказать
          </button>
        </div>
      );
      break;

    case jobApplicationStatus.ACCEPT:
      jobApplicationStatus = (
        <div className="text-green-700 font-semibold">✅ Кандидат принят</div>
      );
      break;

    case jobApplicationStatus.REJECTION:
      jobApplicationStatus = (
        <div className="text-red-600 font-semibold">❌ Кандидат отклонён</div>
      );
      break;

    default:
      jobApplicationStatus = null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NAME_USER">
      {jobApplicationStatus}
      <div className="w-full space-y-4 text-sm text-gray-700 dark:text-gray-300 h-[50vh] overflow-y-auto">
        <Info label="ФИО" value={jobApplication.user.profile.fullName} />
        <Info
          label="Telegram"
          value={<UserNameTg idTg={jobApplication.user.idTg} />}
        />
        <Info label="Возраст" value={jobApplication.user.profile.age ?? "—"} />
        <Info label="Город" value={jobApplication.user.profile.city ?? "—"} />
        <Info
          label="Описание"
          value={jobApplication.user.profile.description ?? "—"}
        />
        <Info
          label="Опыт в агентствах"
          value={
            jobApplication.user.profile.workExperienceCreativeAgencies ?? "—"
          }
        />
        <Info
          label="Желаемая зарплата"
          value={jobApplication.user.profile.salary ?? "—"}
        />
        <Info
          label="Тестовое задание"
          value={jobApplication.testTaskResult ?? "—"}
        />
        <Info
          label="Резюме"
          value={
            <a
              href={jobApplication.resume.link}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ссылка
            </a>
          }
        />
      </div>
      <button className="px-4 mt-5 py-2 rounded-xl text-white transition bg-blue-600 hover:bg-blue-700">
        Сохранить
      </button>
    </Modal>
  );
};

const Info = ({ label, value }: { label: string; value: any }) => (
  <div>
    <span className="block font-medium mb-1">{label}</span>
    <div className="text-gray-600 dark:text-gray-400">{value}</div>
  </div>
);
