import Document, { Html, Head, Main, NextScript } from "next/document";

const Doc = () => {
  const getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  };
  return (
    <Html>
      <Head>
        <title>AI Homework Helper | Homework AI</title>
        <link rel="canonical" href="https://oddityai.com" />
        <meta
          name="description"
          content="Homework AI Is the AI That Does Homework. If You
Are a Student Who Needs Homework Solutions This AI Homework Helper
Is for You. Give This AI Homework App a Try, It’ll Solve & Write Your
Homework"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="student homework app ai, ai that does homework, ai doing
homework, ai homework writer, homework helper ai, homework ai, ai
homework solver, ai for homework, ai  homework, ai homework solutions, ai
homework helper"
        />{" "}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Doc;
