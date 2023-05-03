import { FC } from "react";
import { PageProps } from "./Page";

const Qualifications: FC<PageProps> = ({ page }) => {
  return (
    <article className="qualifications">
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
              alt="Flèche pointant vers le bas"
              className="full-arrow"
            />
          </div>
          <div
            className="right"
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></div>
        </div>
      </section>
      <section className="accompagnement-projets">
        <div className="container">
          {page.acf.titre_accompagnement && (
            <h2
              dangerouslySetInnerHTML={{
                __html: page.acf.titre_accompagnement,
              }}
            ></h2>
          )}
          <div className="team">
            <div className="blue-background"></div>
            <ul className="team-member__container">
              {page.acf.membres &&
                page.acf.membres.map(
                  (membre: { [key: string]: string }, index: number) => (
                    <li key={index}>
                      <h4>{membre.prenom_et_nom}</h4>
                      <strong>{membre.annees_dexperience}</strong>
                      <div
                        dangerouslySetInnerHTML={{ __html: membre.descriptif }}
                      ></div>
                    </li>
                  )
                )}
            </ul>
            {page.acf.texte_fond_blue && (
              <div
                className="content-container"
                dangerouslySetInnerHTML={{ __html: page.acf.texte_fond_blue }}
              ></div>
            )}
            <img
              src="/goutte-blanche.svg"
              alt="Logo d'hydrogeol en blanc"
              className="bottom-goutte"
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default Qualifications;
