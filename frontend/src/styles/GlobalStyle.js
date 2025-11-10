import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --eco-green: #2E8B57;
    --mint: #A8E6CF;
    --bg: #f7fff8;
    --card: #ffffff;
    --text: #223322;
    --shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    overflow-x: hidden;
    max-width: 100vw;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Poppins', sans-serif;
    background: linear-gradient(180deg, #f7fff8 0%, #effff0 100%);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* --------------------- NAVBAR --------------------- */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(46, 139, 87, 0.08);
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(46, 139, 87, 0.1);
  }

  .nav-links {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-wrap: wrap;
  }

  .nav-links a {
    padding: 10px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-weight: 500;
    font-size: 14px;
    color: #333;
    text-decoration: none;
  }

  .nav-links a:hover {
    background: rgba(46, 139, 87, 0.1);
    transform: translateY(-2px);
    color: var(--eco-green);
  }

  .nav-links .active {
    background: linear-gradient(90deg, var(--eco-green), #65b87a);
    color: white;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 12px 16px;
    }

    .nav-links {
      display: none;
    }
  }

  /* --------------------- FOOTER --------------------- */
  .footer {
    padding: 18px;
    text-align: center;
    background: rgba(255, 255, 255, 0.6);
    margin-top: 36px;
  }

  /* --------------------- CARD --------------------- */
  .card {
    background: var(--card);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(46, 139, 87, 0.05);
  }

  .card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  /* --------------------- INPUTS & BUTTONS --------------------- */
  input, select, textarea {
    padding: 12px 16px;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    outline: none;
    transition: all 0.3s ease;
    font-size: 15px;
    width: 100%;
    background: #fff;
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--eco-green);
    box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.1);
    background: #fafffb;
  }

  input::placeholder {
    color: #999;
  }

  button {
    background: var(--eco-green);
    color: white;
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(46, 139, 87, 0.3);
  }

  button:hover:not(:disabled) {
    background: #257a4b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(46, 139, 87, 0.4);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* --------------------- LAYOUT UTILITIES --------------------- */
  .grid { display: grid; gap: 16px; }
  @media (min-width: 900px) {
    .grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
    .grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .grid.cols-3,
    .grid.cols-2 {
      grid-template-columns: 1fr;
    }
  }

  /* --------------------- RESPONSIVE TYPOGRAPHY --------------------- */
  h1 { 
    font-size: clamp(28px, 5vw, 42px); 
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  h2 { 
    font-size: clamp(22px, 4vw, 32px); 
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 12px;
  }
  h3 { 
    font-size: clamp(18px, 3vw, 24px); 
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  /* --------------------- SMOOTH SCROLLING --------------------- */
  html {
    scroll-behavior: smooth;
  }

  /* --------------------- RESPONSIVE IMAGES --------------------- */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* --------------------- ACCESSIBILITY --------------------- */
  *:focus-visible {
    outline: 2px solid var(--eco-green);
    outline-offset: 2px;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--eco-green);
    outline-offset: 2px;
  }

  /* --------------------- LOADING STATES --------------------- */
  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(46, 139, 87, 0.3);
    border-radius: 50%;
    border-top-color: var(--eco-green);
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* --------------------- MOBILE RESPONSIVE --------------------- */
  @media (max-width: 768px) {
    .card {
      padding: 20px;
    }

    h1 {
      font-size: 28px;
    }

    h2 {
      font-size: 22px;
    }

    h3 {
      font-size: 20px;
    }

    .navbar {
      padding: 12px 16px;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 16px;
      border-radius: 12px;
    }

    button {
      padding: 10px 20px;
      font-size: 14px;
    }

    input, select {
      font-size: 14px;
      padding: 10px 14px;
    }
  }

  /* --------------------- UTILITY CLASSES --------------------- */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* --------------------- AUTH PAGES (Login/Signup) --------------------- */
  .auth-container {
    display: flex;
    min-height: 100vh;
  }

  .auth-left {
    flex: 1;
    background: linear-gradient(135deg, #c2f0c2, #7dd47d);
    color: #1b4d1b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
  }

  .auth-left img {
    max-width: 60%;
    margin-bottom: 20px;
  }

  .auth-right {
    flex: 1;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .auth-right form {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .auth-right h2 {
    text-align: center;
    color: var(--eco-green);
    font-size: 28px;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    .auth-container {
      flex-direction: column;
    }

    .auth-left {
      padding: 30px 20px;
      min-height: 40vh;
    }

    .auth-left h2 {
      font-size: 1.4rem;
    }

    .auth-right {
      padding: 30px 20px;
      min-height: 60vh;
    }
  }

  /* --------------------- UPLOAD PAGE --------------------- */
  .upload-container {
    display: flex;
    height: 100vh;
  }

  .upload-left {
    flex: 1;
    background: linear-gradient(135deg, #c2f0c2, #7dd47d);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #1b4d1b;
    text-align: center;
    padding: 40px;
  }

  .upload-left img {
    max-width: 60%;
    margin-bottom: 20px;
  }

  .upload-right {
    flex: 1;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upload-right form {
    width: 80%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* --------------------- AWARENESS SECTION --------------------- */
  .awareness-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .awareness-section h1 {
    text-align: center;
    color: var(--eco-green);
    margin-bottom: 24px;
  }

  .awareness-point {
    background: var(--card);
    padding: 16px;
    border-radius: 12px;
    box-shadow: var(--shadow);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .awareness-point img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    object-fit: cover;
  }

  .awareness-point p {
    flex: 1;
    margin: 0;
  }

`;

export default GlobalStyle;
