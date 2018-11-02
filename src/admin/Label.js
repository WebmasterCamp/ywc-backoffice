import React from "react";
import styled from "styled-components";
import {PropTypes} from "prop-types";

const Container = styled.div`
  width: 100%;
  padding: 7px;
  display: flex;

  & > div:nth-child(1) {
    width: 200px;
    padding: 3px 10px;
    margin-right: 20px;
    background: #fafafa;
    border-radius: 3px;
    font-weight: bold;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`;

const Label = ({children, title}) => {
  return (
    <Container>
      <div>{title}</div>
      <div>{children || "Undefined"}</div>
    </Container>
  );
};

Label.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Label;
