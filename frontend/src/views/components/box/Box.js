import React from 'react';
import { string, oneOf, number, oneOfType, node, bool, any } from 'prop-types';

const colours = {
  white: '#FFF',
  black: '#FFF',
  purple: '#4c35c9',
};

const Box = ({
  width,
  height,
  display,
  flexGrow,
  flexBasis,
  flexShrink,
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
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  position,
  top,
  left,
  right,
  bottom,
  ...restProps
}) => {
  const styles = {
    width,
    height,
    display,
    flexBasis,
    flexGrow,
    flexShrink,
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
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    position,
    top,
    left,
    right,
    bottom,
    ...borderSize && {
      borderSize,
      borderStyle,
      borderColor: colours[borderColor] || borderColor,
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
  flexBasis: any,
  flexShrink: any,
  flexGrow: any,
  minHeight: oneOfType(
    [number, string]
  ),
  minWidth: oneOfType(
    [number, string]
  ),
  maxHeight: oneOfType(
    [number, string]
  ),
  maxWidth: oneOfType(
    [number, string]
  ),
  position: oneOf(
    ['absolute', 'fixed', 'relative', 'static', 'none']
  ),
  top: oneOfType(
    [number, string]
  ),
  left: oneOfType(
    [number, string]
  ),
  right: oneOfType(
    [number, string]
  ),
  bottom: oneOfType(
    [number, string]
  ),
};

export default Box;
