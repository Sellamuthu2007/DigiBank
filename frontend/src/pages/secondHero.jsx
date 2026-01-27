import { motion } from "framer-motion"

import '../App.css';

export default function SecondHero(){
    // Scroll handler for smooth scrolling
    const handleScroll = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
        <div className="hero-section">
            <div className="firstHero" style={{ flexDirection: 'column', alignItems: 'center', display: 'flex', justifyContent: 'flex-start', paddingTop: '40px', minHeight: 'unset', height: 'auto' }}>
                <h1 style={{ marginBottom: '30px' }}>India's DigiBank <br/>for <span className="gradient-text">Trustworthy</span> <br/><span className="purple-text">Certificates</span></h1>
            </div>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '40px 0 40px 0' }}>
                <button
                    style={{
                        background: 'linear-gradient(90deg, #4169e1, #1e90ff)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 32px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(65,105,225,0.2)'
                    }}
                    onClick={() => handleScroll('second-hero-section')}
                >
                    Join the Revolution
                </button>
                <button
                    style={{
                        background: 'linear-gradient(90deg, #4169e1, #1e90ff)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 32px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(65,105,225,0.2)'
                    }}
                    onClick={() => handleScroll('third-hero-section')}
                >
                    How it Works
                </button>
            </div>
            <div style={{height: '100vh', width: '100%'}}></div>
            <div className="secondHero" id="second-hero-section">
                <div className="secondHero-left" style = {{fontFamily : "times-new-Roman"}}>
                    <div style = {{marginTop : "100px" , marginLeft : "30px", }}>
                        <div>
                            <h1 className="brand-name">DigiBank</h1>
                        <h1>Choose Your Role in <br/><span style = {{"fontSize" : "60px" , color : "black"}}>India's Trust
                        </span><br/><span style = {{"fontSize" : "60px" , color : "black"}}>Network</span></h1>
                        </div>
                        <div>
                            <h2>DigiBank securely connects citizens, institutions, and employers on a single trusted certificate infrastructure.</h2>
                        </div>
                    </div>
                </div>
                <div className="secondHero-right">
                    <div>
                        <div className='loginDiv'>
                        <div>
                            <i className="bi bi-person" style = {{"fontSize":"50px"}}></i>
                        </div>
                        <div>
                            <div><h3>Individual</h3></div>
                            <div><p>Stores crediential securely in an valid manner</p></div>
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div>
                            <i className="bi bi-building" style = {{"fontSize":"50px"}}></i>
                        </div>
                        <div>
                            <div><h3>Institutions</h3></div>
                            <div><p>Issue verifiable certificates to students</p></div>
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div>
                            <i className="bi bi-eye-fill" style = {{"fontSize":"30px"}}></i>
                        </div>
                        <div>
                            <div><h3>Hiring Company</h3></div>
                            <div><p>Verify candiate credentials instantly.</p></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        
        
        </>
    )

    
}