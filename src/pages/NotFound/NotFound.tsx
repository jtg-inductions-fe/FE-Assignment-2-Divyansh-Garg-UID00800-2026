import { Link, useNavigate } from 'react-router';

import { ArrowBack, Home } from '@mui/icons-material';
import { Button } from '@mui/material';

import { Bubble } from '@components/Common';

import { pxToRem } from '@theme';

import {
    BtnBox,
    NotFoundCard,
    NotFoundDescription,
    NotFoundHeading,
    NotFoundImg,
    NotFoundSubHeading,
    NotFoundWrapper,
} from './NotFound.styles';

const notFoundImg = 'src/assets/images/github-404.png';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundWrapper>
            <Bubble
                sx={{
                    top: pxToRem(-120),
                    right: pxToRem(-120),
                }}
            />

            <Bubble
                sx={{
                    bottom: pxToRem(-120),
                    left: pxToRem(-120),
                }}
            />

            <NotFoundCard>
                <NotFoundImg component="img" src={notFoundImg} alt="GitHub 404 image" />

                <NotFoundHeading variant="h1" color="primary">
                    404
                </NotFoundHeading>

                <NotFoundSubHeading variant="h3">Page Not Found</NotFoundSubHeading>

                <NotFoundDescription variant="body1" color="text.secondary">
                    Looks like you've wandered into an empty repository. The page you're looking for
                    doesn't exist or may have been moved somewhere else.
                </NotFoundDescription>

                <BtnBox
                    direction={{
                        xs: 'column',
                        sm: 'row',
                    }}
                >
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="large"
                        startIcon={<Home />}
                        sx={(theme) => ({
                            borderRadius: theme.variables.radius.pill,
                        })}
                    >
                        Back to Home
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}
                        variant="outlined"
                        size="large"
                        startIcon={<ArrowBack />}
                        sx={(theme) => ({
                            borderRadius: theme.variables.radius.pill,
                        })}
                    >
                        Go Back
                    </Button>
                </BtnBox>
            </NotFoundCard>
        </NotFoundWrapper>
    );
};
