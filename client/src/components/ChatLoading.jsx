import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

function ChatLoading() {
  return (
    <>
      <Box display="flex" padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle />
        <SkeletonText
          m="14px 5"
          w="85%"
          ml="2"
          noOfLines={2}
          skeletonHeight="2"
        />
      </Box>
      <Box display="flex" padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle />
        <SkeletonText
          m="14px 5"
          w="85%"
          ml="2"
          noOfLines={2}
          skeletonHeight="2"
        />
      </Box>
      <Box display="flex" padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle />
        <SkeletonText
          m="14px 5"
          w="85%"
          ml="2"
          noOfLines={2}
          skeletonHeight="2"
        />
      </Box>
      <Box display="flex" padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle />
        <SkeletonText
          m="14px 5"
          w="85%"
          ml="2"
          noOfLines={2}
          skeletonHeight="2"
        />
      </Box>
      <Box display="flex" padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle />
        <SkeletonText
          m="14px 5"
          w="85%"
          ml="2"
          noOfLines={2}
          skeletonHeight="2"
        />
      </Box>
    </>
  );
}

export default ChatLoading;
