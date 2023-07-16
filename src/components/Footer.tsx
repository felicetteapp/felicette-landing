import React from "react";
import felicettePj from "../images/felicette_site_pj.png";
export const Footer = () => {
  return (
    <footer className="footer">
      <main className="footer__main">
        <section className="footer__main__section footer__main__section--text">
          <strong>Felicette 2023</strong>
          <p>
            Felicette é um projeto open-source de Facundo Leites. Feito com amor
            e gatos desde Curitiba, Brasil
          </p>
        </section>
        <section className="footer__main__section footer__main__section--img">
          <img src={felicettePj} alt="felicette" />
        </section>
      </main>
    </footer>
  );
};
