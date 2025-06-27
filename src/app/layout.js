import Script from "next/script";
import Contextshare from "./context/Contextshare";

export const metadata = {
  title: "Scaless",
  description: "fish is the best",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap 5.3.6 CSS via CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
          crossOrigin="anonymous"
        />

        {/* Custom Stylesheets */}
        <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/elegant-icons.css" />
        <link rel="stylesheet" href="/assets/css/fishto-icons.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/assets/css/slick.css" />
        <link rel="stylesheet" href="/assets/css/lightcase.css" />
        <link rel="stylesheet" href="/assets/css/theme.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
                <link rel="shortcut icon" type="image/x-icon" href="/assets/images/logo/logo01.png"/>


        {/* FontAwesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
         <script src="https://cdn.razorpay.com/widgets/affordability/affordability.js"></script>
      </head>

      <body>
        <Contextshare>{children}</Contextshare>

        {/* Bootstrap 5 JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* Additional Scripts */}
        <Script src="/assets/js/jquery.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/slick.js" strategy="afterInteractive" />
        <Script src="/assets/js/lightcase.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery-ui.js" strategy="afterInteractive" />
        <Script src="/assets/js/theme.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
