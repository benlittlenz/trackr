import React, { useState, useContext } from "react";
import FirebaseContext from '../../firebase/context';

const ForgotPassword = () => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [hasPasswordReset, setHasPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  // const { firebase } = useContext(FirebaseContext)
  console.log(FirebaseContext)

  async function handleResetPassword() {
    try {
      console.log(resetPasswordEmail)
      // await firebase.resetPassword(resetPasswordEmail)
      // setHasPasswordReset(true);
      // setPasswordResetError(null);
    } catch(err) {
      console.log("Error sending email:", err);
      // setPasswordResetError(err.message);
      // setHasPasswordReset(false);
    }
  }
  return (
    <div>
      <input 
        type="email"
        className="input"
        placeholder="enter your email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button 
          className="button"
          onClick={handleResetPassword}
          >
          Reset password
        </button>
      </div>
      {hasPasswordReset && <p>Check your email to reset password</p>}
      {passwordResetError && <p className="error-text">
        {passwordResetError}
      </p>}
    </div>
  );
}

export default ForgotPassword;