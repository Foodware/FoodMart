import { Link } from "react-router-dom";
import googleLogo from "../assets/brands/Google.svg";
import facebookLogo from "../assets/brands/Facebook.svg";
import twitterLogo from "../assets/brands/twitter.svg";
import appleLogo from "../assets/brands/apple.svg";

import fullNameIcon from "../assets/icons/fullNameIcon.png";
import emailIcon from "../assets/icons/emailIcon.png";
import passwordIcon from "../assets/icons/passwordIcon.png";

export default function SignInPage() {
  return (
    <>
      <main className="h-full w-full flex flex-col px-6 py-4">
        <h2 className="font-extrabold text-lg">Log In</h2>
        <p className="max-w-[40ch] my-2">
          Please enter your login details below!
        </p>
        <form className="flex flex-col my-5 gap-3">

          <label htmlFor="email" className="labelWithRoundedCorner">
            <img className="signInIcons" src={emailIcon} alt="" />{" "}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              required
            />
          </label>
          <label htmlFor="password" className="labelWithRoundedCorner">
            <img className="signInIcons" src={passwordIcon} alt="" />{" "}
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            />
          </label>
          <span className="text-right text-[var(--primary-color)] cursor-pointer">Forgot Password?</span>
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white p-3 rounded-[30px] hover:bg-[var(--primary-color-light)]"
          >
            Continue
          </button>
        </form>

        <div className="border-b-2 flex justify-center items-center relative my-3">
          <span className="block bg-white absolute bottom-1/2 translate-y-1/2 p-2">
            Or Login with
          </span>
        </div>

        <div className="services flex items-center justify-around w-full mt-12 mb-3 gap-2">
          <div className="google rounded-3xl px-3 py-2">
            <img src={googleLogo} alt="Google Logo" /> <span>Google</span>
          </div>
          <div className="facebook rounded-full p-2">
            <img src={facebookLogo} alt="Facebook Logo" />
          </div>
          <div className="twitter rounded-full p-2">
            <img src={twitterLogo} alt="Twitter Logo" />
          </div>
          <div className="apple rounded-full p-2">
            <img
              src={appleLogo}
              alt="
            Apple Logo"
            />
          </div>
        </div>

        <section className="text-center mt-auto mb-6">
          <span>
            Don&apos;t have an account with us?{" "}
            <Link to={"/"} className="text-[var(--primary-color)] font-bold">
              SignUp
            </Link>
          </span>
        </section>
      </main>
    </>
  );
}
