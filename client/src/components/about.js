import styled from 'styled-components';

export const About = () => {

  return (
    <AboutDiv>
      <h1>
        mello
      </h1>

      <h3>
        A Kanban-style application designed to boost productivity.
      </h3>
    </AboutDiv>
  )
};

const AboutDiv = styled.div`
  width: 100%;
  margin: 1em auto;
  text-align: center;
`