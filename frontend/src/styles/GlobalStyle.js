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

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #f7fff8 0%, #effff0 100%);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
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
    padding: 14px 28px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(6px);
    box-shadow: 0 6px 18px rgba(46, 139, 87, 0.06);
    position: sticky;
    top: 0;
    z-index: 40;
  }

  .nav-links {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .nav-links a {
    padding: 8px 10px;
    border-radius: 10px;
    transition: all 0.18s ease;
  }

  .nav-links a:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(46, 139, 87, 0.08);
  }

  .nav-links .active {
    background: linear-gradient(90deg, var(--eco-green), #65b87a);
    color: white;
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
    border-radius: 12px;
    padding: 16px;
    box-shadow: var(--shadow);
  }

  /* --------------------- INPUTS & BUTTONS --------------------- */
  input, select, textarea {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #c5e1c5;
    outline: none;
    transition: 0.3s;
    font-size: 15px;
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--eco-green);
    box-shadow: 0 0 6px rgba(47, 107, 47, 0.2);
  }

  button {
    background: var(--eco-green);
    color: white;
    padding: 10px 0;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
  }

  button:hover {
    background: #257a4b;
    transform: translateY(-2px);
  }

  /* --------------------- LAYOUT UTILITIES --------------------- */
  .grid { display: grid; gap: 16px; }
  @media (min-width: 900px) {
    .grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
    .grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
  }

  /* --------------------- AUTH PAGES (Login/Signup) --------------------- */
  .auth-container {
    display: flex;
    height: 100vh;
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
  }

  .auth-right form {
    width: 80%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .auth-right h2 {
    text-align: center;
    color: var(--eco-green);
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
