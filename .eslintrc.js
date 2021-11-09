module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript"],
  plugins: ["react-hooks"],
  env: {
    browser: true,
  },
  globals: {},
  rules: {
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
  },
  extends: ["node_modules", "dist"],
};
