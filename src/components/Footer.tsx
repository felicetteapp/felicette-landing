import React from "react";
import felicettePj from "../images/felicette_site_pj.png";
import { FormattedMessage } from "gatsby-plugin-intl";

const defaultFooterTranslation = {
  name: "Felicette 2023-2025",
  description:
    "Felicette is an open-source project by Facundo Leites. Made with love and cats from Curitiba, Brazil",
};
export const Footer = ({
  data,
}: {
  data: Partial<typeof defaultFooterTranslation>;
}) => {
  const t = { ...defaultFooterTranslation, ...data };
  return (
    <footer className="footer">
      <main className="footer__main">
        <section className="footer__main__section footer__main__section--text">
          <strong>{t.name}</strong>
          <p>
            <FormattedMessage
              id="footer.about"
              values={{
                link: (
                  <a
                    href="https://www.facundoleites.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facundo Leites
                  </a>
                ),
              }}
            />
          </p>
          <a rel="me" href="https://mastodon.social/@felicetteapp">
            @felicetteapp@mastodon.social
          </a>
          <br />
          <a href="https://bsky.app/profile/felicette.app">
            bsky.app/felicette.app
          </a>
        </section>
        <section className="footer__main__section footer__main__section--img">
          <img src={felicettePj} alt="felicette" />
        </section>
      </main>
    </footer>
  );
};
