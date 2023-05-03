export type Image = {
  url: string;
  alt: string;
  ID: number;
};

export type Link = {
  url: string;
  title: string;
  target: string;
};

export type AcfType = {
  contenu_premier_paragraphe?: string;
  image_premier_paragraphe?: Image;
  titre_premier_paragraphe?: string;
  logo?: Image;
  mot_fond_bleu?: string;
  banner_image?: Image;
  titre_references?: string;
  lien_vers_une_page?: Link;
  texte_references?: string;
  texte_fond_blue?: string;
  references?: {
    descriptif: string;
    nom: string;
    image: Image;
  }[];
  membres?: {
    prenom_et_nom: string;
    annees_dexperience: string;
    description: string;
  }[];
  titre_accompagnement?: string;
  list_haut_de_page?: string;
  image_haut_de_page?: Image;
  coordonnees?: string;
};
