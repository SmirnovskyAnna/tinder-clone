import * as React from "react";
import styles from "./AuthModal.module.css";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [error, setError] = React.useState(null);

  console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
      }
      console.log("make a post request to our db");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.authModal}>
      <div className={styles.closeIcon} onClick={handleClick}>
        ✗
      </div>
      <h2>{isSignUp ? "Create Account" : "Log In"}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in your Privacy Policy and Cookies Policy.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondaryButton" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>Get The App</h2>
    </div>
  );
};

export default AuthModal;
