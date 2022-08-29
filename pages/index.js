import Head from "next/head";
import Main from "./Main";
import * as HackerNewsApi from "./HackerNewsApi";

export default function Home() {


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />

      <style jsx>{`
        .container {
          min-height: 100vh;
          width: 100%;
          left: 0;
          right: 0;
          position: initial;
          display: flex;
          justify-content: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
