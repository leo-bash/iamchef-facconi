import "../layout.css";


const Header = () => {
  return (
    <header className="header" style={{ padding: "16px 20px", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", minHeight: 56 }}>
      <span className="brand" style={{ color: "#ff2d00", fontSize: "1.2rem", fontWeight: 600, marginLeft: 4, letterSpacing: 0.5 }}>I Am Chef</span>
    </header>
  );
};

export default Header;
