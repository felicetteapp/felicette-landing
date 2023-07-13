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

import felicetteLogo from "../images/felicette_logo.png";
import felicettePj from "../images/felicette_site_pj.png";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="wrapper">
      <header className="header">
        <img
          className="header__logo"
          src={felicetteLogo}
          alt="Felicette logo"
        />
        <div className="header__main-title__wrapper">
          <h2 className="header__main-title">Apps:</h2>
        </div>
        <h1 className="header__felicette-title__start">felicette</h1>
        <h1 className="header__felicette-title__end">.app</h1>
        <section className="header__language__title">
          language / idioma / lingua
        </section>
        <section className="header__language__selector">
          <main className="header__language__selector__item__wrapper">
            <button className="header__language__selector__item">en</button>
            <article className="header__language__selector__item header__language__selector__item--separator">
              /
            </article>
            <button className="header__language__selector__item header__language__selector__item--active">
              pt
            </button>
            <article className="header__language__selector__item header__language__selector__item--separator">
              /
            </article>
            <button className="header__language__selector__item">es</button>
            <article className="header__language__selector__item header__language__selector__item--separator">
              /
            </article>
            <button className="header__language__selector__item">fr</button>
          </main>
          <section className="header__spacer"></section>
        </section>
        <section className="header__bottom-separator" />
      </header>
      <main className="main">
        <article className="main__article">
          <section className="main__article__number">01</section>
          <section className="main__article__title">Felicette recipes</section>
          <section className="main__article__emojis">💸🥕📋🍎</section>
          <section className="main__article__lead-text">
            Guarde suas receitas, os ingredientes necessários para fazé-las e
            crie listas de compra para organizar seu día a día
          </section>
          <section className="main__article__sub-item__label">
            estado atual
          </section>
          <section className="main__article__sub-item__value">
            alpha fechado
          </section>
          <section className="main__article__sub-item__label">
            código fonte
          </section>
          <section className="main__article__sub-item__value">
            <a
              href="https://github.com/felicetteapp/recipes-backend"
              target="_blank"
            >
              github.com/felicetteapp/recipes-backend
            </a>
            <br />
            <br />
            <a
              href="https://github.com/felicetteapp/recipes-frontend"
              target="_blank"
            >
              github.com/felicetteapp/recipes-frontend
            </a>
          </section>
          <section className="main__article__sub-item__label">ver mais</section>
          <a
            className="main__article__sub-item__value"
            href="https://recipes.felicette.app"
            target="_blank"
          >
            recipes.felicette.app
          </a>
        </article>
      </main>
      <footer className="footer">
        <main className="footer__main">
          <section className="footer__main__section footer__main__section--text">
            <strong>Felicette 2023</strong>
            <p>
              Felicette é um projeto open-source de Facundo Leites. Feito com
              amor e gatos desde Curitiba, Brasil
            </p>
          </section>
          <section className="footer__main__section footer__main__section--img">
            <img src={felicettePj} />
          </section>
        </main>
      </footer>
    </main>
  );
};

export default IndexPage;
