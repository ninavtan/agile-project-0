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

      <h4>Created by student engineers of Parsity Code School.</h4>

      <h4><a target="_blank" href="https://github.com/ninavtan/agile-project-0" rel="noreferrer">Github</a></h4>
    </AboutDiv>
  )
};

const AboutDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 1em;
`