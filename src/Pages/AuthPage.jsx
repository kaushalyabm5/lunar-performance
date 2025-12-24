import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import bgImg from "../assets/bg-3.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const validatePassword = (pwd) => {
    const strongPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return strongPassword.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    setLoading(true);

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (isSignup && !validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // ✅ Send email verification
        await sendEmailVerification(userCredential.user);
        setInfoMessage("Verification email sent! Please check your inbox.");
        auth.signOut();
        setIsSignup(false);
        setShowResend(true); // Show resend button in login
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in.");
          setShowResend(true);
          setLoading(false);
          return;
        }

        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") setError("No account found with this email.");
      else if (err.code === "auth/wrong-password") setError("Incorrect password.");
      else if (err.code === "auth/email-already-in-use") setError("Email already in use.");
      else if (err.code === "auth/invalid-email") setError("Invalid email address.");
      else setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError("Please enter your email first to resend verification.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setInfoMessage("Verification email resent! Please check your inbox.");
      } else {
        setError("Sign in first to resend verification email.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4b4949] via-black to-black px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl">
        {/* LEFT FORM */}
        <div className="p-8 sm:p-12 text-white">
          <h1 className="text-3xl font-semibold mb-2">{isSignup ? "Sign up" : "Login"}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {isSignup ? "Create your account" : "Welcome back, login to continue"}
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {infoMessage && <p className="text-green-500 text-sm mb-4">{infoMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          {/* Resend verification button */}
          {showResend && !isSignup && (
            <button
              onClick={handleResendEmail}
              disabled={loading}
              className="mt-3 w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition text-black font-medium"
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </button>
          )}

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="cursor-pointer w-full py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p
            className="text-sm text-green-500 mt-6 cursor-pointer hover:text-white transition"
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setInfoMessage("");
            }}
          >
            {isSignup ? "Already have an account? Login" : "Don’t have an account? Sign up"}
          </p>

          <p className="mt-10 text-center text-xs tracking-widest uppercase text-white/40">
            Lunar Performance
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block relative">
          <img
            src={bgImg}
            alt="Auth visual"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
