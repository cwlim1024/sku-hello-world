import 'braid-design-system/reset';
import { Heading, Card, Inline, ButtonLink, Columns, Column, TextField, Button, Tag, Stack, Box, Autosuggest } from 'braid-design-system';
import React, { Fragment, useCallback, useState } from 'react';
import { AutosuggestValue } from 'braid-design-system/lib/components/Autosuggest/Autosuggest';

const SearchBar = ({ keyword, onKeywordChange, onSearch }) => {

    const [showTextField, setShowTextField] = useState(false);
    const [tagsValue, setTagsValue] = useState<any[]>([]);

    const handleKeywordChange = useCallback((keyword: any) => {
        onKeywordChange(keyword);
    }, [onKeywordChange])

    const handleSearch = useCallback((search: boolean) => {
        onSearch(search);
    }, [onSearch])

    const handleShowTextField = useCallback((e, show: boolean) => {
        if (e == undefined || e.target.id !== 'searchField') {
            setShowTextField(show);
        }
    }, [])

    const filterSuggestions = useCallback((keywords) => {
        return keywords;
    }, [])

    const handleSuggestChange = useCallback((suggest: any) => {
        console.log('suggest', suggest)
        // const emptyArray: any[] = [];
        if (suggest.value !== undefined) {
            console.log('before objectassign', tagsValue);
            setTagsValue(tagsValue => [...tagsValue, suggest]);
            console.log('after setTags', tagsValue);
        }
        // console.log('after setTags', tags);
    }, [])

    return (
        <Fragment>
            <Card>
                <Columns space="xsmall" alignY="center">
                    <Column width="1/5">
                        <Heading level="4">Talent Search</Heading>
                    </Column>
                    <Column width="3/5">
                        <Stack space="small">
                            <Inline space="small">
                                <Box padding="xsmall" alignItems="center"
                                    component="div"

                                    background="input"
                                    boxShadow="borderStandard"
                                    onClick={(e) => handleShowTextField(e, !showTextField)}>
                                    <Inline space="small" alignY="center">
                                        {/* <Tag>Position Title +</Tag>
                                        <Tag>Skill +</Tag>
                                        <Tag>Keyword +</Tag> */}
                                        {/* <Tag onClear={() => alert("clearPosition")} clearLabel={'Clear "Position Title: Software engineer"'}>Position Title: Software engineer</Tag> */}
                                        {/* <Tag onClear={() => alert("clearSkill")} clearLabel={'Clear "Skill: Reactjs"'}>Skill: Reactjs</Tag> */}
                                        {/* <Tag onClear={() => alert("clearKeyword")} clearLabel={'Clear "Keyword: Agile"'}>Keyword: Agile</Tag> */}
                                        {/* <Tag >Add +</Tag> */}
                                        {/* <Box component={Tag} background="input" boxShadow="borderStandard" style={{ background: "critical" }}>aaa</Box> */}
                                        {
                                            tagsValue.map((tag, i) => {
                                                console.log('render tag', tag);
                                                return (
                                                    <Tag key={i} onClear={() => alert("clear " + tag.text)} clearLabel={'Clear "' + tag.text + '"'}>{tag.text}</Tag>
                                                )
                                            })
                                        }
                                        {(!showTextField && <Tag >Add +</Tag>)}
                                    </Inline>
                                    {(showTextField && <Autosuggest
                                        id="searchField"
                                        autoFocus={true}
                                        onBlur={() => handleShowTextField(undefined, false)}
                                        automaticSelection
                                        // label="I like to eat"
                                        value={{ text: 'a' }}
                                        onChange={(e: AutosuggestValue) => handleSuggestChange(e)}
                                        // onClear={() => resetState("value")}
                                        suggestions={filterSuggestions([
                                            {
                                                label: "Position Title",
                                                suggestions: [
                                                    {
                                                        text: "Software Engineer",
                                                        value: 1,
                                                    },
                                                    {
                                                        text: "Accountant",
                                                        value: 2,
                                                    },
                                                ],
                                            },
                                            {
                                                label: "Skills",
                                                suggestions: [
                                                    {
                                                        text: "AngularJS",
                                                        value: 1,
                                                    },
                                                    {
                                                        text: "ReactJS",
                                                        value: 2,
                                                    },
                                                ],
                                            },
                                            {
                                                label: "Keywords",
                                                suggestions: [
                                                    {
                                                        text: "xxxxx",
                                                        value: 1,
                                                    },
                                                    {
                                                        text: "yyyyy",
                                                        value: 2,
                                                    },
                                                ],
                                            }
                                        ])}
                                    />)}
                                </Box>
                                {/* {(showTextField && <TextField
                                    id="searchField"
                                    onChange={(e) => handleKeywordChange(e.currentTarget.value)}
                                    value={keyword}
                                    placeholder="Add"
                                    autoFocus={true}
                                    onBlur={() => handleShowTextField(false)}
                                />)} */}


                                <Button onClick={() => handleSearch(true)}>Search</Button>
                            </Inline>
                            {/* <Inline space="small">
                                <Tag onClear={() => alert("clearPosition")} clearLabel={'Clear "Position Title: Software engineer"'}>Position Title: Software engineer</Tag>
                                <Tag onClear={() => alert("clearSkill")} clearLabel={'Clear "Skill: Reactjs"'}>Skill: Reactjs</Tag>
                                <Tag onClear={() => alert("clearKeyword")} clearLabel={'Clear "Keyword: Agile"'}>Keyword: Agile</Tag>
                            </Inline> */}
                        </Stack>

                    </Column>
                    <Column>
                        <Inline space="medium" align="right">

                            <Inline space="none" align="right">
                                <ButtonLink href="#" variant="transparent" onClick={() => alert('bookmark')}>Bookmark</ButtonLink>
                                <ButtonLink href="#" variant="transparent" onClick={() => alert('retrieved resume')}>Retrieved Resume</ButtonLink>
                            </Inline>

                        </Inline>

                    </Column>
                </Columns>
            </Card>
        </Fragment >
    )
}
export default SearchBar;