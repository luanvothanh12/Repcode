import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Repcode",
              "url": "https://www.repcode.io",
              "description": "Your personalized platform to master Leetcode. Organize problems, review via spatial repetition, and get AI-powered feedback.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.repcode.io/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })}
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;