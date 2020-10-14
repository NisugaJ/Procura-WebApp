import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#af52bf",
      main: "#9C27B0", // Primary Color
      dark: "#6d1b7b",
      contrastText: "#2E266F",
      info:"#00ACC1",
      success:"#4CAF50"
    },
    secondary: {
      dark: "#007887",
      light: "#33bccd",
      main: "#00ACC1",
      contrastText: "#000000",
    },
    error: {
      main: "#F44336",
      dark: "#801313",
      light: "#c54949"
    }
    // error - used to represent interface elements that the user should be made aware of.
    // warning - used to represent potentially dangerous actions or important messages.
    // info - used to present information to the user that is neutral and not necessarily important.
    // success - used to indicate the successful completion of an action that user triggered.
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      }
    },
    MuiAppBar:{
        colorTransparent : {
            //Styles to apply if AppBar is transparent
            background: 'transparent',
            boxShadow: 'none',
        }
    },
  }
})



theme = responsiveFontSizes(theme)

export { theme }
