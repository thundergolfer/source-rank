import React from 'react';
import { string, oneOf, number, oneOfType, node, bool } from 'prop-types';

const colours = {
  white: '#FFF',
  black: '#FFF',
  purple: '#4c35c9',
};

const Box = ({
  width,
  height,
  display,
  flex,
  justifyContent,
  alignItems,
  margin,
  marginX,
  marginY,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  padding,
  paddingX,
  paddingY,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  children,
  backgroundColor,
  softEdges,
  borderSize,
  borderColor,
  borderStyle = 'solid',
  ...restProps
}) => {
  const styles = {
    width,
    height,
    display,
    flex,
    justifyContent,
    alignItems,
    margin,
    marginX,
    marginY,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    paddingX,
    paddingY,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    padding,
    backgroundColor,
    ...borderSize && {
      borderSize,
      borderStyle,
      borderColor: colours[borderColor],
    },
    ...softEdges && {
      borderRadius: 10,
    },
  };

  return (
    <div
      {...restProps}
      style={styles}
    >
      {children}
    </div>
  );
};

Box.propTypes = {
  width: oneOfType(
    [number, string]
  ),
  height: oneOfType(
    [number, string]
  ),
  display: oneOf(
    ['block', 'none', 'flex']
  ),
  flex: string,
  justifyContent: oneOf(
    ['space-between', 'space-around', 'center', 'flex-start', 'flex-end']
  ),
  alignItems: oneOf(
    ['space-between', 'space-around', 'center', 'flex-start', 'flex-end']
  ),
  flexDirection: oneOf(
    ['row', 'column', 'row-reverse', 'column-reverse']
  ),
  margin: oneOfType(
    [number, string]
  ),
  marginX: oneOfType(
    [number, string]
  ),
  marginY: oneOfType(
    [number, string]
  ),
  marginLeft: oneOfType(
    [number, string]
  ),
  marginRight: oneOfType(
    [number, string]
  ),
  marginTop: oneOfType(
    [number, string]
  ),
  marginBottom: oneOfType(
    [number, string]
  ),
  padding: oneOfType(
    [number, string]
  ),
  paddingX: oneOfType(
    [number, string]
  ),
  paddingY: oneOfType(
    [number, string]
  ),
  paddingLeft: oneOfType(
    [number, string]
  ),
  paddingRight: oneOfType(
    [number, string]
  ),
  paddingTop: oneOfType(
    [number, string]
  ),
  paddingBottom: oneOfType(
    [number, string]
  ),
  children: node,
  backgroundColor: string,
  softEdges: bool,
  borderSize: number,
  borderColor: string,
  borderStyle: string,
};

export default Box;
