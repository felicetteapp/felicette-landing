import React, { PropsWithChildren, useEffect, useRef } from "react";
import { getRandomItem } from "../helpers";
import { useUIContext } from "../hooks/useUIContext";

export const ProjectArticle = ({
  number,
  title,
  emojis,
  leadText,
  children,
  techStack,
}: PropsWithChildren<{
  number: string;
  title: string;
  emojis: Array<string>;
  leadText: string;
  techStack?: Array<string>;
}>) => {
  const emojiEl = useRef<HTMLElement>(null);
  const nextFrameTimer = useRef<NodeJS.Timeout>();
  const numberEl = useRef<HTMLElement>(null);
  const articleEl = useRef<HTMLElement>(null);

  const { observer, addObserverCallback } = useUIContext();

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

  useEffect(() => {
    if (numberEl.current) {
      observer.observe(numberEl.current);
    }

    if (articleEl.current) {
      observer.observe(articleEl.current);
    }

    return () => {
      if (numberEl.current) {
        observer.unobserve(numberEl.current);
      }
      if (articleEl.current) {
        observer.unobserve(articleEl.current);
      }
    };
  }, [observer]);

  useEffect(() => {
    addObserverCallback((b) => {
      const thisItemStatus = b.find((a) => a.target === numberEl.current);
      if (!thisItemStatus) {
        return;
      }
      const visible = thisItemStatus.isIntersecting;
      if (!numberEl.current || !articleEl.current) {
        return;
      }
      if (visible) {
        numberEl.current.classList.add("main__article__number--visible");
        articleEl.current.classList.add("main__article--visible");
      } else {
        numberEl.current.classList.remove("main__article__number--visible");
      }
    });
  }, [addObserverCallback]);

  useEffect(() => {
    addObserverCallback((b) => {
      const thisItemStatus = b.find((a) => a.target === articleEl.current);
      if (!thisItemStatus) {
        return;
      }
      const visible = thisItemStatus.isIntersecting;
      if (!articleEl.current) {
        return;
      }
      if (!visible) {
        articleEl.current.classList.remove("main__article--visible");
      }
    });
  }, [addObserverCallback]);

  return (
    <article className="main__article" ref={articleEl}>
      <section
        className="main__article__number"
        ref={numberEl}
        data-label={number}
      >
        {number}
      </section>
      <section className="main__article__title">{title}</section>
      {techStack && (
        <section className="main__article__tech-stack">
          {techStack.map((tech) => (
            <span key={tech} className="main__article__tech-stack__item">
              {tech}
            </span>
          ))}
        </section>
      )}
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
