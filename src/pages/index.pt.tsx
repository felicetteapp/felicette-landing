import * as React from "react";
import type { PageProps } from "gatsby";
import "../styles/main.scss";
import "@fontsource/alfa-slab-one";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "@fontsource/roboto/100-italic.css";
import "@fontsource/roboto/300-italic.css";
import "@fontsource/roboto/400-italic.css";
import "@fontsource/roboto/500-italic.css";
import "@fontsource/roboto/700-italic.css";
import "@fontsource/roboto/900-italic.css";

import { Header } from "../components/Header";
import {
  ProjectArticle,
  ProjectArticleSubItem,
  ProjectArticleSubItemLink,
  ProjectArticleSubItemLinkList,
} from "../components/ProjectArticle";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="wrapper">
      <Header />
      <Main>
        <ProjectArticle
          number="01"
          emojis="💸🥕📋🍎"
          title="Felicette recipes"
          leadText="Guarde suas receitas, os ingredientes necessários para fazé-las e crie listas de compra para organizar seu día a día"
        >
          <ProjectArticleSubItem
            label={"estado atual"}
            value={"alpha fechado"}
          />
          <ProjectArticleSubItem
            label={"código fonte"}
            value={
              <ProjectArticleSubItemLinkList>
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/recipes-backend"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/recipes-backend
                </ProjectArticleSubItemLink>
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/recipes-frontend"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/recipes-frontend
                </ProjectArticleSubItemLink>
              </ProjectArticleSubItemLinkList>
            }
          />
          <ProjectArticleSubItem
            label={"see more"}
            value={
              <ProjectArticleSubItemLink
                href="https://recipes.felicette.app"
                target="_blank"
                rel="noopener"
              >
                recipes.felicette.app
              </ProjectArticleSubItemLink>
            }
          />
        </ProjectArticle>
      </Main>
      <Footer
        data={{
          description:
            "Felicette é um projeto open-source de Facundo Leites. Feito com amor e gatos desde Curitiba, Brasil",
        }}
      />
    </main>
  );
};

export default IndexPage;

export const Head = () => {
  return (
    <>
      <title>Felicette</title>
      <meta
        name="description"
        content="Felicette é um projeto open-source de Facundo Leites. Feito com amor e gatos desde Curitiba, Brasil"
      />
    </>
  );
};
