import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatBot from './ChatBot/ChatBot';
import { Link } from 'react-router-dom';

// Importar las imágenes
import imgSocialHub from '../assets/Foto-SocialHub-Robocup2024.jpeg';
import imgRobocup from '../assets/Foto-Robocup.jpg';
import imgNovaAction from '../assets/Nova.jpeg';
import imgRosMeetupTeam from '../assets/RosMeetup-Team.jpeg';
import imgRosMeetupMe from '../assets/RosMeetup-Me.jpeg';
import imgSinfonIaSabana from '../assets/SinfonIA-Sabana.jpeg';
import imgSinfonIaPepper from '../assets/SinfonIA-Team-Pepper.jpeg';

const Landing = () => {
    const { t } = useTranslation();

    const carouselImages = [
        {
            src: imgSocialHub,
            alt: 'Social Hub RoboCup 2024',
            caption: t('SocialHub')
        },
        {
            src: imgRobocup,
            alt: 'RoboCup Competition',
            caption: 'RoboCup 2024'
        },
        {
            src: imgNovaAction,
            alt: 'Nova',
            caption: 'Nova'
        },
        {
            src: imgRosMeetupMe,
            alt: 'ROS Meetup Presentation',
            caption: t('ROSMeetupPresentation')
        },
        {
            src: imgRosMeetupTeam,
            alt: 'ROS Meetup Team',
            caption: t('ROSMeetupTeam')
        },
        {
            src: imgSinfonIaSabana,
            alt: 'SinfonIA with the Sabana Herons',
            caption: t('SabanaHerons')
        },
        {
            src: imgSinfonIaPepper,
            alt: 'SinfonIA Team with Pepper',
            caption: t('SinfonIANova')
        }
    ];

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">{t('David Cuevas')}</h1>
            <br></br>
            <Carousel className="mb-5">
                {carouselImages.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image.src}
                            alt={image.alt}
                            style={{
                                height: '500px',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                        <Carousel.Caption>
                            <h3>{image.caption}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="row">
                <div className="col-lg-8 mx-auto">

                    <section className="mb-5">
                        <h2>{t('aboutMe')}</h2>
                        <p className="lead">
                            {t('aboutMeDescription')}
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2>{t('technicalSkills')}</h2>
                        <br></br>

                        {/* Primera fila - Robótica */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <h4>{t('robotics')}</h4>
                                <br></br>
                                <div className="d-flex flex-wrap gap-4 justify-content-center">
                                    <div className="tech-item text-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ros_logo.svg/512px-Ros_logo.svg.png"
                                            alt="ROS"
                                            className="tech-icon mb-2" />
                                        <div className="tech-name">ROS1 & ROS2</div>
                                    </div>
                                    <div className="tech-item text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXWmhTjApCbVEAL_JeBsaMwTHq9aSfv4q7fw&s"
                                            alt="NAOqi"
                                            className="tech-icon mb-2" />
                                        <div className="tech-name">NAOqi</div>
                                    </div>
                                    <div className="tech-item text-center">
                                        <img src="https://classic.gazebosim.org/assets/gazebo_vert-af0a0ada204b42b6daca54e98766979e45e011ea22347ffe90580458476d26d6.png"
                                            alt="Gazebo"
                                            className="tech-icon mb-2" />
                                        <div className="tech-name">Gazebo</div>
                                    </div>
                                    <div className="tech-item text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr5Q2rQ-_N8arO_Ccxcpu4N7PfswPk010trs9SBhoTa95Tx1I2xxLBcubImjVuiRp9jQ&usqp=CAU"
                                            alt="Navigation"
                                            className="tech-icon mb-2" />
                                        <div className="tech-name">Navigation</div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="d-flex flex-wrap gap-4 justify-content-center">
                                    <div className="tech-item text-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
                                            alt="Python"
                                            className="tech-icon mb-2" />
                                        <div className="tech-name">Python</div>
                                    </div>
                                    <div className="tech-item text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRD7Is5t1t34phSWiIZ_L_VpazwhDCFANnTA&s"
                                            alt="C++"
                                            className="tech-icon mb-2" />
                                        <div className="tech-name">C++</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br></br>
                        {/* Segunda fila - Desarrollo Web */}
                        <div class="row mb-4">
                            <div class="col-12">
                                <h4>{t('webDevelopment')}</h4>
                                <br></br>
                                <div class="d-flex flex-wrap gap-4 justify-content-center">
                                    <div class="tech-item text-center">
                                        <img src="https://static-00.iconduck.com/assets.00/react-original-wordmark-icon-840x1024-vhmauxp6.png" alt="React" class="tech-icon me-2" />
                                        <span>React</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png" alt="Angular" class="tech-icon me-2" />
                                        <span>Angular</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" alt="TypeScript" class="tech-icon me-2" />
                                        <span>TypeScript</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQukFURX1rbgzI2xPKA5UTP8LxFy5TG06BaMA&s" alt="Django" class="tech-icon me-2" />
                                        <span>Django</span>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="d-flex flex-wrap gap-4 justify-content-center">
                                    <div class="tech-item text-center">
                                        <img src="https://cdn.worldvectorlogo.com/logos/fastapi.svg" alt="FastAPI" class="tech-icon me-2" />
                                        <span>FastAPI</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="Node.js" class="tech-icon me-2" />
                                        <span>Node.js</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNOW8dJIWuL8rkIWugVrhwFzAv4YwAQHjYAg&s" alt="NestJs" class="tech-icon me-2" />
                                        <span>NestJs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br></br>
                        {/* Tercera fila - IA y Cloud */}
                        <div class="row">
                            <div class="col-12">
                                <h4>{t('aiAndCloud')}</h4>
                                <br></br>
                                <div class="d-flex flex-wrap gap-4 justify-content-center">
                                    <div class="tech-item text-center">
                                        <img src="data:image/png;base64,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" alt="PyTorch" class="tech-icon me-2" />
                                        <span>PyTorch</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://miro.medium.com/v2/resize:fit:1200/1*bSLNlG7crv-p-m4LVYYk3Q.png" alt="YOLO" class="tech-icon me-2" />
                                        <span>YOLO</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv4v8N7exWTN91JwyPZm1jGZ9zyFPtU8POaA&s" alt="GCP" class="tech-icon me-2" />
                                        <span>GCP</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://cdn.worldvectorlogo.com/logos/firebase-1.svg" alt="Firebase" class="tech-icon me-2" />
                                        <span>Firebase</span>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div class="d-flex flex-wrap gap-4 justify-content-center">
                                    <div class="tech-item text-center">
                                        <img src="https://seeklogo.com/images/P/power-bi-icon-logo-E1B451ED39-seeklogo.com.png" alt="Power BI" class="tech-icon me-2" />
                                        <span>Power BI</span>
                                    </div>
                                    <div class="tech-item text-center">
                                        <img src="https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" alt="Tableau" class="tech-icon me-2" />
                                        <span>Tableau</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h2>{t('education')}</h2>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{t('bscTitle')}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Universidad de los Andes</h6>
                                <p className="card-text">2022 - {t('present')}</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{t('technicalTitle')}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">SENA</h6>
                                <p className="card-text">2018 - 2020</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-5">
    <h2>{t('projects')}</h2>
    <Link 
        to="/projects" 
        className="project-showcase-link"
    >
        <div className="project-showcase">
            <div className="project-content">
                <h3 className="showcase-title">{t('viewAllProjects')}</h3>
                <p className="showcase-description">{t('projectsDescription')}</p>
                <div className="showcase-arrow">
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </Link>
</section>

<style jsx>{`
    .project-showcase-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .project-showcase {
        position: relative;
        height: 300px;
        border-radius: 15px;
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .project-showcase:hover {
        transform: translateY(-5px);
    }

    .project-showcase::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('https://i.makeagif.com/media/4-03-2018/C9ukTX.gif') center/cover;
        filter: brightness(0.3);
        z-index: 1;
    }

    .project-content {
        position: relative;
        z-index: 2;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        padding: 2rem;
    }

    .showcase-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .showcase-description {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }

    .showcase-arrow {
        font-size: 2rem;
        transition: transform 0.3s ease;
    }

    .project-showcase:hover .showcase-arrow {
        transform: translateX(10px);
    }
`}</style>

                    <ChatBot />
                </div>
            </div>
        </div>
    );
};

export default Landing;