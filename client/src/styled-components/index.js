import styled from 'styled-components';

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justifyEnd ? `flex-end` : props.justifyBetween ? `space-between` : props.justifyAround ? `space-around` : props.justifyCenter ? `center` : `flex-start`};
    align-items: ${props => props.alignEnd ? `flex-end` : props.alignCenter ? `center` : `flex-start`};
    flex-wrap: ${props => props.wrap ? `wrap` : props.wrapReverse ? `wrap-reverse` : `nowrap`};
    padding:${props => props.padding ? props.padding + "px" : "0"};
    width: ${props => props.width ? props.width === "full" ? "100%" : props.width : "auto"};
    max-width: ${props => props.maxWidth};
    height: ${props => props.height ? props.height === "full" ? "100%" : props.height : "auto"};
    margin-top: ${props => props.marginTop && typeof parseInt(props.marginTop) === 'number' ? parseInt(props.marginTop) + "px" : props.marginTop ? "10px" : "0"};
    margin-bottom :${props => props.marginBottom && typeof parseInt(props.marginBottom) === 'number' ? parseInt(props.marginBottom) + "px" : props.marginBottom ? "10px" : "0"};
    max-width: 100%;
    flex-grow: ${props => ((g = props.grow) => g ? parseFloat(g) > -1 ? g : "1" : "0")()}
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyEnd ? `flex-end` : props.justifyBetween ? `space-between` : props.justifyAround ? `space-around` : props.justifyCenter ? `center` : `flex-start`};
    align-items: ${props => props.alignEnd ? `flex-end` : props.alignCenter ? `center` : `flex-start`};
    flex-wrap: ${props => props.wrap ? `wrap` : props.wrapReverse ? `wrap-reverse` : `nowrap`};
    padding:${props => props.padding ? props.padding + "px" : "0"};
    width: ${props => props.width ? props.width === "full" ? "100%" : props.width : "auto"};
    max-width: ${props => props.maxWidth};
    height: ${props => props.height ? props.height === "full" ? "100%" : props.height : "auto"};
    margin-top: ${props => props.marginTop && typeof parseInt(props.marginTop) === 'number' ? parseInt(props.marginTop) + "px" : props.marginTop ? "10px" : "0"};
    margin-bottom :${props => props.marginBottom && typeof parseInt(props.marginBottom) === 'number' ? parseInt(props.marginBottom) + "px" : props.marginBottom ? "10px" : "0"};
    max-width: 100%;
    flex-grow: ${props => ((g = props.grow) => g ? parseFloat(g) > -1 ? g : "1" : "0")()}
`;

export const Container = styled(FlexColumn)`
  width: 100vw;
  height: 100vh;
  padding:${props => props.padding ? "40px" : "0"};
  box-sizing: border-box;
`;