import React, { PropsWithChildren, useEffect, useRef } from "react";
import { getRandomItem } from "../helpers";

export const ProjectArticle = ({
  number,
  title,
  emojis,
  leadText,
  children,
}: PropsWithChildren<{
  number: string;
  title: string;
  emojis: Array<string>;
  leadText: string;
}>) => {
  const emojiEl = useRef<HTMLElement>(null);
  const nextFrameTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const animateFrame = () => {
      if (nextFrameTimer.current) {
        clearTimeout(nextFrameTimer.current);
      }

      if (!emojiEl.current) {
        return;
      }
      emojiEl.current.innerHTML = getRandomItem(emojis);

      nextFrameTimer.current = setTimeout(() => {
        animateFrame();
      }, 300);
    };

    animateFrame();
  }, [emojis]);

  return (
    <article className="main__article">
      <section className="main__article__number">{number}</section>
      <section className="main__article__title">{title}</section>
      <section className="main__article__emojis" ref={emojiEl}>
        {emojis}
      </section>
      <section className="main__article__lead-text">{leadText}</section>
      {children}
    </article>
  );
};

export const ProjectArticleSubItem = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <>
      <section className="main__article__sub-item__label">{label}</section>
      <section className="main__article__sub-item__value">{value} </section>
    </>
  );
};

export const ProjectArticleSubItemLink = ({
  className,
  ...props
}: React.HTMLProps<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      className={`main__article__sub-item__value__link ${className}`}
    />
  );
};

export const ProjectArticleSubItemLinkList = (props: PropsWithChildren) => {
  return (
    <section
      {...props}
      className="main__article__sub-item__value__link__list"
    />
  );
};
