import { Link } from "gatsby";
import React, { useEffect, useRef } from "react";
import { useCurrentLang } from "../hooks/useCurrentLang";
const LanguageSelectorItem = ({
  lang,
  onRef,
}: {
  lang: string;
  onRef: (element: HTMLAnchorElement) => void;
}) => {
  const currentLang = useCurrentLang();
  const classes = [
    "header__language__selector__item",
    lang === currentLang
      ? "header__language__selector__item--active"
      : undefined,
  ];
  return (
    <Link
      className={classes.join(" ")}
      to={`/${lang}`}
      ref={(a: unknown) => {
        onRef(a as HTMLAnchorElement);
      }}
      data-label={lang}
    >
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
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const currentLang = useCurrentLang();

  const addItemRef = (el: HTMLAnchorElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };
  useEffect(() => {
    const setVariablesFromTarget = (target: HTMLElement) => {
      const position = target.getBoundingClientRect();
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      const positionRelativeToSection = {
        top: position.top - section.getBoundingClientRect().top,
        left: position.left - section.getBoundingClientRect().left,
      };
      const positionAdjustedToCenterOfItem = {
        top: positionRelativeToSection.top + position.height / 2,
        left: positionRelativeToSection.left + position.width / 2,
      };
      section.style.setProperty(
        "--hover-mouse-y",
        `${positionAdjustedToCenterOfItem.top}px`
      );
      section.style.setProperty(
        "--hover-mouse-x",
        `${positionAdjustedToCenterOfItem.left}px`
      );
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetItem = itemsRef.current.find((item) => item === target);
      if (!targetItem) {
        return;
      }
      setVariablesFromTarget(targetItem);
    };

    const currentLangItem = itemsRef.current.find((item) => {
      return item.dataset.label === currentLang;
    });

    if (currentLangItem) {
      setVariablesFromTarget(currentLangItem);
    }

    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [currentLang]);

  return (
    <section className="header__language__selector" ref={sectionRef}>
      <span className="header__language__selector__item__hover__indicator"></span>
      <main className="header__language__selector__item__wrapper">
        <LanguageSelectorItem lang={"en"} onRef={addItemRef} />
        <Divider />
        <LanguageSelectorItem lang={"pt"} onRef={addItemRef} />
        <Divider />
        <LanguageSelectorItem lang={"es"} onRef={addItemRef} />
        <Divider />
        <LanguageSelectorItem lang={"fr"} onRef={addItemRef} />
      </main>
    </section>
  );
};
