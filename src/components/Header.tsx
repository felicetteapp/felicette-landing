import React, { useCallback, useEffect, useRef } from "react";
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
  const nextFrameTimer = useRef<NodeJS.Timeout>();

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
        .replace(
          EMOJI_PLACEHOLDER,
          `<span class="header__felicette-title__emoji"">${getRandomItem(
            emojis
          )}</span>`
        );
      appEl.current.innerHTML = finalPart
        .join("")
        .replace(
          EMOJI_PLACEHOLDER,
          `<span class="header__felicette-title__emoji"">${getRandomItem(
            emojis
          )}</span>`
        );

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

  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseEventTimeout = useRef<NodeJS.Timeout>();
  const movingRocketTimeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    mousePosition.current = {
      x: document.documentElement.clientWidth / 2,
      y:
        document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop,
    };
    document.documentElement.style.setProperty("--mouse-angle", `0deg`);
    document.documentElement.style.setProperty(
      "--mouse-x",
      document.documentElement.clientWidth / 2 + "px"
    );
    document.documentElement.style.setProperty(
      "--rt-mouse-x",
      document.documentElement.clientWidth / 2 + "px"
    );
    document.documentElement.style.setProperty(
      "--mouse-y",
      document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop +
        "px"
    );
    document.documentElement.style.setProperty(
      "--rt-mouse-y",
      document.documentElement.clientHeight / 2 +
        document.documentElement.scrollTop +
        "px"
    );
    const listener = (event: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--rt-mouse-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--rt-mouse-y",
        `${event.clientY + document.documentElement.scrollTop}px`
      );

      if (mouseEventTimeout.current) {
        clearTimeout(mouseEventTimeout.current);
      }

      mouseEventTimeout.current = setTimeout(() => {
        const prevMousePosition = mousePosition.current;
        const newMousePosition = {
          x: event.clientX,
          y: event.clientY + document.documentElement.scrollTop,
        };
        const deltaX = newMousePosition.x - prevMousePosition.x;
        const deltaY = newMousePosition.y - prevMousePosition.y;
        const angleRadians = Math.atan2(deltaY, deltaX);
        const angleDegrees = (angleRadians * 180) / Math.PI;

        mousePosition.current = {
          x: newMousePosition.x,
          y: newMousePosition.y,
        };

        document.documentElement.style.setProperty(
          "--mouse-angle",
          `${angleDegrees}deg`
        );
        document.documentElement.style.setProperty(
          "--mouse-x",
          `${newMousePosition.x}px`
        );
        document.documentElement.style.setProperty(
          "--mouse-y",
          `${newMousePosition.y}px`
        );

        if (movingRocketTimeout.current) {
          clearTimeout(movingRocketTimeout.current);
        }

        document.documentElement.classList.add("--rocket-moving");

        movingRocketTimeout.current = setTimeout(() => {
          document.documentElement.classList.remove("--rocket-moving");
        }, 1000);
      }, 200);
    };

    document.addEventListener("mousemove", listener);

    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, []);
  return (
    <>
      <header className="header">
        <img
          className="header__logo"
          src={felicetteLogo}
          alt="Felicette logo"
        />
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
    </>
  );
};
