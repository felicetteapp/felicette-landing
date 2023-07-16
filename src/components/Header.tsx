import React from "react";
import felicetteLogo from "../images/felicette_logo.png";
import { LanguageSelector } from "./LanguageSelector";

const defaultHeaderTranslation = {
  apps: "Apps:",
};
export const Header = ({
  data,
}: {
  data?: Partial<typeof defaultHeaderTranslation>;
}) => {
  const t = { ...defaultHeaderTranslation, ...data };
  return (
    <header className="header">
      <img className="header__logo" src={felicetteLogo} alt="Felicette logo" />
      <div className="header__main-title__wrapper">
        <h2 className="header__main-title">{t.apps}</h2>
      </div>
      <h1 className="header__felicette-title__start">felicette</h1>
      <h1 className="header__felicette-title__end">.app</h1>
      <section className="header__language__title">
        language / lingua / idioma / langue
      </section>
      <LanguageSelector />
      <section className="header__bottom-separator" />
    </header>
  );
};
