import { Link } from "react-router-dom";

const PublicNavbar = ({ applyModal, setapplyModal }) => {
  return (
    <nav className="fixed h-fit inset-0 px-16 pt-8">
      <ul className="text-white flex items-center w-fit gap-3">
        <li>
          {applyModal == true ? (
            <button onClick={() => setapplyModal(false)}>
              <span className="font-secondary flex items-center justify-center text-xl">
                IT
                <div className="font-primary -rotate-45 font-semibold">e</div>
                Ms
              </span>
            </button>
          ) : (
            <Link
              to="/"
              className="text-xl"
              onClick={() => setapplyModal(false)}
            >
              <span className="font-secondary flex items-center justify-center">
                IT<div className="font-primary -rotate-45 font-semibold">e</div>
                Ms
              </span>
            </Link>
          )}
        </li>
        <span className="text-2xl font-light">|</span>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/faqs">FAQs</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
