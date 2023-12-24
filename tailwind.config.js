/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				underline: "0 35px  rgba(167,104,245,1.0)",
			},
			fontFamily: {
				mono: "'Noto Sans JP', sans-serif",
			},
			colors: {
				primary: "#64ffda",
				titleColor: "#CCD6F6",
				subTitleColor: "#8892B0",
				pColor: "#8892b0",
			},

			textColor: {
				textColor: "#e6f1ff",
			},
		},
	},
	plugins: [require("@headlessui/tailwindcss"), require("daisyui")],
};
