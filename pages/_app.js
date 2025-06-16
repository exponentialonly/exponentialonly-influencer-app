export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background-color: #f5f5f5;
          color: #333;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
