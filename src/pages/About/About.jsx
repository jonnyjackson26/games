import React from 'react';
import './About.css'
import { Link } from 'react-router-dom';

const About = () => {


    return (
        <>
            <h1>About us</h1>

            <Link to='/'>Back Home</Link>

            <p>Im Jonny Jackson. I made all these games. Theyre free. contact me jrsjackson26@gmail.com</p>

        </>
    );
};

export default About;