import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CropFreeIcon from '@mui/icons-material/CropFree';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { BoxModalSx } from '@/style/BoxSx';
import { User } from '@/types/user.type';
import { useSelector } from 'react-redux';
import { getToken } from '@/selectors/user.selector';
import { CustomOnlyIconButton } from './Custom/CustomButton';
import Tooltip from '@mui/material/Tooltip';

interface ResetPasswordTokenModalProps {
    open: boolean;
    onReset: Function;
    onCancel: Function;
    selectedUser: User | null;

}
const ResetPasswordTokenModal = (props: ResetPasswordTokenModalProps) => {

    const { open, onReset, onCancel, selectedUser } = props;
    const Token = useSelector(getToken)

    const [Copied, setCopied] = useState(false);

    const onCopy = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    
        await navigator.clipboard.writeText(`${Token}`);
        setCopied(true);
    };

    const onCopyLink = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const host = window.location.host;
        await navigator.clipboard.writeText(`${host}/reset/?token=${Token}`);
        setCopied(true);
    };

    useEffect(() => {
        if (Copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [Copied]);

    return (
        <Modal open={open}>
            <Box sx={BoxModalSx}>
                <Typography variant="h5" component="h2">
                    Reset Password Token
                </Typography>
                <Typography variant="subtitle1" marginTop="10px" >
                    Userid: {selectedUser ? selectedUser.id : ""}
                </Typography>
                <Typography variant="subtitle1" marginTop="10px" >
                    Username: {selectedUser ? selectedUser.username : ""}
                </Typography>
                <Stack direction="column" spacing={2} height="100%" alignItems="center" justifyContent="center" marginTop="20px">
                    <Box component="form" onSubmit={(e) => onReset(e, selectedUser)} width="100%">
                        <TextField

                            type="text"
                            fullWidth
                            variant="outlined"
                            value={Token ? Token : ''}
                            placeholder='Reset Token'
                        />

                        <Stack
                            direction="row"
                            spacing={1}
                            height="100%"
                            width="100%"
                            alignItems="center"
                            justifyContent="flex-end"
                            paddingTop="25px"
                        >
                            <Button type="submit" variant="contained">
                                Reset
                            </Button>
                            <CustomOnlyIconButton onClick={onCopy}  color={"primary"}>
                                <Tooltip title={Copied ? "Copied to Clipboard " : "Copy Token"}  >
                                    <ContentCopyIcon />
                                </Tooltip>
                            </CustomOnlyIconButton>
                            <CustomOnlyIconButton onClick={onCopyLink}  color={"secondary"}>
                                <Tooltip title={Copied ? "Copied to Clipboard " : "Copy Link Reset Token"}  >
                                    <CropFreeIcon />
                                </Tooltip>
                            </CustomOnlyIconButton>
                            <Button onClick={() => onCancel()}>Cancel</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ResetPasswordTokenModal;
