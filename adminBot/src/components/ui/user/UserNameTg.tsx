import type { FC } from "react";
import { useUserNameTg } from "../../../hooks/useUserNameTg.tsx";

interface UserNameTgProps {
  idTg: number;
}

export const UserNameTg: FC<UserNameTgProps> = ({ idTg }) => {
  const { data, isLoading } = useUserNameTg(idTg);

  if (isLoading) return <p className="text-sm text-gray-500">Загрузка...</p>;
  console.log(data);
  return <p className="text-sm text-gray-500">Подробнее</p>;
};
//{data?.username ? `@${data.username}` : "скрыт"}
