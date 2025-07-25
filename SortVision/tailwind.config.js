const config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [

    ],
    theme: {
        extend: {
            colors: {
                'hc-primary': '#FFFF00',
                'hc-background': '#000000',
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
};

export default config;