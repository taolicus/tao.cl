const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      // Markup can nest deeply enough that a long attribute list breaks. Keep
      // `>` and `/>` attached to the last attribute instead of stranding the
      // bracket on a line of its own, which is what happens by default.
      files: "*.html",
      options: { bracketSameLine: true },
    },
  ],
};

export default config;
