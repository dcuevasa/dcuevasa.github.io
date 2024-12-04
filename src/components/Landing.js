import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <h1 className="text-center mb-5">David Cuevas</h1>
                    
                    <section className="mb-5">
                        <h2>About Me</h2>
                        <p className="lead">
                            I'm a passionate software developer focused on creating efficient and innovative solutions.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2>Technical Skills</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Programming Languages</h4>
                                <ul className="list-unstyled">
                                    <li>JavaScript</li>
                                    <li>Python</li>
                                    <li>Java</li>
                                    <li>C++</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h4>Technologies</h4>
                                <ul className="list-unstyled">
                                    <li>React.js</li>
                                    <li>Node.js</li>
                                    <li>Git</li>
                                    <li>MongoDB</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h2>Education</h2>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Computer Science Degree</h5>
                                <h6 className="card-subtitle mb-2 text-muted">University Name</h6>
                                <p className="card-text">2019 - Present</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h2>Projects</h2>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Project 1</h5>
                                        <p className="card-text">Description of your first major project.</p>
                                        <a href="#" className="btn btn-primary">View Project</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Project 2</h5>
                                        <p className="card-text">Description of your second major project.</p>
                                        <a href="#" className="btn btn-primary">View Project</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Landing;