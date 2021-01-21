import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0
        },
        body: {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0
        },
        '#root': {
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0
        },
      },
    }
  }
});

export default theme;