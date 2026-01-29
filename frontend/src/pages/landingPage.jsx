import { motion } from "framer-motion";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  // Scroll handler for smooth scrolling
  const handleScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="hero-section">
        <div
          className="firstHero"
          style={{
            flexDirection: "column",
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start",
            paddingTop: "40px",
            minHeight: "unset",
            height: "auto",
          }}
        >
          <h2
            className="container"
            style={{ background: "green", width: "150px" }}
          >
            Beta Version
          </h2>
          <h1 style={{ marginBottom: "30px", marginTop: "70px" }}>
            India's DigiBank <br />
            for <span className="gradient-text">Trustworthy</span> <br />
            <span className="purple-text">Certificates</span>
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            margin: "40px 0 40px 0",
          }}
        >
          <button
            className="container"
            onClick={() => handleScroll("second-hero-section")}
          >
            Join the Revolution
          </button>
          <button
            className="container"
            onClick={() => handleScroll("third-hero-section")}
          >
            How it Works
          </button>
        </div>
        <div style={{ height: "100vh", width: "100%" }}></div>
        <div className="secondHero" id="second-hero-section">
          <div
            className="secondHero-left"
            style={{ fontFamily: "times-new-Roman" }}
          >
            <div style={{ marginTop: "40px", marginLeft: "30px" }}>
              <div id="title">
                <h1 id="brand" style={{ fontSize: "80px" }}>
                  DigiBank
                </h1>
                <h1>
                  Choose Your Role in <br />
                  <span style={{ fontSize: "60px", color: "black" }}>
                    India's Trust
                  </span>
                  <br />
                  <span style={{ fontSize: "60px", color: "black" }}>
                    Network
                  </span>
                </h1>
              </div>
              <div id="not-title" style={{ fontSize: "20px" }}>
                <p>
                  DigiBank securely connects citizens, institutions, and
                  employers on a single trusted certificate infrastructure.
                </p>
                <p style={{ marginTop: "50px" }}>
                  Trusted by 2000+ Institutions
                </p>
              </div>
            </div>
          </div>
          <div className="secondHero-right">
            <div>
              <div
                className="loginDiv"
                onClick={() => navigate("/student-register")}
              >
                <div>
                  <i className="bi bi-person" style={{ fontSize: "50px" }}></i>
                </div>
                <div>
                  <div>
                    <h3 id="title">Individual</h3>
                  </div>
                  <div>
                    <p id="not-title">
                      Stores crediential securely in an valid manner
                    </p>
                  </div>
                </div>
                <div>
                  <i
                    class="bi bi-arrow-right-circle"
                    style={{ fontSize: "30px" }}
                  ></i>
                </div>
              </div>
              <div
                className="loginDiv"
                onClick={() => navigate("/institution-register")}
              >
                <div>
                  <i
                    className="bi bi-patch-check"
                    style={{ fontSize: "50px" }}
                  ></i>
                </div>
                <div>
                  <div>
                    <h3 id="title">Institutions</h3>
                  </div>
                  <div>
                    <p id="not-title">
                      Issue verifiable certificates to students
                    </p>
                  </div>
                </div>
                <div>
                  <i class="bi bi-arrow-right-circle" id="right-arrow"></i>
                </div>
              </div>
              <div
                className="loginDiv"
                onClick={() => navigate("/organization-register")}
              >
                <div>
                  <i className="bi bi-eye-fill" id="right-arrow"></i>
                </div>
                <div>
                  <div>
                    <h3 id="title">Hiring Company</h3>
                  </div>
                  <div>
                    <p id="not-title">Verify candiate credentials instantly.</p>
                  </div>
                </div>
                <div>
                  <i class="bi bi-arrow-right-circle" id="right-arrow"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
