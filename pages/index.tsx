import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Next.js Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Check{" "}
          <Link
            href={"https://gitlab.com/codingsans/codingchallenge2022fall/frontend-nextjs-task/-/blob/main/README.md"}
          >
            <a>README.md</a>
          </Link>{" "}
          for the task description!
        </h1>
      </main>
    </div>
  );
};

export default Home;
