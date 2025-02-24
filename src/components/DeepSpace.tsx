import { useIntl } from "gatsby-plugin-intl";
import React from "react";

import felicetteAppGif from "../images/felicette.app.gif";
import tsurunomundoGif from "../images/tsurunomundo.gif";
import tsurunomundoDailyGif from "../images/tsurunomundo_daily.gif";

export const DeepSpace = () => {
  const { formatMessage } = useIntl();
  return (
    <section className="deep-space">
      <span className="deep-space__title">
        {formatMessage({ id: "deep_space.title" })}
      </span>
      <section className="deep-space__items">
        <section className="deep-space__open-source">
          <h2>{formatMessage({ id: "deep_space.open_source.title" })}</h2>
          <p>{formatMessage({ id: "deep_space.open_source.description" })}</p>
          <a
            href="https://github.com/felicetteapp/felicette-landing"
            target="_blank"
            rel="noopener"
          >
            github.com/felicetteapp/felicette-landing
          </a>
        </section>
        <section className="deep-space__share">
          <h2>{formatMessage({ id: "deep_space.share.title" })}</h2>
          <p>{formatMessage({ id: "deep_space.share.description" })}</p>
          <img src={felicetteAppGif} alt="felicette.app" />
        </section>
      </section>
      <section className="deep-space__friends">
        <h2>{formatMessage({ id: "deep_space.friends.title" })}</h2>
        <section className="deep-space__friends__items">
          <a href="https://tsurunomundo.com.br" target="_blank" rel="noopener">
            <img src={tsurunomundoGif} alt="Tsuru no Mundo" />
          </a>
          <a
            href="https://daily.tsurunomundo.com.br"
            target="_blank"
            rel="noopener"
          >
            <img src={tsurunomundoDailyGif} alt="Tsuru no Mundo Daily" />
          </a>
        </section>
      </section>
    </section>
  );
};
