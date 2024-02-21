import { FC } from "react";
import { PageProps } from "./Page";
import { Link } from "react-router-dom";

const Qualifications: FC<PageProps> = ({ page }) => {
  const extractPathFromUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;

      // Supprimer le '/' initial et final s'il existe
      const pathName = path.replace(/^\/|\/$/g, "");
      return `/${pathName}`;
    } catch (error) {
      console.error("URL invalide:", url);
      return "";
    }
  };

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
                    <li className={ page.acf.membres!.length % 2 ? "impair" : "" } key={index}>
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
      <section className="references">
        <div className="container">
          {page.acf.titre_references && (
            <h2
              dangerouslySetInnerHTML={{ __html: page.acf.titre_references }}
            ></h2>
          )}
          {page.acf.texte_references && (
            <div
              className="reference-text"
              dangerouslySetInnerHTML={{ __html: page.acf.texte_references }}
            ></div>
          )}
          {page.acf.references && (
            <ul className="qualifications">
              {page.acf.references.map((reference, index: number) => (
                <li key={index}>
                  <img src={reference.image.url} alt={reference.image.alt} />
                  <div className="content">
                    <h3
                      dangerouslySetInnerHTML={{ __html: reference.nom }}
                    ></h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: reference.descriptif }}
                    ></p>
                  </div>
                </li>
              ))}
              {page.acf.lien_vers_une_page && (
                <li className="liens-page">
                  <Link
                    to={extractPathFromUrl(page.acf.lien_vers_une_page.url)}
                  >
                    {page.acf.lien_vers_une_page.title}
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </section>
    </article>
  );
};

export default Qualifications;
