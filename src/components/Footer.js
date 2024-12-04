import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="ms-5"><h2 className="h4 mb-4 ">{t('contact')}</h2></div>
                        
                        <div className="d-flex gap-3">
                            <a href="mailto:cuevasadavid@gmail.com" 
                               className="btn btn-outline-light align-items-center">
                                <FaEnvelope />
                            </a>
                            <a href="http://www.linkedin.com/in/cuevasadavid" 
                               className="btn btn-outline-light align-items-center" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/dcuevasa" 
                               className="btn btn-outline-light align-items-center" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://wa.me/+573003835553" 
                               className="btn btn-outline-light align-items-center" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 text-md-end mt-4 mt-md-0">
                        <br></br>
                        <p className="mb-0">&copy; {new Date().getFullYear()} {t('rights')}</p>
                        <p className="mb-0">{t('love')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;