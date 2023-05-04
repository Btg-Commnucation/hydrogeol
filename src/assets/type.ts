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

export type AcfAccueilType = {
  titre_premiere_partie: string;
  liste_premiere_partie: { termes: string }[];
  lien_premiere_partie: Link;
  second_lien_premiere_partie: Link;
  titre_seconde_partie: string;
  image_seconde_partie: Image;
  texte_seconde_partie: string;
  premier_lien_seconde_partie: Link;
  second_lien_seconde_partie: Link;
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
