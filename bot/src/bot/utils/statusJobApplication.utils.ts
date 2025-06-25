import { EnumJobApplicationStatus } from '../../shared/enums/job_application_status.enum';

export function statusJobApplicationUtils(status: EnumJobApplicationStatus) {
  switch (status) {
    case EnumJobApplicationStatus.NO_REVIEW:
      return '⚪ Не просмотрено ⚪';
    case EnumJobApplicationStatus.REVIEW:
      return '🟠 На рассмотрении 🟠';
    case EnumJobApplicationStatus.ACCEPT:
      return '🟢 Принят 🟢';
    case EnumJobApplicationStatus.REJECTION:
      return '🔴 Отказ 🔴';
  }
}
