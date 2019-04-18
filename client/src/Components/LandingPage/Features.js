import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
} from 'semantic-ui-react';
import {FlexRow, FlexColumn} from '../../custom-components/index';
import {aroundTheWorld as WorldLogo} from './svgs/around_the_world_undraw';
import {apartment as Apartment} from './svgs/apartment_undraw';

export const Features = ({mobile}) => (
    <Container >

        <Grid style={{paddingTop: mobile ? '1em' : '3em'}}>

            <Grid.Column width={6}>
            <WorldLogo style={{minWidth: '250px'}} />
            </Grid.Column>

            <Grid.Column width={10} style={{display: 'flex', alignItems: 'center'}}>
            <p style={{color: 'black'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget aliquam lectus, quis posuere justo. Proin aliquet nisi et dui blandit aliquet. Sed metus tellus, efficitur sed consequat non, imperdiet eget mi. Fusce gravida, lectus vitae imperdiet pulvinar, lectus elit lacinia mi, quis pellentesque leo erat sed sapien. Nunc malesuada mi eu mauris dignissim imperdiet non vel velit. In magna sem, blandit ac dignissim at, varius non turpis.</p>
            </Grid.Column>

        </Grid>

        <Grid style={{paddingTop: mobile ? '1em' : '3em', paddingBottom: mobile ? '1em' : '3em'}}>

            <Grid.Column width={10} style={{display: 'flex', alignItems: 'center'}}>
            <p style={{color: 'black'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget aliquam lectus, quis posuere justo. Proin aliquet nisi et dui blandit aliquet. Sed metus tellus, efficitur sed consequat non, imperdiet eget mi. Fusce gravida, lectus vitae imperdiet pulvinar, lectus elit lacinia mi, quis pellentesque leo erat sed sapien. Nunc malesuada mi eu mauris dignissim imperdiet non vel velit. In magna sem, blandit ac dignissim at, varius non turpis.</p>
            </Grid.Column>

            <Grid.Column width={6}>
            <Apartment style={{minWidth: '250px'}} />
            </Grid.Column>

        </Grid>

    </Container>
)

Features.propTypes = {
    mobile: PropTypes.bool
}