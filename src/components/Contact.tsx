import React from 'react';

const Contact = ({ page }: { page: { [key: string]: any } }) => {
    return (
        <div>
            <h1>{page.title}</h1>
        </div>
    );
};

export default Contact;