import { FC } from "react";
import { PageProps } from "./Page";

const Qualifications: FC<PageProps> = ({ page }) => {
  return (
    <article className="qualifications">
      <section className="hero-banner">
        <div className="left">
          <h1>
            <span className="initial">{page.title}</span>
            <span>{page.title}</span>
          </h1>
          {page.acf.list_haut_de_page && (
            <div
              className="list__hero-banner"
              dangerouslySetInnerHTML={{ __html: page.acf.list_haut_de_page }}
            ></div>
          )}
        </div>
        <div
          className="right"
          dangerouslySetInnerHTML={{ __html: page.content }}
        ></div>
      </section>
    </article>
  );
};

export default Qualifications;
