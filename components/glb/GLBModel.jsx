import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

export default function GLBModel({ url }){
  const gltf = useGLTF(url, true)
  const scene = useMemo(() => {
    const s = gltf.scene.clone()
    s.traverse(o => { if (o.isMesh){ o.castShadow = o.receiveShadow = true } })
    return s
  }, [gltf])
  return <primitive object={scene} />
}
