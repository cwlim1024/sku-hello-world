import 'braid-design-system/reset';
import {
    Stack,
    Tiles,
    Card,
    Text,
    IconMoney,
    IconEducation,
    Columns,
    Column,
    Heading,
    Inline,
    IconBookmark,
    Strong,
    IconSearch,
    Checkbox,
    Accordion,
    AccordionItem,
    IconList,
    IconGrid,
    ButtonLink,
    IconAdd,
    Dropdown,
    Box,
} from 'braid-design-system';
import React, { Fragment, useState } from 'react';
import moment from 'moment';

const defaultFacetConfig = [
    { key: "nationality", label: "Country of Nationality", expanded: true },
    { key: "location", label: "Preferred Work Location", expanded: true },
    { key: "industry", label: "Industry", expanded: true },
    { key: "salary", label: "Salary", expanded: true },
    { key: "language", label: "Language", expanded: false },
    { key: "years_of_experience", label: "Years of Experience", expanded: false },
    { key: "position_level", label: "Position Level", expanded: false },
    { key: "specialization", label: "Specialization", expanded: false },
    { key: "qualification", label: "Education", expanded: false },
    { key: "field_of_study", label: "Field of Study", expanded: false },
    { key: "last_updated", label: "Last Updated", expanded: false }
]

function formatData(talent: any) {
    // data.map((talent: any) => {
    const cardData: any = {};
    const isRetrieved = talent.candidate.formatted_name !== '';
    if (isRetrieved) {
        // Retrieved candidates
        cardData.primaryHeading = talent.candidate.formatted_name;
        const experience = talent.current.position_title !== '' ? 'current' : 'previous';
        if (talent[experience].position_title !== '') {
            const duration = Math.round(moment().diff(moment(talent[experience].join_date.date, "YYYY-MM-DD"), "days") / 365.0);
            cardData.primaryBody1 = `${talent[experience].position_title}`;
            if (duration > 0) {
                cardData.primaryBody1 = cardData.primaryBody1 + ' (' + duration + ' yrs)';
            }
            cardData.primaryBody2 = talent[experience].company_name;

            if (experience === 'current' && talent.previous.position_title !== '') {
                const previousDuration = Math.round(moment().diff(moment(talent.previous.join_date.date, "YYYY-MM-DD"), "days") / 365.0);
                cardData.secondaryBody1 = talent.previous.position_title;
                cardData.secondaryBody1 = cardData.secondaryBody1 + ' (' + previousDuration + ' yrs)';
                cardData.secondaryBody2 = talent.previous.company_name;
            } else if (talent.highest_education.field_of_study !== '') {
                cardData.secondaryBody1 = talent.highest_education.field_of_study;
                cardData.secondaryBody2 = talent.highest_education.college;
            } else {
                cardData.secondaryBody1 = talent.preference.specialization;
                cardData.secondaryBody2 = '';
            }

        } else if (talent.highest_education.field_of_study !== '') {
            cardData.primaryBody1 = talent.highest_education.field_of_study;
            cardData.primaryBody2 = talent.highest_education.college;

            cardData.secondaryBody1 = talent.preference.specialization;
            cardData.secondaryBody2 = '';
        } else {
            cardData.primaryBody1 = talent.preference.specialization;
        }

    } else {
        // Not retrived candidates
        const experience = talent.current.position_title !== '' ? 'current' : 'previous';
        if (talent[experience].position_title !== '') {
            const duration = Math.round(moment().diff(moment(talent[experience].join_date.date, "YYYY-MM-DD"), "days") / 365.0);
            cardData.primaryHeading = `${talent[experience].position_title}`;
            if (duration > 0) {
                cardData.primaryHeading = cardData.primaryHeading + ' (' + duration + ' yrs)';
            }

            cardData.primaryBody1 = talent[experience].company_name;
            cardData.primaryBody2 = '';

            if (experience === 'current' && talent.previous.position_title !== '') {
                cardData.secondaryBody1 = talent.previous.position_title;
                cardData.secondaryBody2 = talent.previous.company_name;
            } else {
                cardData.secondaryBody1 = talent.highest_education.field_of_study;
                cardData.secondaryBody2 = talent.highest_education.college;
            }
        } else if (talent.highest_education.field_of_study !== '') {
            cardData.primaryHeading = talent.highest_education.field_of_study;
            cardData.primaryBody1 = talent.highest_education.college;
            // cardData.primaryBody1 = talent.highest_education.field_of_study;
            // cardData.primaryBody2 = talent.highest_education.college;

            cardData.secondaryBody1 = talent.preference.specialization;
        } else {
            cardData.primaryBody1 = talent.preference.specialization;
        }
    }

    return cardData;
}

const Listing = (properties: any) => {
    const [gridColumns, setGridColumns] = useState([1, 1, 3]);
    const { data, facets, paging } = properties;
    const [facetConfig, setFacetConfig] = useState(defaultFacetConfig);

    function toggleFacet(key: any) {
        const temp = facetConfig.map((item) => {
            if (item.key === key) {
                item.expanded = !item.expanded;
            }
            return item;
        });

        setFacetConfig(temp);
    }

    if (!data || data.length === 0) {
        return (
            <Fragment>
                <Stack space="none" align="center">
                    {/* <h2>Start your search now</h2>
                    <IconSearch /> */}
                    <Heading component="div" level="1" align="center">
                        Start your search now
                        <br />
                        <IconSearch />
                    </Heading>
                </Stack>
            </Fragment>
        )
    };
    return (
        <Fragment>
            {/* Search results */}
            <Stack space="medium">
                <Columns space="xsmall">
                    {/* Facet */}
                    <Column width="1/4">
                        <Stack space="medium">
                            <Tiles columns={1} space="none">
                                <Card><Accordion dividers={false} >
                                    {
                                        facetConfig.map((config, i) => {
                                            if (facets) {
                                                const facet = facets.find((facet: any) => facet.field === config.key);
                                                if (facet && facet.data) {
                                                    return (
                                                        <AccordionItem key={config.key} label={config.label} id={config.key} expanded={config.expanded} onToggle={() => toggleFacet(config.key)}>
                                                            {
                                                                facet.data.map((item: any) => {
                                                                    const label = item.name + ' (' + item.total + ')';
                                                                    return (
                                                                        <Checkbox
                                                                            size="small"
                                                                            key={item.code}
                                                                            id={item.code}
                                                                            // checked={getState("checked")}
                                                                            // onChange={() => toggleState("checked")}
                                                                            checked={false}
                                                                            onChange={() => alert("onChange")}
                                                                            label={label}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                            <ButtonLink size="small" href="#" variant="transparent" onClick={() => alert('add facet')}>
                                                                <IconAdd />
                                                                Add
                                                            </ButtonLink>


                                                        </AccordionItem>
                                                    )
                                                }
                                            }

                                        })
                                    }

                                </Accordion></Card>
                            </Tiles>
                        </Stack>
                    </Column>

                    <Column width="3/4">
                        <Stack space="medium">
                            {/* Action button: Grid view, List view */}
                            <Tiles columns={2} space="small" dividers="strong">

                                <Heading level="4" weight="weak"><Strong>{paging.total}</Strong> resumes match your search</Heading>

                                <Inline space="small" align="right" alignY="center">
                                    <Text>Sort By</Text>
                                    <Dropdown id="sortBy" value="Most relevant" onChange={() => alert('change sort by')}>
                                        <option>Most relevant</option>
                                        <option>Last updated</option>
                                    </Dropdown>
                                    <Inline space="none" align="right">
                                        <ButtonLink size="small" href="#" variant="soft" onClick={() => setGridColumns([1, 1, 3])}>
                                            <IconGrid />
                                        </ButtonLink>
                                        <ButtonLink size="small" href="#" variant="soft" onClick={() => setGridColumns([1, 1, 1])}>
                                            <IconList />
                                        </ButtonLink>
                                    </Inline>

                                </Inline>
                            </Tiles>

                            {/* Candidates Listing */}
                            <Tiles columns={gridColumns} space="small" >
                                {
                                    data.map((talent: any) => {
                                        const cardData = formatData(talent);

                                        return (
                                            <Card key={talent.candidate.id}>
                                                {/* <Box style={{ height: '200px' }} > */}
                                                <Stack space="gutter" >
                                                    <Columns space="gutter">
                                                        <Column>
                                                            <Stack space="small">
                                                                <Heading level="4">{cardData.primaryHeading}</Heading>
                                                                <Text tone="secondary">{cardData.primaryBody1}</Text>
                                                                <Text tone="secondary">{cardData.primaryBody2}</Text>
                                                            </Stack>
                                                        </Column>
                                                        <Column width="content">
                                                            <Box onClick={() => alert('Bookmark')} style={{ cursor: "pointer" }}><IconBookmark /></Box>

                                                            {/* <ButtonLink href="#" variant="transparent" onClick={() => alert('bookmark')}><IconBookmark /></ButtonLink> */}
                                                        </Column>
                                                    </Columns>
                                                    <Stack space="small">
                                                        <Text size="small" tone="secondary">{cardData.secondaryBody1}</Text>
                                                        <Text size="small" tone="secondary">{cardData.secondaryBody2}</Text>
                                                    </Stack>
                                                    <Inline space="small">
                                                        {
                                                            (talent.preference.expected_salary.formatted && <Text tone="secondary" size="small"><IconMoney />{talent.preference.expected_salary.formatted}</Text>)
                                                        }
                                                        {
                                                            (talent.highest_education.qualification && <Text tone="secondary" size="small"><IconEducation />{talent.highest_education.qualification}</Text>)
                                                        }

                                                    </Inline>
                                                </Stack>
                                                {/* </Box> */}
                                            </Card>
                                        )
                                    })
                                }
                            </Tiles>
                        </Stack>
                    </Column>
                </Columns>
            </Stack>
        </Fragment>
    );
};

export default Listing;