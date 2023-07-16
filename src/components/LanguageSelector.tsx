import { Link } from "gatsby";
import React from "react";
import { useCurrentLang } from "../hooks/useCurrentLang";
const LanguageSelectorItem = ({ lang }: { lang: string }) => {
  const currentLang = useCurrentLang();
  const classes = [
    "header__language__selector__item",
    lang === currentLang
      ? "header__language__selector__item--active"
      : undefined,
  ];
  return (
    <Link className={classes.join(" ")} to={lang === "en" ? "/" : `/${lang}`}>
      {lang}
    </Link>
  );
};

export const Divider = () => {
  return (
    <article className="header__language__selector__item header__language__selector__item--separator">
      /
    </article>
  );
};
export const LanguageSelector = () => {
  return (
    <section className="header__language__selector">
      <main className="header__language__selector__item__wrapper">
        <LanguageSelectorItem lang={"en"} />
        <Divider />
        <LanguageSelectorItem lang={"pt"} />
        <Divider />
        <LanguageSelectorItem lang={"es"} />
        <Divider />
        <LanguageSelectorItem lang={"fr"} />
      </main>
      <section className="header__spacer"></section>
    </section>
  );
};
