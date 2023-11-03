import React, { useEffect, useRef } from "react";
import felicetteLogo from "../images/felicette_logo.png";
import { LanguageSelector } from "./LanguageSelector";
import { getRandomItem } from "../helpers";

const EMOJI_PLACEHOLDER = "🌍";

const defaultHeaderTranslation = {
  apps: "Apps:",
};
export const Header = ({
  data,
}: {
  data?: Partial<typeof defaultHeaderTranslation>;
}) => {
  const t = { ...defaultHeaderTranslation, ...data };
  const felicetteEl = useRef<HTMLHeadingElement>(null);
  const appEl = useRef<HTMLHeadingElement>(null);
  const nextFrameTimer = useRef<NodeJS.Timer>();

  useEffect(() => {
    const felicetteElText = felicetteEl.current?.innerText ?? "";
    const felicetteParts = [EMOJI_PLACEHOLDER, ...felicetteElText.split("")];
    const appElText = appEl.current?.innerText ?? "";
    const appParts = appElText.split("");
    const totalParts = [...felicetteParts, ...appParts];
    const pos = felicetteParts.length;

    const emojis = ["🚀", "🧑‍🚀", "👽", "🛸", "⭐", "🌞", "🌍", "🐱"];

    const animateFrame = () => {
      if (nextFrameTimer.current) {
        clearTimeout(nextFrameTimer.current);
      }

      if (!felicetteEl.current) {
        return;
      }

      if (!appEl.current) {
        return;
      }

      const firstLetter = totalParts.shift();
      totalParts.push(firstLetter ?? "");

      const initialPart = [...totalParts].splice(0, pos);
      const finalPart = [...totalParts].splice(pos, totalParts.length - pos);
      felicetteEl.current.innerHTML = initialPart
        .join("")
        .replace(EMOJI_PLACEHOLDER, getRandomItem(emojis));
      appEl.current.innerHTML = finalPart
        .join("")
        .replace(EMOJI_PLACEHOLDER, getRandomItem(emojis));

      nextFrameTimer.current = setTimeout(() => {
        animateFrame();
      }, 500);
    };

    animateFrame();

    return () => {
      if (nextFrameTimer.current) {
        clearTimeout(nextFrameTimer.current);
      }
    };
  }, []);
  return (
    <header className="header">
      <img className="header__logo" src={felicetteLogo} alt="Felicette logo" />
      <div className="header__main-title__wrapper">
        <h2 className="header__main-title">{t.apps}</h2>
      </div>
      <h1 className="header__felicette-title__start" ref={felicetteEl}>
        felicette
      </h1>
      <h1 className="header__felicette-title__end" ref={appEl}>
        .app
      </h1>
      <section className="header__language__title">
        language / lingua / idioma / langue
      </section>
      <LanguageSelector />
      <section className="header__bottom-separator" />
    </header>
  );
};
