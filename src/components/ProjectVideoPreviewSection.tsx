import React from "react";

export const ProjectVideoPreviewSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <section className="main__article__video-preview">{children}</section>;
};

export const ProjectVideoPreviewItem = ({
  src,
  span = 1,
}: {
  src: string;
  span?: number;
}) => {
  return (
    <section
      className="main__article__video-preview__item"
      style={{
        gridColumn: `span ${span}`,
      }}
    >
      <video
        className="main__article__video-preview__item__video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
    </section>
  );
};
