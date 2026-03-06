/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#994D80",
				secondary: "#ED2BAD",
				"text-dark": "#1C0D17",
				"bg-paper": "#F2E8F0",
				"bg-main": "#FCF8FA",
			},
		},
	},
	plugins: [],
};
