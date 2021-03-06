const theme = (type) => ({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  direction: "ltr",
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px) and (orientation: landscape)": {
        minHeight: 48
      },
      "@media (min-width:600px)": {
        minHeight: 64
      }
    }
  },
  overrides: {},
  palette: {
    type,
    primary: {
      main: "#90a4ae"
    },
    secondary: {
      main: "#9e9e9e"
    }
  }
});

export default theme;
