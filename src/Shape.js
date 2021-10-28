import { Shadow } from '@react-three/drei'
import { a } from "@react-spring/three"
import { useFrame, useThree } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import Trumpet from './Trumpet'
import * as THREE from "three"

function Shape({ geometry, material, args, textures, opacity, color, shadowScale = [9, 1.5, 1], ...props }) {
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
        <Trumpet />
        <Shadow opacity={0.2} scale={shadowScale} position={[0, -8.5, 0]} />  
          
        </a.mesh>
      </group>
    )
  }

export default Shape
