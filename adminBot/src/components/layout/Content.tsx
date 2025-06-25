import type { ReactNode } from "react";

interface IContent {
  children: ReactNode;
}

const Content = ({ children }: IContent) => {
  return <div className="p-4 max-w-screen-xl mx-auto">{children}</div>;
};
export default Content;
/**/
