import styled, { keyframes } from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.justifyEnd
      ? `flex-end`
      : props.justifyBetween
      ? `space-between`
      : props.justifyAround
      ? `space-around`
      : props.justifyCenter
      ? `center`
      : `flex-start`};
  align-items: ${props =>
    props.alignEnd ? `flex-end` : props.alignCenter ? `center` : `flex-start`};
  flex-wrap: ${props =>
    props.wrap ? `wrap` : props.wrapReverse ? `wrap-reverse` : `nowrap`};
  padding: ${props => (props.padding ? props.padding + "px" : "0")};
  width: ${props =>
    props.width ? (props.width === "full" ? "100%" : props.width) : "auto"};
  max-width: ${props => props.maxWidth};
  height: ${props =>
    props.height ? (props.height === "full" ? "100%" : props.height) : "auto"};
  margin-right: ${props =>
    ((g = props.spaceRight) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-left: ${props =>
    ((g = props.spaceLeft) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-bottom: ${props =>
    ((g = props.spaceBottom) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-top: ${props =>
    ((g = props.spaceTop) => (g ? (g === true ? "10px" : g) : "0"))()};
  max-width: 100%;
  flex-grow: ${props =>
    ((g = props.grow) => (g ? (parseFloat(g) > -1 ? g : "1") : "0"))()};
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.justifyEnd
      ? `flex-end`
      : props.justifyBetween
      ? `space-between`
      : props.justifyAround
      ? `space-around`
      : props.justifyCenter
      ? `center`
      : `flex-start`};
  align-items: ${props =>
    props.alignEnd ? `flex-end` : props.alignCenter ? `center` : `flex-start`};
  flex-wrap: ${props =>
    props.wrap ? `wrap` : props.wrapReverse ? `wrap-reverse` : `nowrap`};
  padding: ${props => (props.padding ? props.padding + "px" : "0")};
  width: ${props =>
    props.width ? (props.width === "full" ? "100%" : props.width) : "auto"};
  max-width: ${props => props.maxWidth};
  height: ${props =>
    props.height ? (props.height === "full" ? "100%" : props.height) : "auto"};
  max-width: 100%;
  margin-right: ${props =>
    ((g = props.spaceRight) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-left: ${props =>
    ((g = props.spaceLeft) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-bottom: ${props =>
    ((g = props.spaceBottom) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-top: ${props =>
    ((g = props.spaceTop) => (g ? (g === true ? "10px" : g) : "0"))()};
  flex-grow: ${props =>
    ((g = props.grow) => (g ? (parseFloat(g) > -1 ? g : "1") : "0"))()};
`;

export const Container = styled(FlexColumn)`
  width: 100vw;
  min-height: 100vh;
  padding: ${props => (props.padding ? "40px" : "0")};
  box-sizing: border-box;
`;

export const Text = styled.span`
  font-weight: ${props => (props.bold ? "bold" : props.weight || "normal")};
  font-size: ${props => props.size || "1rem"};
  color: ${props => props.color || "#333"};
  margin: ${props => (props.spaceAround ? "10px" : 0)}
  margin-right: ${props =>
    ((g = props.spaceLeft) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-left: ${props =>
    ((g = props.spaceRight) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-bottom: ${props =>
    ((g = props.spaceBottom) => (g ? (g === true ? "10px" : g) : "0"))()};
  margin-top: ${props =>
    ((g = props.spaceTop) => (g ? (g === true ? "10px" : g) : "0"))()};
`;

export const Divider = styled.div`
  height: 1px;
  width: ${props => (props.width ? props.width : "100%")};
  background: ${props => (props.color ? props.color : "#e6e6e6")};
  margin: ${props => (props.margin ? props.margin : "10px 0")};
`;

export const keyFramesBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export const BouncingArrow = styled.div`
  text-align: center;
  margin: 8% 0;

  animation: ${keyFramesBounce};
  -moz-animation: bounce 2s infinite;
  -webkit-animation: bounce 2s infinite;
  animation: bounce 2s infinite;
`;

export const Scrollbar = styled.div`
-webkit-overflow-scrolling: auto
::-webkit-scrollbar {
  width: 12px !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3) !important;
  -webkit-border-radius: 10px !important;
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px !important;
  border-radius: 10px !important;
  background: #41617D !important; 
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5) !important; 

}
::-webkit-scrollbar-thumb:window-inactive {
  background: #41617D !important; 
}
`;
