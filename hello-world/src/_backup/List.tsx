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
    Box,
} from 'braid-design-system';
import React, { Fragment } from 'react';

const Listing = (props: any) => {
    const { data } = props;
    if (!data || data.length === 0) {
        return (
            <Fragment>
                <Stack space="none" align="center">
                    <h2>Start your search now</h2>
                    <IconSearch />
                    {/* <Heading component="div" level="1" align="center">
                        Start your search now
                        <IconSearch />
                    </Heading> */}
                </Stack>
            </Fragment>
        )
    };
    return (
        <Fragment>
            <Heading level="3" weight="weak"><Strong>1234567890</Strong> resumes match your search</Heading>
            <br></br>
            <Tiles columns={3} space="small">
                {
                    data.map((talent: any) => {
                        const cardData: any = {};
                        const isRetrieved = talent.candidate.formatted_name !== '';
                        if (isRetrieved) {
                            cardData.primaryHeading = talent.candidate.formatted_name;
                            const experience = talent.current.position_title !== '' ? 'current' : 'previous';
                            if (talent[experience].position_title !== '') {
                                // temp set to join_date. Need to calculate duration
                                cardData.primaryBody1 = `${talent[experience].position_title} (${talent[experience].join_date.date})`;
                                cardData.primaryBody2 = talent[experience].company_name;

                                if (talent.highest_education.field_of_study !== '') {
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
                            const experience = talent.current.position_title !== '' ? 'current' : 'previous';
                            if (talent[experience].position_title !== '') {
                                // temp set to join_date. Need to calculate duration
                                cardData.primaryHeading = `${talent[experience].position_title} (${talent[experience].join_date.date})`;
                                cardData.primaryBody1 = talent[experience].company_name;
                                cardData.primaryBody2 = '';

                                cardData.secondaryBody1 = talent.highest_education.field_of_study;
                                cardData.secondaryBody2 = talent.highest_education.college;

                            } else if (talent.highest_education.field_of_study !== '') {
                                cardData.primaryBody1 = talent.highest_education.field_of_study;
                                cardData.primaryBody2 = talent.highest_education.college;

                                cardData.secondaryBody1 = talent.preference.specialization;
                            } else {
                                cardData.primaryBody1 = talent.preference.specialization;
                            }
                        }

                        return (
                            <Card key={talent.candidate.id}>
                                <Stack space="gutter">
                                    <Columns space="gutter">
                                        <Column>
                                            <Stack space="small">
                                                <Heading level="3">{cardData.primaryHeading}</Heading>
                                                <Text tone="secondary">{cardData.primaryBody1}</Text>
                                                <Text tone="secondary">{cardData.primaryBody2}</Text>
                                            </Stack>
                                        </Column>
                                        <Column width="content">
                                            <IconBookmark />
                                        </Column>
                                    </Columns>
                                    <Stack space="small">
                                        <Text size="small" tone="secondary">{cardData.secondaryBody1}</Text>
                                        <Text size="small" tone="secondary">{cardData.secondaryBody2}</Text>
                                    </Stack>
                                    <Inline space="small">
                                        <Text tone="secondary" size="small"><IconMoney />{talent.preference.expected_salary.formatted}</Text>
                                        <Text tone="secondary" size="small"><IconEducation />{talent.highest_education.qualification}</Text>
                                    </Inline>
                                </Stack>
                            </Card>
                        )
                    })
                }
            </Tiles>
        </Fragment>
    );
};
export default Listing;