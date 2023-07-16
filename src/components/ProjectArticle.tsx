import React, { PropsWithChildren } from "react";

export const ProjectArticle = ({
  number,
  title,
  emojis,
  leadText,
  children,
}: PropsWithChildren<{
  number: string;
  title: string;
  emojis: string;
  leadText: string;
}>) => {
  return (
    <article className="main__article">
      <section className="main__article__number">{number}</section>
      <section className="main__article__title">{title}</section>
      <section className="main__article__emojis">{emojis}</section>
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
  console.log("teste", className);
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
