import React from "react"
import { Link } from "wouter"
import "styled-components/macro"
import { a } from "@react-spring/web"
import styled from "styled-components"

const Container = styled(a.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Jumbo = styled.div`
position: absolute;
  white-space: pre;
  margin-bottom: 25rem;
  font-size: 7em;
  font-weight: 800;
  letter-spacing: 0px;
  @media (max-width: 795px){
    font-size: 1.5em;
    top:180px;

  }
`

const NavRight = styled(a.div)`

  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
`

const Box = styled(a.div)`
  position: absolute;
  transform: translate3d(-50%, -42%, 0);
  will-change: opacity;
`

const Line = styled(a.div)`
  position: relative;
  width: 100%;
  will-change: transform;
  overflow: hidden;
  line-height: 1.2em;
`

const Cover = styled(a.div)`
  position: absolute;
  will-change: background, transform;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
`

function Nav(props) {
  return (
    <>
      <NavRight {...props}>
        <Link to="/">Trumpet</Link>
        <Link to="/Sax">Sax</Link>
        <Link to="/Bass">Bass</Link>
      </NavRight>
      
    </>
  )
}

export { Container, Jumbo, Nav, Box, Line, Cover }
