// src/components/About.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <h1 className="text-center mb-5">{t('detailedAbout')}</h1>

                    <section className="mb-5">
                        <h2>{t('regionalImpact')}</h2>
                        <p className="lead">
                            {t('regionalImpactDescription')}
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2>{t('roboticsExperience')}</h2>
                        <p className="lead">
                            {t('roboticsDescription')}
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2>{t('developmentExperience')}</h2>
                        <p className="lead">
                            {t('developmentDescription')}
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2>{t('certifications')}</h2>
                        <ul className="list-group">
                            <li className="list-group-item">{t('cert1')}</li>
                            <li className="list-group-item">{t('cert2')}</li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2>{t('interests')}</h2>
                        <p className="lead">
                            {t('interestsDescription')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;