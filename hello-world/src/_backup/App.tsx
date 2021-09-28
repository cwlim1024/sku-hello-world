import 'braid-design-system/reset';
import { Stack, BraidLoadableProvider, ContentBlock, Heading, TextField, Button } from 'braid-design-system';
import React, { useEffect, useReducer, useState } from 'react';
import Listing from './List';
import withListLoading from './WithListLoading';

const theme = "jobStreetClassic"
// interface AppProps {
//   site: string;
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'search':
//       return {count: state.count + 1};
//     default:
//       throw new Error();
//   }
// }

// export default ({ site }: AppProps) => {
export default () => {
  const initialState = {
    loading: false,
    data: null
  };
  // const [state, dispatch] = useReducer(reducer, initialState);

  const List = withListLoading(Listing);
  const [appState, setAppState] = useState(initialState);
  const [search, setSearch] = useState(false);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (search) {
      setAppState({ ...appState, loading: true });
      // setTimeout(() => {
      // TODO: implement auth
      // TODO: change to TalentSearch API
      const apiUrl = "https://run.mocky.io/v3/6b7111c4-cd47-40d8-ab19-8c7c9dd277bd" + (keyword ? ("?keyword=" + keyword) : "");
      fetch(apiUrl)
        .then((res) => res.json())
        .then((res) => {
          setAppState({ loading: false, data: res.data });
          setSearch(false);
        });
      // }, 5000)
    }
  }, [search]); // appState


  return (
    <BraidLoadableProvider themeName={theme}>

      <ContentBlock width="large">
        {/* Temp comment out header below due to unknown javascript error */}
        {/* <Stack space="large">
        <Heading level="1">Talent Search</Heading>
        </Stack> */}


        <Stack space="large">
          <Stack space="small">
            <TextField
              id="searchField"
              onChange={(e) => setKeyword(e.currentTarget.value)}
              value={keyword}
            />
            <Button onClick={() => setSearch(true)}>Search</Button>
          </Stack>
          <Stack space="large">
            <List isLoading={appState.loading} data={appState.data} />
          </Stack>
        </Stack>

      </ContentBlock>
    </BraidLoadableProvider>
  )
};
