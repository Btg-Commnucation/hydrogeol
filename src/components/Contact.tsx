import React from "react";

type Contact = {
    title: string,
    content: string,
    acf: {
        image_haut_de_page: {
            url: string,
            alt: string
        },
        coordonnees: string
    }
}

const Contact = ({ page }: { page: Contact }) => {
  return (
    <article className="contact-page">
      <div className="container">
        <section className="hero-banner">
          <h1>
            {page.title}
            <span>{page.title}</span>
            </h1>
          <img src={page.acf.image_haut_de_page.url} alt={page.acf.image_haut_de_page.alt} />
        </section>
        <section className="content">
            <div className="coordonnees" dangerouslySetInnerHTML={{ __html: page.acf.coordonnees }}></div>
            <div className="offres" dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </section>
      </div>
    </article>
  );
};

export default Contact;
