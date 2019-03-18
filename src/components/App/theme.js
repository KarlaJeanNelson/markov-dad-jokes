import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	props: {
		MuiInputLabel: {
			shrink: true,
		}
	},
	overrides: {
		MuiCardContent: {
			root: {
				padding: 16,
				'&:last-child': {
					paddingBottom: 16,
				},
			},
		}	
	},
  palette: {
    primary: {
			light: '#d8f0f3',
			main: '#b0e0e6',
			dark: '#318f9b'
		},
		secondary: {
			main: '#000000',
		},
		background: {
			default: '#fff',
		},
	},
	typography: {
		caption: {
			lineHeight: 1,
			letterSpacing: "0em",
		},
		fontWeightBold: 600,
		useNextVariants: true,
	},
	shape: {
		borderRadius: 2,
	},
});

export default theme;