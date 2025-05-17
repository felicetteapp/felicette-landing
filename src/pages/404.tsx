import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby-plugin-intl";
const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <div className="p404">
      <h1>404</h1>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
