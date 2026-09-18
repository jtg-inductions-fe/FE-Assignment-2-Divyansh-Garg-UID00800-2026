import type { SvgIconComponent } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { pxToRem } from '@theme/functions';

interface SubmitButton {
    loading: boolean;
    initialLabel: string;
    processingLabel: string;
    icon: SvgIconComponent;
    onClick: () => Promise<void>;
}

export const SubmitButton = ({
    loading,
    initialLabel,
    processingLabel,
    icon,
    onClick,
    ...props
}: SubmitButton) => {
    const Icon = icon;
    return (
        <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            onClick={onClick}
            startIcon={loading ? <CircularProgress size={pxToRem(16)} /> : <Icon />}
            sx={(theme) => ({
                borderRadius: theme.variables.radius.pill,
            })}
            {...props}
        >
            {loading ? processingLabel : initialLabel}
        </Button>
    );
};
