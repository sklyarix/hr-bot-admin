import Layout from "../components/layout/Layout.tsx";
import { Home } from "../pages/Home/Home.tsx";
import { JobApplication } from "../pages/JobApplication/JobApplication.tsx";

import { Vacancy } from "../pages/Vacancy/Vacancy.tsx";

export const routes = [
  {
    name: "Главная",
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    name: "Отклики",
    path: "/job_responses",
    sidebar: true,
    element: (
      <Layout>
        <JobApplication />
      </Layout>
    ),
  },
  {
    name: "Вакансии",
    path: "/vacancy",
    sidebar: true,
    element: (
      <Layout>
        <Vacancy />
      </Layout>
    ),
  },
  {
    name: "Рефералы",
    path: "/vacancy",
    sidebar: true,
    element: (
      <Layout>
        <Vacancy />
      </Layout>
    ),
  },
];
