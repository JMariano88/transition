import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'

function Trumpet({ ...props }) {
    const group = useRef()
    const { nodes  } = useGLTF('/trumpet.glb')
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes['0A698B926E6442D098A259590Ba032D6'].geometry}
          material={nodes['0A698B926E6442D098A259590Ba032D6'].material}
          position={[-7, 0, 0]}
          rotation={[1.55, 0, 1.55]}
          scale={0.4}
        />
      </group>
    )
  }

export default Trumpet
