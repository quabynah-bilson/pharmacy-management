/*
 * File: dashboard.js                                                          *
 * Project: pharmacy-management                                                *
 * Created Date: Friday, July 2nd 2021, 9:07:06 pm                             *
 * -----                                                                       *
 * Last Modified: Friday, July 2nd 2021 9:07:06 pm                             *
 */

import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { kAppName } from "../utils/constants";

import Spinner from "../components/spinner";
import Notification from "../components/notification";

// firebase
import firebase from "firebase/app";
import "firebase/auth";

function Dashboard() {
  // router
  const router = useRouter();

  // loading
  const [loading, setLoading] = useState(false);

  // setting up page
  const [fetching, setFetching] = useState(true);

  // get login state of user
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      setFetching(false);
      console.log(`user -> ${localStorage.getItem("user")}`);
      if (!user) {
        // navigate to login
        router.push("/");
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Head>
        <title>{kAppName}</title>
        <meta name="description" content="Pharmacy Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center w-full h-full">
        {fetching ? <Spinner /> : <>Dashboard</>}
      </div>
    </div>
  );
}

export default Dashboard;
