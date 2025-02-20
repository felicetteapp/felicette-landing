import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Felicette`,
    siteUrl: `https://felicette.app`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Felicette`,
        short_name: `Felicette`,
        start_url: `/`,
        background_color: `#1c1d21`,
        theme_color: `#1c1d21`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        description: "Open source projects by Facundo Leites",
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `es`, `pt`,'fr'],
        defaultLanguage: `en`,
        redirect: true,
      },
    },
  ],
};

export default config;
