/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            animation: {
                "slide-left": "slideLeft 0.5s ease-in-out forwards",
                "slide-right": "slideRight 0.5s ease-in-out forwards",
            },
            keyframes: {
                slideLeft: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": {transform: "translateX(-100%)" },
                },
                slideRight: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": {transform: "translateX(100%)" },
                }
            },
        },
    },
    plugins: [],
};
