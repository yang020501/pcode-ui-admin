import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material';


export const CustomIconButton = ({ content, sx, variant, type, onClick, startIcon, color, fullWidth }: any) => (
	<Button color={color} sx={sx} variant={variant} type={type} onClick={onClick} startIcon={startIcon} fullWidth={fullWidth}>
		{content}
	</Button>
);

interface CustomOnlyIconButtonProps {
	sx?: SxProps;
	children: any;
	variant?: any;
	color?: any;
	onClick?: Function;
	form?: string;
	disabled?: boolean;
	submit?: boolean;
	onSubmit?: any;
}
export const CustomOnlyIconButton = (props: CustomOnlyIconButtonProps) => (
	<IconButton
		onSubmit={props.onSubmit ? props.onSubmit : null}
		type={props.submit ? "submit" : "button"}
		color={props.color}
		sx={props.sx}
		onClick={(e) => {
			props.onClick ?
				props.onClick(e) :
				null
		}}
		form={props.form}
		disabled={props.disabled}
	>
		{props.children}
	</IconButton>
);
