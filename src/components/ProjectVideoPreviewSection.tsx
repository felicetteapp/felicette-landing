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
  aspectRatio = 16 / 9,
}: {
  src: string;
  span?: number;
  aspectRatio?: number;
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
        style={{
          aspectRatio: `${aspectRatio}`,
        }}
        loop
        muted
        playsInline
      >
        <source src={src} type="video/webm" />
      </video>
    </section>
  );
};
