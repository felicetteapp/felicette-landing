import * as React from "react";
import type { PageProps } from "gatsby";
import "../styles/main.scss";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/400-italic.css";
import "@fontsource/space-mono/700.css";
import "@fontsource/space-mono/700-italic.css";
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
import { useIntl } from "gatsby-plugin-intl";
import { DeepSpace } from "../components/DeepSpace";
import {
  ProjectVideoPreviewItem,
  ProjectVideoPreviewSection,
} from "../components/ProjectVideoPreviewSection";

import tsuruNoMundoVideo from "../videos/mobile.webm";
import tsuruNoMundoWidescreenVideo from "../videos/widescreen.webm";
import tsuruNoMundoDailyVideo from "../videos/daily_mobile.webm";
import tsuruNoMundoDailyWidescreenVideo from "../videos/daily_widescreen.webm";
import { UIContextProvider } from "../context/UIContext/Provider";

const IndexPage: React.FC<PageProps> = () => {
  const { formatMessage } = useIntl();
  return (
    <UIContextProvider>
      <main className="wrapper">
        <Header />
        <Main>
          <ProjectArticle
            number="01"
            emojis={["🦢", "📷", "🖼️"]}
            title={formatMessage({ id: "tsuru_no_mundo.title" })}
            techStack={["JavaScript", "PixiJs", "HTML5", "CSS3"]}
            leadText={formatMessage({
              id: "tsuru_no_mundo.lead_text",
            })}
          >
            <ProjectVideoPreviewSection>
              <ProjectVideoPreviewItem
                src={tsuruNoMundoWidescreenVideo}
                span={3}
              />
              <ProjectVideoPreviewItem src={tsuruNoMundoVideo} />
            </ProjectVideoPreviewSection>
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.current_state" })}
              value={formatMessage({ id: "common.published" })}
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.source_code" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/tsuru-no-mundo-landing"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/tsuru-no-mundo-landing
                </ProjectArticleSubItemLink>
              }
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.see_more" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://tsurunomundo.com.br"
                  target="_blank"
                  rel="noopener"
                >
                  tsurunomundo.com.br
                </ProjectArticleSubItemLink>
              }
            />
          </ProjectArticle>
          <ProjectArticle
            number="02"
            emojis={["🦢", "📷", "🖼️", "📅"]}
            title={formatMessage({ id: "tsuru_no_mundo_daily.title" })}
            techStack={[
              "JavaScript",
              "@11ty/eleventy",
              "chroma-js",
              "Markdown",
              "sass",
              "sharp",
              "skyra/gifenc",
              "liquid",
              "nunjucks",
            ]}
            leadText={formatMessage({
              id: "tsuru_no_mundo_daily.lead_text",
            })}
          >
            <ProjectVideoPreviewSection>
              <ProjectVideoPreviewItem
                src={tsuruNoMundoDailyWidescreenVideo}
                span={3}
              />
              <ProjectVideoPreviewItem src={tsuruNoMundoDailyVideo} />
            </ProjectVideoPreviewSection>
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.current_state" })}
              value={formatMessage({ id: "common.published" })}
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.source_code" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/daily-tsuru-no-mundo"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/daily-tsuru-no-mundo
                </ProjectArticleSubItemLink>
              }
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.see_more" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://daily.tsurunomundo.com.br"
                  target="_blank"
                  rel="noopener"
                >
                  daily.tsurunomundo.com.br
                </ProjectArticleSubItemLink>
              }
            />
          </ProjectArticle>
          <ProjectArticle
            number="03"
            emojis={["🚀", "📦", "🔍", "🖼️"]}
            title={formatMessage({ id: "felicette_img_loading.title" })}
            techStack={["TypeScript", "Node.js", "Webpack", "Github Packages"]}
            leadText={formatMessage({ id: "felicette_img_loading.lead_text" })}
          >
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.current_state" })}
              value={formatMessage({ id: "common.published" })}
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.source_code" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/img-loading"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/img-loading
                </ProjectArticleSubItemLink>
              }
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.see_more" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/img-loading/pkgs/npm/img-loading"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/img-loading/pkgs/npm/img-loading
                </ProjectArticleSubItemLink>
              }
            />
          </ProjectArticle>
          <ProjectArticle
            number="04"
            emojis={["🚀", "📦", "🛠️", "🖼️"]}
            title={formatMessage({ id: "felicette_img_loading_utils.title" })}
            techStack={[
              "TypeScript",
              "Node.js",
              "Github Packages",
              "sharp",
              "colorthief",
            ]}
            leadText={formatMessage({
              id: "felicette_img_loading_utils.lead_text",
            })}
          >
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.current_state" })}
              value={formatMessage({ id: "common.published" })}
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.source_code" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/img-loading-utils"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/img-loading-utils
                </ProjectArticleSubItemLink>
              }
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.see_more" })}
              value={
                <ProjectArticleSubItemLink
                  href="https://github.com/felicetteapp/img-loading-utils/pkgs/npm/img-loading-utils"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/felicetteapp/img-loading-utils/pkgs/npm/img-loading-utils
                </ProjectArticleSubItemLink>
              }
            />
          </ProjectArticle>
          <ProjectArticle
            number="05"
            emojis={["💸", "🥕", "📋", "🍎"]}
            title={formatMessage({ id: "felicette_recipes.title" })}
            techStack={[
              "TypeScript",
              "React",
              "Node.js",
              "Firebase",
              "i18n",
              "@mui/material",
            ]}
            leadText={formatMessage({ id: "felicette_recipes.lead_text" })}
          >
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.current_state" })}
              value={formatMessage({ id: "common.closed_alpha" })}
            />
            <ProjectArticleSubItem
              label={formatMessage({ id: "common.source_code" })}
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
              label={formatMessage({ id: "common.see_more" })}
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
      <DeepSpace />
    </UIContextProvider>
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
