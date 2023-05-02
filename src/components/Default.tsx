import { FC } from "react";
import { PageProps } from "./Page";

const Default: FC<PageProps> = ({ page }) => {
  return (
    <article className="page">
      <section className="hero-banner">
        <div className="container">
          <div className="left">
            <h1>
              <span
                className="initial"
                dangerouslySetInnerHTML={{ __html: page.title }}
              ></span>
              <span dangerouslySetInnerHTML={{ __html: page.title }}></span>
            </h1>
            {page.acf.list_haut_de_page && (
              <div
                className="list__hero-banner"
                dangerouslySetInnerHTML={{ __html: page.acf.list_haut_de_page }}
              ></div>
            )}
            <img
              src="/full-orange-arrow.svg"
              alt="Flèche orange pointant vers le bas"
              className="arrow-full"
            />
          </div>
          <div className="right">
            {page.acf.image_haut_de_page && (
              <img
                src={page.acf.image_haut_de_page.url}
                alt={page.acf.image_haut_de_page.alt}
              />
            )}
          </div>
        </div>
      </section>
      <section className="prestations">
        <div className="container">
          {page.acf.titre_premier_paragraphe && (
            <h2
              dangerouslySetInnerHTML={{
                __html: page.acf.titre_premier_paragraphe,
              }}
            ></h2>
          )}
          {page.acf.image_premier_paragraphe && (
            <img
              src={page.acf.image_premier_paragraphe.url}
              alt={page.acf.image_premier_paragraphe.alt}
              className="goutte"
            />
          )}
          {page.acf.contenu_premier_paragraphe && (
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: page.acf.contenu_premier_paragraphe,
              }}
            ></div>
          )}
        </div>
      </section>
      <section className="contenu">
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: page.content }}
        ></div>
      </section>
    </article>
  );
};

export default Default;
