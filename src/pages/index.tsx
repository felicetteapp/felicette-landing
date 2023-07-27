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
import { Main } from "../components/Main";
import {
  ProjectArticle,
  ProjectArticleSubItem,
  ProjectArticleSubItemLink,
  ProjectArticleSubItemLinkList,
} from "../components/ProjectArticle";
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
          leadText="Save your recipes, the ingredients needed to make them and create shopping lists to organize your day to day"
        >
          <ProjectArticleSubItem
            label={"current state"}
            value={"closed alpha"}
          />
          <ProjectArticleSubItem
            label={"source code"}
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
      <Footer data={{}} />
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
        content="Felicette is an open-source project by Facundo Leites. Made with love and cats from Curitiba, Brazil"
      />
    </>
  );
};
