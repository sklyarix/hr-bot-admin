import type { ReactNode } from "react";
import { Header } from "../ui/header/Header.tsx";
import Content from "./Content.tsx";
import Sidebar from "./Sidebar.tsx";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-[300px]">
        <Header />
        <Content>{children}</Content>
      </div>
    </div>
  );
};
export default Layout;
/*



* */
