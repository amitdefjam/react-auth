const Footer = () => {
  return (
    <div className="border-top py-3 text-center bg-dark text-primary">
      <span>
        Business Legit <i className="bi bi-patch-check-fill text-primary"></i>
      </span>
      <span className="ms-1">&copy;</span>
      <span className="ms-1">{new Date().getFullYear()}</span>
    </div>
  );
};

export default Footer;
