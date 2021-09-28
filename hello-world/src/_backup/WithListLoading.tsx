import 'braid-design-system/reset';
import { Stack, Heading, Loader } from 'braid-design-system';
import React from 'react';

function WithListLoading(Component: any) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <Stack space="medium" align="center">
        <Heading level="2">
          {/* Hold on, fetching data may take some time :) */}
          Loading
        </Heading>
        <Loader size="large" />
      </Stack>
    );
  };
}
export default WithListLoading;