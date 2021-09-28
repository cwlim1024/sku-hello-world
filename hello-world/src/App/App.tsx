import 'braid-design-system/reset';
import { Stack, BraidLoadableProvider, ContentBlock, Text, Alert } from 'braid-design-system';
import React, { useEffect, useState } from 'react';
import Listing from './Pages/Search/Components/List';
import Header from './Components/Header';
import ResultLoader from './Components/ResultLoader';
import SearchBar from './Pages/Search/Components/SearchBar';


const theme = "jobStreetClassic"
// interface AppProps {
//   site: string;
// }

// export default ({ site }: AppProps) => {
export default () => {
  const initialState = {
    loading: false,
    data: null,
    facets: null,
    paging: null
  };

  const SearchResult = ResultLoader(Listing);
  const [appState, setAppState] = useState(initialState);
  const [search, setSearch] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (search) {
      setAppState({ ...appState, loading: true });

      // TODO: implement auth
      // TODO: change to TalentSearch API
      const apiUrl = "https://run.mocky.io/v3/6b7111c4-cd47-40d8-ab19-8c7c9dd277bd" + (keyword ? ("?keyword=" + keyword) : "");
      fetch(apiUrl)
        .then((res) => res.json())
        .then((res) => {
          setAppState({ loading: false, data: res.data, facets: res.facet, paging: res.paging });
          setSearch(false);
        });
    }
  }, [search]); // appState

  return (
    <BraidLoadableProvider themeName={theme}>

      <ContentBlock width="large">
        {/* header */}
        <Header></Header>

        <br />
        {/* Promote message */}
        <Alert
          tone="promote"
          onClose={() => alert("close message")}
          closeLabel="Close info message"
        >
          <Text>New! You can now save candidate profiles for future reference. View them later in your Bookmarks folder.</Text>
        </Alert>
        <br />

        {/* search bar */}
        <Stack space="large">
          <SearchBar keyword={keyword} onKeywordChange={setKeyword} onSearch={setSearch}></SearchBar>

          {/* Listing + facet */}
          <Stack space="large">
            <SearchResult isLoading={appState.loading} data={appState.data} facets={appState.facets} paging={appState.paging} />
          </Stack>
        </Stack>

      </ContentBlock>
    </BraidLoadableProvider>
  )
};
