import React from 'react';
import Box from '../box';
import './Floaty.css';

const Floaty = ({children}) => {
  return (
    <Box
      display="flex"
      marginTop={50}
      backgroundColor="#2d2d2d"
      width="20%"
      padding={20}
      paddingBottom={70}
      softEdges
      borderSize={2}
      borderColor="purple"
      styleName="floaty"
    >
      {children}
    </Box>
  )
}

export default Floaty;
