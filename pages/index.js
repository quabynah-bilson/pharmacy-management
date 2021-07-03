import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { kAppName } from "../utils/constants";
import Spinner from "../components/spinner";
import Notification from "../components/notification";

import { RiAdminLine } from "react-icons/ri";
import { MdSupervisorAccount } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

export const accountTypes = [
  {
    name: "Admin",
    desc: "Gain full access over the entire system",
    Icon: RiAdminLine,
  },
  {
    name: "Supervisor",
    desc: "Gain full access over the entire system",
    Icon: MdSupervisorAccount,
  },
  {
    name: "Staff",
    desc: "Gain full access over the entire system",
    Icon: AiOutlineUser,
  },
];

export default function Home() {
  // router
  const router = useRouter();

  // loading
  const [loading, setLoading] = useState(false);

  // setting up page
  const [fetching, setFetching] = useState(true);

  // toggle login view
  const [showLogin, setShowLogin] = useState(false);

  // account type
  const [accountType, setAccountType] = useState(null);

  // message
  const [message, setMessage] = useState(null);
  // {title: "",subtitle: "",show: false,}

  // authentication method
  const login = async (e) => {
    e.preventDefault();

    // toggle loading & message state
    setLoading(true);
    setMessage(null);

    // get data
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // send data to server and authenticate
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      // return result
      setLoading(false);
      if (!res.user) {
        console.error("user not found");
        setMessage({
          title: "Authentication error",
          subtitle:
            "User account not registered. Try again with a valid account",
          isError: true,
        });
      } else {
        console.log(res.user);
        setMessage({
          title: "Authentication successful",
          subtitle: `Signed in as ${res.user.email}`,
          isError: false,
        });
      }
    } catch (error) {
      setLoading(false);
      setMessage({
        title: "Authentication error",
        subtitle: `${error.message}`,
        show: true,
      });
    }
  };

  // get login state of user
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      setFetching(false);
      if (user) {
        console.log(`logged in successfully as ${user.email}`);
        const token = await user.getIdToken();
        localStorage.setItem("user", {
          uid: user.uid,
          type: accountType?.name,
          token,
        });

        // navigate to dashboard
        router.push("/dashboard");
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="Pharmacy Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-full h-full">
        {fetching ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-2 max-w-7xl w-full h-3/4 mx-auto bg-white shadow-sm rounded-lg">
              {/* left */}
              <div className="w-full h-full relative">
                {message && (
                  <Notification
                    message={message}
                    onClose={() => setMessage(null)}
                  />
                )}

                {/* content */}
                <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto">
                  {showLogin ? (
                    <>
                      <h2 className="text-2xl">Welcome back!</h2>
                      <p className="font-serif mt-2 text-dark text-opacity-50">
                        Manage your store, sell your drugs and more. Sign in to
                        get started
                      </p>

                      {/* form */}
                      <form
                        className="flex flex-col mt-12 w-full max-w-lg mx-auto"
                        onSubmit={login}
                      >
                        {/* email */}
                        <div className="form-control">
                          {/* label */}
                          <label htmlFor="email">E-mail Address</label>
                          {/* input */}
                          <input
                            type="email"
                            name="email"
                            disabled={loading}
                            required={true}
                            placeholder="admin@pharmacare.com"
                          />
                        </div>

                        {/* password */}
                        <div className="form-control">
                          {/* label */}
                          <label htmlFor="password">Password</label>
                          {/* input */}
                          <input
                            type="password"
                            name="password"
                            disabled={loading}
                            required={true}
                            placeholder="min of six characters"
                          />
                        </div>

                        <div className="flex flex-row justify-between items-center mt-8">
                          {/* reset password */}
                          <button
                            type="reset"
                            className="bg-none outline-none border-none px-4 py-3 text-dark"
                          >
                            Recover password
                          </button>

                          {/* submit */}
                          <button
                            type="submit"
                            className={
                              (loading
                                ? "bg-gray-300 text-dark text-opacity-40"
                                : "bg-dark text-white hover:shadow-lg") +
                              ` transition-all duration-150 px-4 py-3 rounded-sm text-center w-1/3`
                            }
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl">Choose your account type</h2>
                      <p className="font-serif mt-2 text-dark text-opacity-50 text-center mb-12">
                        Select your account type to get started. This will
                        enable us to tailor your experience based on the
                        selected account
                      </p>

                      {/* account types */}
                      <div
                        className={`grid grid-rows-${accountTypes.length} gap-y-4 w-full mx-auto max-w-sm`}
                      >
                        {accountTypes.map((account, index) => (
                          <div
                            onClick={() => setAccountType(account)}
                            className={
                              (accountType === account
                                ? "bg-opacity-10 bg-dark border-2 border-dark"
                                : "bg-gray-50 border-2 border-gray-100") +
                              ` flex flex-row px-4 py-4 w-full rounded-lg cursor-pointer`
                            }
                            key={index}
                          >
                            <div className="flex flex-row space-x-8">
                              {/* icon */}
                              <div
                                className={
                                  (accountType === account
                                    ? "rounded-lg bg-dark border-2 border-dark"
                                    : "rounded-lg bg-gray-50 border-2 border-gray-100") +
                                  "py-1 px-3 flex items-center justify-center"
                                }
                              >
                                <account.Icon
                                  className={
                                    accountType === account
                                      ? "text-white"
                                      : "text-gray-400"
                                  }
                                />
                              </div>

                              {/* title & subhead */}
                              <div className="flex flex-col space-y-1">
                                <h6 className="text-sm font-semibold">
                                  {account.name}
                                </h6>
                                <p className="text-xs text-dark text-opacity-50">
                                  {account.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* next */}
                      <button
                        onClick={() => setShowLogin(!showLogin)}
                        type="button"
                        disabled={!accountType}
                        className={
                          (!accountType
                            ? "bg-gray-300 text-dark text-opacity-40"
                            : "bg-dark text-white hover:shadow-lg") +
                          ` transition-all duration-150 px-4 py-3 rounded-sm text-center w-1/3 mt-8`
                        }
                      >
                        Next step
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* right */}
              <div className="bg-gray-200 w-full h-full rounded-tr-lg rounded-br-lg">
                <div className="flex flex-col items-center justify-center mx-auto h-full w-full max-w-xl py-12 px-8">
                  <Image src="/logo.svg" height={60} width={60} />
                  <h2 className="text-3xl mt-8">{kAppName}</h2>
                  <p className="font-serif mt-2 text-dark text-opacity-50 text-center">
                    Need any assistance? Contact our customer service for issues
                    regarding the use of this platform
                  </p>

                  {/* assistance */}
                  <div className="flex flex-row space-x-4 items-center mt-6">
                    {/* request account */}
                    <Link href="/">
                      <div className="text-center text-sm text-opacity-70 hover:shadow-lg hover:bg-white hover:text-opacity-90 transition-all duration-150 bg-gray-50 rounded px-6 py-3 text-dark cursor-pointer">
                        Request account
                      </div>
                    </Link>

                    {/* request store */}
                    <Link href="/">
                      <div className="text-center text-sm text-opacity-70 hover:shadow-lg hover:bg-white hover:text-opacity-90 transition-all duration-150 bg-gray-50 rounded px-6 py-3 text-dark cursor-pointer">
                        Create a store
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
