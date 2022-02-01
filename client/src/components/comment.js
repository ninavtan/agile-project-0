import React from 'react';
import styled from 'styled-components';

const Comment = (props) => {
  return (
    <>
      {props.comments.length > 0 ? <CommentStyle> This card has comments </CommentStyle> : ''}

    </>
        // <CommentStyle>
        //   {props.comments.length > 0 ? 'This is a comment' : 'No comments for this card yet'}
        // </CommentStyle>
  );
}

export default Comment;

const CommentStyle = styled.div`
margin: auto;
border: 1px solid lightgrey;
border-radius: 5px;
min-height: 80px;
padding: 8px;
margin-bottom: 8px;
font-family: sans-serif;
color: purple;
background-color: white;
&:hover {
  transition: background-color 0.2s ease;
  background-color: #f6f6f6;
  cursor:pointer;
}
transition: filter 0.2s ease;
filter: ${props => (props.isDragging ? 'drop-shadow(2px 2px 8px darkgrey)' : 'none')};
background-color: ${props => (props.isDragging ? '#f6f6f6' : 'none')};

-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;