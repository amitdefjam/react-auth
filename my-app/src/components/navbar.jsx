import { NavLink, Link } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand text-primary">
          Business Legit <i className="bi bi-patch-check-fill text-primary"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/signin">
                  Sign in
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/signup">
                  Sign up
                </NavLink>
              )}
            </li>

            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/signupBiz">
                  Sign up Business
                </NavLink>
              )}
            </li>

            <li>
              {user && (
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
