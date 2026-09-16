import { ArrowBack, Home } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router';

import Bubble from '@components/common/Bubble';

import { pxToRem } from '@theme/functions';
import {
    BtnBox,
    NotFoundCard,
    NotFoundDescription,
    NotFoundHeading,
    NotFoundImg,
    NotFoundSubHeading,
    NotFoundWrapper,
} from '@components/notFound/NotFound.styles';

const notFoundImg = 'src/assets/images/github-404.png';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundWrapper>
            <Bubble
                sx={{
                    top: pxToRem(-160),
                    right: pxToRem(-128),
                }}
            />

            <Bubble
                sx={{
                    bottom: pxToRem(-160),
                    left: pxToRem(-128),
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

export default NotFound;
