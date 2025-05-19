import Script from "next/script";


export const metadata = {
  title: "Scaless",
  description: "fish is the best",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/bootstrap.css" />
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
        <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
      </head>
      <body>
              {/* <!-- Preloader Start --> */}
              {/* <div className="preloader">
            <div className='circle'>
                <div className="circle-cutter"></div>
                <div className="circle-inner"></div>
            </div>
        </div> */}
        {/* <!-- Preloader Start --> */}


        {children}
         
         
        {/* It's better to use next/script for these: */}
        <Script src="/assets/js/jquery.js"></Script>
        <Script src="/assets/js/bootstrap.min.js"></Script>
        <Script src="/assets/js/jquery.appear.js"></Script>
        <Script src="/assets/js/owl.carousel.min.js"></Script>
        <Script src="/assets/js/slick.js"></Script>
        <Script src="/assets/js/lightcase.js"></Script>
        <Script src="/assets/js/jquery-ui.js"></Script>
        <Script src="/assets/js/theme.js"></Script>
      </body>
    </html>
  );
}
