import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root{
    --eco-green:#2E8B57;
    --mint:#A8E6CF;
    --bg:#f7fff8;
    --card:#ffffff;
    --text:#223322;
  }
  *{box-sizing:border-box}
  body {
    margin:0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #f7fff8 0%, #effff0 100%);
    color:var(--text);
    -webkit-font-smoothing:antialiased;
  }

  a { color: inherit; text-decoration: none; }

  .navbar {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:14px 28px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(6px);
    box-shadow: 0 6px 18px rgba(46,139,87,0.06);
    position: sticky;
    top: 0;
    z-index: 40;
  }
  .nav-links { display:flex; gap:12px; align-items:center; }
  .nav-links a { padding:8px 10px; border-radius:10px; transition: all .18s ease; }
  .nav-links a:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(46,139,87,0.08); }
  .nav-links .active { background: linear-gradient(90deg,var(--eco-green),#65b87a); color:white; }

  .footer {
    padding:18px; text-align:center; background: rgba(255,255,255,0.6); margin-top:36px;
  }

  .card {
    background: var(--card);
    border-radius:12px;
    padding:16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  /* small utilities */
  .grid { display:grid; gap:16px; }
  @media(min-width:900px){ .grid.cols-3 { grid-template-columns: repeat(3, 1fr); } .grid.cols-2 { grid-template-columns: repeat(2, 1fr); } }
`;
export default GlobalStyle;
