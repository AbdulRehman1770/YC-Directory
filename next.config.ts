// import {withSentryConfig} from '@sentry/nextjs';
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         dangerouslyAllowSVG : true,
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "**", // Allows all subdomains & hosts
//         },
//       ],
//     },

//       // experimental: {
//       //   ppr : 'incremental'
//       // },

//     devIndicators : {
//       appIsrStatus : true,
//       buildActivity : true,
//       buildActivityPosition : 'bottom-right'
//     }
//   };

// export default withSentryConfig(nextConfig, {
// // For all available options, see:
// // https://www.npmjs.com/package/@sentry/webpack-plugin#options

// org: "abdul-rehman-9m",
// project: "javascript-nextjs",

// // Only print logs for uploading source maps in CI
// silent: !process.env.CI,

// // For all available options, see:
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// // Upload a larger set of source maps for prettier stack traces (increases build time)
// widenClientFileUpload: true,

// // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// // This can increase your server load as well as your hosting bill.
// // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// // side errors will fail.
// // tunnelRoute: "/monitoring",

// // Automatically tree-shake Sentry logger statements to reduce bundle size
// disableLogger: true,

// // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// // See the following for more information:
// // https://docs.sentry.io/product/crons/
// // https://vercel.com/docs/cron-jobs
// automaticVercelMonitors: true,
// });


import { withSentryConfig } from '@sentry/nextjs';
import { ESLint } from 'eslint';

/** @type {import('next').NextConfig} */
const nextConfig = {


  typescript: {
    ignoreBuildErrors: true
  },

  eslint: {
    ignoreBuildErrors: true
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all subdomains & hosts
      },
    ],
  },

  devIndicators: {
    position: "bottom-right", // Updated from `buildActivityPosition`
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry configuration
  org: "abdul-rehman-9m",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for better stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors
  automaticVercelMonitors: true,
});
