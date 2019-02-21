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
			light: '#b0e0e6',
			main: '#70B8C2',
			dark: '#007180'
		},
		secondary: {
			main: '#000000',
		},
		background: {
			default: '#fff',
		},
	},
	typography: {
		useNextVariants: true,
	},
	shape: {
		borderRadius: 2,
	},
});

export default theme;