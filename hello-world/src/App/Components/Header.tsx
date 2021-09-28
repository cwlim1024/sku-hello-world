import 'braid-design-system/reset';
import { Text, Stack, Card, Tiles, Inline, IconHome, ButtonLink, MenuRenderer, Box, IconChevron, MenuItemLink, TextLink } from 'braid-design-system';
import React, { Fragment } from 'react';

const Header = (properties: any) => {

    return (
        <Fragment>
            <Stack space="large">
                <Card>
                    <Tiles columns={3} space="medium" dividers="regular">
                        <Text>Jobstreet.com logo here</Text>
                        <Inline space="medium" alignY="center" align="left">
                            <Box onClick={() => alert('home')} style={{ cursor: "pointer" }}><IconHome /></Box>
                            {/* <ButtonLink href="#" variant="transparent" onClick={() => alert('Home')}><IconHome /></ButtonLink> */}
                            <ButtonLink href="#" variant="transparent" onClick={() => alert('Job Ads')}>Job Ads</ButtonLink>
                            <ButtonLink href="#" variant="transparent" onClick={() => alert('Talent Search')}>Talent Search</ButtonLink>
                            <ButtonLink href="#" variant="transparent" onClick={() => alert('Purchase Credits')}>Purchase Credits</ButtonLink>
                        </Inline>

                        {/* Menu */}
                        <Stack space="none" align="right">
                            <MenuRenderer align="right"
                                offsetSpace="small"
                                trigger={(triggerProps, { open }) => (
                                    <Box userSelect="none" cursor="pointer" {...triggerProps}>
                                        <Inline space="small">
                                            <Stack space="xsmall" align="right">
                                                <Text weight="strong">John Doe</Text>
                                                <Text tone="secondary">Jobstreet.com</Text>
                                            </Stack>

                                            <IconChevron direction={open ? "up" : "down"} />
                                        </Inline>
                                    </Box>
                                )}
                            >
                                {/* <MenuItem onClick={() => { }}>Button</MenuItem> */}
                                <MenuItemLink href="#">My Profile</MenuItemLink>
                                <MenuItemLink href="#">All Users</MenuItemLink>
                                <MenuItemLink href="#">Company Profile</MenuItemLink>
                                <MenuItemLink href="#">Orders/Credits</MenuItemLink>
                                <MenuItemLink href="#">Subsidiary Companies</MenuItemLink>
                                <MenuItemLink href="#">Logout</MenuItemLink>
                            </MenuRenderer>
                        </Stack>
                    </Tiles>
                </Card>
            </Stack>
        </Fragment>
    )
}
export default Header;