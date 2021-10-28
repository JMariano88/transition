import './App.css';
import * as THREE from "three"
import React, { Suspense, useMemo, useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Environment, Loader, useTexture, useGLTF, Shadow } from "@react-three/drei"
import { useTransition, useSpring } from "@react-spring/core"
import { a } from "@react-spring/three"
import { useLocation, Switch, Route } from "wouter"
import { Container, Jumbo, Nav, Box, Line, Cover } from "./Styles"
import Shape from './Shape';

const jumbo = {
  "/": ["Trumpet", "means the power."],
  "/Sax": ["Saxophone", "means the passion."],
  "/Bass": ["Trombone", "all carried it", "for the perfect jazz."],
}

function Trombone({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/trombone.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.BezierCurve_BezierCurve001.geometry}
        material={nodes.BezierCurve_BezierCurve001.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder001_Cylinder003.geometry}
        material={nodes.Cylinder001_Cylinder003.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder_Cylinder004.geometry}
        material={nodes.Cylinder_Cylinder004.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder002_Cylinder007.geometry}
        material={nodes.Cylinder002_Cylinder007.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder003_Cylinder008.geometry}
        material={nodes.Cylinder003_Cylinder008.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder004_Cylinder009.geometry}
        material={nodes.Cylinder004_Cylinder009.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder005_Cylinder010.geometry}
        material={nodes.Cylinder005_Cylinder010.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder006_Cylinder.geometry}
        material={nodes.Cylinder006_Cylinder.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.BezierCurve001_BezierCurve.geometry}
        material={nodes.BezierCurve001_BezierCurve.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.BezierCurve002.geometry}
        material={nodes.BezierCurve002.material}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

function ShapeTrombone({ geometry, material, args, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {
  const { viewport } = useThree()
  const ref = useRef()
  const { mouse, clock } = useThree()
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
  useFrame(() => {
    if (ref.current) {
      rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
      ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
    }
  })
  return (
    <group {...props}>
      <a.mesh
        ref={ref}>
      <Trombone scale={25} rotation={[2, 0, 2]} position={[-3, -2, 0]} />
      <Shadow opacity={0.2} scale={shadowScale} position={[0, -8.5, 0]} />  
        
      </a.mesh>
    </group>
  )
}

function Sax({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('sax.glb')
  
  return (
    <group ref={group} {...props}>
      <mesh
      position={[9,-10,-12]}
        geometry={nodes.Saxophone.geometry}
        material={materials.lambert1}
        rotation={[0, -1.1, 0]}
        scale={0.2}
      />
    </group>
  )
}

function ShapeSax({ geometry, material, args, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {
  const { viewport } = useThree()
  const ref = useRef()
  const { mouse, clock } = useThree()
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
  useFrame(() => {
    if (ref.current) {
      rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
      ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
    }
  })
  return (
    <group {...props}>
      <a.mesh
        ref={ref}>
      <Sax />
      <Shadow opacity={0.2} scale={shadowScale} position={[0, -8.5, 0]} />  
        
      </a.mesh>
    </group>
  )
}

function Shapes({ transition }) {
  const { viewport } = useThree()
  return transition(({ opacity, ...props }, location) => (
    <a.group {...props}>
      <Switch location={location}>
        <Route path="/">
          <Shape 
          scale={(viewport.width / 28)}/>
           
        </Route>
        <Route path="/Sax">
        <ShapeSax
        scale={(viewport.width / 28)}/>
        </Route>
        <Route path="/bass">
        <ShapeTrombone scale={(viewport.width / 28)}/>
        </Route>
      </Switch>
    </a.group>
  ))
}

function Text({ children, opacity, background }) {
  return (
    <Box style={{ opacity }}>
      {React.Children.toArray(children).map((text, index) => (
        <Line key={index} style={{ transform: opacity.to((t) => `translate3d(0,${index * -50 + (1 - t) * ((1 + index) * 40)}px,0)`) }}>
          <div>{text}</div>
          <Cover style={{ background, transform: opacity.to((t) => `translate3d(0,${t * 120}%,0) rotateZ(-10deg)`) }} />
        </Line>
      ))}
    </Box>
  )
}

function App() {
  // Current route
  const [location] = useLocation()
  // Animated background color
  const props = useSpring({
    background: location === "/" ? "#ffcc6d" : location === "/Sax" ? "red" : "#ffcc6d",
    color: location === "/" ? "white" : location === "/Sax" ? "white" : "white",
  })
  // Animated shape props
  const transition = useTransition(location, {
    from: { position: [0, 0, -20], rotation: [0, Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    enter: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
    leave: { position: [0, 0, -10], rotation: [0, -Math.PI, 0], scale: [0, 0, 0], opacity: 0 },
    config: () => (n) => n === "opacity" && { friction: 60 },
  })
  return (
    <>
    <Loader/>
      <Container style={{ ...props }}>
      <Jumbo>
          {transition((style, location) => (
            <Text open={true} t={style.t} opacity={style.opacity} background={props.background} children={jumbo[location]} />
          ))}
        </Jumbo>
      </Container>
      <Canvas concurrent camera={{ position: [0, 0, 20], fov: 50 }} onCreated={({ gl }) => (gl.toneMappingExposure = 1.5)}>
        <spotLight position={[0, 30, 40]} />
        <spotLight position={[-50, 30, 40]} />
        <Suspense fallback={null}>
          <Shapes transition={transition} />
        </Suspense>
      </Canvas>
      <Nav style={{ color: props.color }} />
      <Loader/>
      
    </>
  )
}

export default App;
