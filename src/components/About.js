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
                        <h2>{t("researchLines")}</h2>
                        <ul className="list-group rounded shadow-sm">
                            <li className="list-group-item py-3">
                                <h5 className="mb-1 fw-bold">{t("roboticsLine")}</h5>
                                <p className="mb-0">{t("roboticsDescription_long")}</p>
                            </li>
                            <li className="list-group-item py-3">
                                <h5 className="mb-1 fw-bold">{t("aiLine")}</h5>
                                <p className="mb-0">{t("aiDescription_long")}</p>
                            </li>
                            <li className="list-group-item py-3">
                                <h5 className="mb-1 fw-bold">{t("mobileLine")}</h5>
                                <p className="mb-0">{t("mobileDescription_long")}</p>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="mb-0">{t('publications')}</h2>
                            <a 
                                href={t('publicationsLink')} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-outline-dark btn-sm"
                            >
                                {t('viewOnOrcid')}
                            </a>
                        </div>
                        <div className="list-group shadow-sm">
                            <div className="list-group-item mb-2 rounded">
                                <a 
                                    href={t('paper1Url')} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-decoration-none text-dark"
                                >
                                    <h5 className="mb-1 hover-primary">{t('paper1Title')}</h5>
                                </a>
                                <p className="mb-1 text-muted small">{t('paper1Authors')}</p>
                                <small className="text-secondary">{t('paper1Venue')}</small>
                            </div>
                            <div className="list-group-item mb-2 rounded">
                                <a 
                                    href={t('paper2Url')} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-decoration-none text-dark"
                                >
                                    <h5 className="mb-1 hover-primary">{t('paper2Title')}</h5>
                                </a>
                                <p className="mb-1 text-muted small">{t('paper2Authors')}</p>
                                <small className="text-secondary">{t('paper2Venue')}</small>
                            </div>
                            <div className="list-group-item mb-2 rounded">
                                <a 
                                    href={t('paper3Url')} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-decoration-none text-dark"
                                >
                                    <h5 className="mb-1 hover-primary">{t('paper3Title')}</h5>
                                </a>
                                <p className="mb-1 text-muted small">{t('paper3Authors')}</p>
                                <small className="text-secondary">{t('paper3Venue')}</small>
                            </div>
                        </div>
                    </section>

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
                        <ul className="list-group shadow-sm">
                            <li className="list-group-item">{t('cert1')}</li>
                            <li className="list-group-item">{t('cert2')}</li>
                            <li className="list-group-item">{t('cert3')}</li>
                            <li className="list-group-item">{t('cert4')}</li>
                            <li className="list-group-item">{t('cert5')}</li>
                            <li className="list-group-item">{t('cert6')}</li>
                            <li className="list-group-item">{t('cert7')}</li>
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