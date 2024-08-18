/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        // Add fallbacks for Node.js modules in client-side bundles
        if (!isServer) {
            config.resolve.fallback = {
                net: false,
                fs: false,
                tls: false,
                http: false,
                https: false,
                // Add other modules you need to exclude
            };
        }
        return config;
    },
};

export default nextConfig;