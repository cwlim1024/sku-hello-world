import 'braid-design-system/reset';
import { Stack, Heading, Loader } from 'braid-design-system';
import React from 'react';

const ResultLoader = (Component: any) => {
    return ({ isLoading, ...props }) => {
        if (!isLoading) return <Component {...props} />;
        return (
            <Stack space="medium" align="center">
                <Heading level="2">
                    Loading
                </Heading>
                <Loader size="large" />
            </Stack>
        );
    }
}

export default ResultLoader;