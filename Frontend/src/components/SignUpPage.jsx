import googleLogo from "../assets/brands/Google.svg";
import facebookLogo from "../assets/brands/Facebook.svg";
import twitterLogo from "../assets/brands/twitter.svg";
import appleLogo from "../assets/brands/apple.svg";

import fullNameIcon from "../assets/icons/fullNameIcon.png";
import emailIcon from "../assets/icons/emailIcon.png";
import passwordIcon from "../assets/icons/passwordIcon.png";
export default function SignUpPage() {
  return (
    <>
      <main className="h-full w-full flex flex-col px-6 py-4">
        <h2 className="font-extrabold text-lg">Sign up for free</h2>
        <p className="max-w-[40ch] my-2">
          Please enter your details and create a strong password to continue
        </p>
        <form className="flex flex-col my-5 gap-3">
          <label htmlFor="fullName" className="labelWithRoundedCorner">
            <img className="signInIcons" src={fullNameIcon} alt="" />{" "}
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              required
            />
          </label>
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
          <label htmlFor="acceptTerms" className="justify-start">
            <input type="checkbox" name="acceptTerms" id="acceptTerms" />{" "}
            <span>Accept terms & conditions</span>
          </label>
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white p-3 rounded-[30px] hover:bg-[var(--primary-color-light)]"
          >
            Continue
          </button>
        </form>

        <div className="border-b-2 flex justify-center items-center relative my-3">
          <span className="block bg-white absolute bottom-1/2 translate-y-1/2 p-2">
            Or continue with
          </span>
        </div>

        <div className="services flex items-center justify-around w-full mt-auto mb-3">
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

        <section>
          <span>
            Already have account with us?{" "}
            <a href="/" className="text-[var(--primary-color)] font-bold">
              Sign In
            </a>
          </span>
        </section>
      </main>
    </>
  );
}
