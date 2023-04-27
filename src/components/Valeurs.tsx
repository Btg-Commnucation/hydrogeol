import { FC } from 'react';
import { PageProps } from './Page';

const Valeurs: FC<PageProps> = ({ page }) => {
    return (
        <section className="valeurs">
            <div className="left">
                <h1>
                    {page.title}
                    <span>{page.title}</span>
                </h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
                <div className="logo">
                    {page.acf.logo && (<img src={page.acf.logo.url} alt={page.acf.logo.url} />)}
                    {page.acf.mot_fond_bleu && (<span>{page.acf.mot_fond_bleu}</span>)}
                </div>
            </div>
            <div className="right">
                { page.acf.banner_image && <img src={page.acf.banner_image.url} alt={page.acf.banner_image.alt} /> }
            </div>
        </section>
    );
};

export default Valeurs;