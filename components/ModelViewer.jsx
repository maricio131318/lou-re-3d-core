import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const FLOOR_Y = 0;
const LAYOUT_KEY = "lou-re-furniture-layout-v1";
const ROOM_ID = "demo-room-1"; // later you can make this dynamic per room/upload

export default function ModelViewer({ file }) {
  const containerRef = useRef(null);
  const furnitureHelpersRef = useRef({
    addSofa: null,
    addTable: null,
    addPlant: null,
    clearFurniture: null,
    saveCloud: null,
    loadCloud: null,
  });
  const furnitureGroupRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- basic sizes based on container, not whole window ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.6, 4); // ~human height

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const furnitureGroup = new THREE.Group();
    scene.add(furnitureGroup);
    furnitureGroupRef.current = furnitureGroup;

    let roomCenter = new THREE.Vector3(0, 0, 0);
    const ROTATION_STEP = Math.PI / 16;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -FLOOR_Y);
    let selectedFurniture = null;
    let isDragging = false;

    // -----------------------
    // Layout helpers
    // -----------------------
    function getCurrentLayout() {
      if (!furnitureGroupRef.current) return [];
      return furnitureGroupRef.current.children
        .map((child) => {
          const type = child.userData?.furnitureType;
          if (!type) return null;
          return {
            type,
            position: child.position.toArray(),
            rotation: [child.rotation.x, child.rotation.y, child.rotation.z],
          };
        })
        .filter(Boolean);
    }

    function saveFurnitureLayout() {
      if (
        typeof window === "undefined" ||
        !furnitureGroupRef.current ||
        !window.localStorage
      )
        return;
      const layout = getCurrentLayout();
      try {
        window.localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
      } catch (err) {
        console.warn("Failed to save layout", err);
      }
    }

    function createFurnitureMesh(type) {
      let mesh = null;
      if (type === "sofa") {
        const height = 0.7;
        mesh = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, height, 0.6),
          new THREE.MeshStandardMaterial({
            color: 0x6cb2ff,
            roughness: 0.4,
          })
        );
        mesh.userData.floorOffset = height / 2;
      } else if (type === "table") {
        const height = 0.4;
        mesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, height, 0.9),
          new THREE.MeshStandardMaterial({
            color: 0xffd37a,
            roughness: 0.3,
          })
        );
        mesh.userData.floorOffset = height / 2;
      } else if (type === "plant") {
        const potHeight = 0.35;
        const pot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.25, potHeight, 20),
          new THREE.MeshStandardMaterial({ color: 0xa66a3d })
        );
        pot.position.y = potHeight / 2;
        const leaves = new THREE.Mesh(
          new THREE.ConeGeometry(0.4, 0.8, 24),
          new THREE.MeshStandardMaterial({ color: 0x4ade80 })
        );
        leaves.position.y = potHeight + 0.4;
        mesh = new THREE.Group();
        mesh.add(pot);
        mesh.add(leaves);
        mesh.userData.floorOffset = FLOOR_Y;
      }
      if (mesh) {
        mesh.userData.furnitureType = type;
        const floorY = FLOOR_Y + (mesh.userData.floorOffset || 0);
        mesh.position.y = floorY;
        mesh.userData.floorY = floorY;
      }
      return mesh;
    }

    function getDefaultPosition(type) {
      if (type === "sofa") {
        return new THREE.Vector3(roomCenter.x - 0.6, FLOOR_Y, roomCenter.z);
      }
      if (type === "table") {
        return new THREE.Vector3(roomCenter.x + 0.4, FLOOR_Y, roomCenter.z);
      }
      if (type === "plant") {
        return new THREE.Vector3(roomCenter.x, FLOOR_Y, roomCenter.z + 0.7);
      }
      return roomCenter.clone();
    }

    function spawnFurniture(type, options = {}) {
      if (!furnitureGroupRef.current) return null;
      const mesh = createFurnitureMesh(type);
      if (!mesh) return null;

      const position = options.position
        ? new THREE.Vector3(...options.position)
        : getDefaultPosition(type);
      mesh.position.x = position.x;
      mesh.position.z = position.z;
      mesh.position.y =
        options.position?.[1] ??
        (mesh.userData.floorY ?? FLOOR_Y + (mesh.userData.floorOffset || 0));

      if (options.rotation) {
        mesh.rotation.set(
          options.rotation[0],
          options.rotation[1],
          options.rotation[2]
        );
      }

      furnitureGroupRef.current.add(mesh);
      return mesh;
    }

    function removeFurniture(mesh) {
      if (!mesh || !furnitureGroupRef.current) return;
      furnitureGroupRef.current.remove(mesh);
      mesh.traverse?.((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat?.dispose?.());
          } else {
            obj.material?.dispose?.();
          }
        }
      });
      mesh.geometry?.dispose?.();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => mat?.dispose?.());
      } else {
        mesh.material?.dispose?.();
      }
    }

    function clearFurniture() {
      if (!furnitureGroupRef.current) return;
      const group = furnitureGroupRef.current;
      while (group.children.length) {
        removeFurniture(group.children[0]);
      }
      saveFurnitureLayout();
    }

    function loadFurnitureLayout() {
      if (typeof window === "undefined" || !window.localStorage) return;
      try {
        const raw = window.localStorage.getItem(LAYOUT_KEY);
        if (!raw) return;
        const layout = JSON.parse(raw);
        layout.forEach((item) => {
          const mesh = spawnFurniture(item.type, {
            position: item.position,
            rotation: item.rotation,
          });
          if (mesh) {
            mesh.userData.floorY =
              item.position?.[1] ??
              (mesh.userData.floorY ||
                FLOOR_Y + (mesh.userData.floorOffset || 0));
          }
        });
      } catch (err) {
        console.warn("Failed to load layout", err);
      }
    }

    // -----------------------
    // Cloud save/load helpers
    // -----------------------
    async function saveLayoutToCloud() {
      try {
        const layout = getCurrentLayout();
        await fetch("/api/save-layout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room_id: ROOM_ID,
            layout,
          }),
        });
        // optional: also keep local copy in localStorage
        saveFurnitureLayout();
        alert("Layout saved to cloud ✅");
      } catch (err) {
        console.error("Failed to save layout to cloud", err);
        alert("Error saving layout to cloud");
      }
    }

    async function loadLayoutFromCloud() {
      try {
        const res = await fetch(
          `/api/load-layout?room_id=${encodeURIComponent(ROOM_ID)}`
        );
        if (!res.ok) {
          console.error("Cloud load failed", await res.text());
          alert("Error loading layout from cloud");
          return;
        }
        const data = await res.json();
        if (!data.layout) {
          alert("No saved layout found in cloud yet");
          return;
        }

        clearFurniture();
        data.layout.forEach((item) => {
          spawnFurniture(item.type, {
            position: item.position,
            rotation: item.rotation,
          });
        });

        saveFurnitureLayout(); // sync to local
        alert("Layout loaded from cloud ✅");
      } catch (err) {
        console.error("Failed to load layout from cloud", err);
        alert("Error loading layout from cloud");
      }
    }

    // expose helpers to React buttons
    furnitureHelpersRef.current = {
      addSofa: () => {
        const mesh = spawnFurniture("sofa");
        if (mesh) saveFurnitureLayout();
      },
      addTable: () => {
        const mesh = spawnFurniture("table");
        if (mesh) saveFurnitureLayout();
      },
      addPlant: () => {
        const mesh = spawnFurniture("plant");
        if (mesh) saveFurnitureLayout();
      },
      clearFurniture,
      saveCloud: saveLayoutToCloud,
      loadCloud: loadLayoutFromCloud,
    };

    // -----------------------
    // Controls & model loading
    // -----------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 1;
    controls.maxDistance = 50;

    const loader = new GLTFLoader();
    loader.load(
      file,
      (gltf) => {
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        roomCenter = center.clone();

        controls.target.copy(center);
        camera.position.set(
          center.x + size * 0.6,
          center.y + size * 0.3, // eye-ish height
          center.z + size * 0.6
        );
        camera.lookAt(center);

        // once the room is loaded, restore any saved furniture
        loadFurnitureLayout();
      },
      (xhr) => {
        if (xhr.total) {
          const percent = ((xhr.loaded / xhr.total) * 100).toFixed(1);
          console.log(`Loading model: ${percent}%`);
        }
      },
      (error) => {
        console.error("Failed to load GLB model:", error);
        // still try to load layout in case we want to handle fallback later
        loadFurnitureLayout();
      }
    );

    // -----------------------
    // Interaction handlers
    // -----------------------
    const handleResize = () => {
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    function updatePointer(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function findFurnitureRoot(object) {
      let current = object;
      while (current) {
        if (current.userData?.furnitureType) return current;
        current = current.parent;
      }
      return null;
    }

    const handlePointerDown = (event) => {
      if (!furnitureGroupRef.current) return;
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(
        furnitureGroupRef.current.children,
        true
      );
      if (intersects.length > 0) {
        const root = findFurnitureRoot(intersects[0].object);
        if (root) {
          selectedFurniture = root;
          isDragging = true;
          controls.enabled = false;
        } else {
          selectedFurniture = null;
          isDragging = false;
        }
      } else {
        selectedFurniture = null;
        isDragging = false;
      }
    };

    const handlePointerMove = (event) => {
      if (!isDragging || !selectedFurniture) return;
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const intersectionPoint = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
        selectedFurniture.position.x = intersectionPoint.x;
        selectedFurniture.position.z = intersectionPoint.z;
        const floorY = selectedFurniture.userData?.floorY;
        if (typeof floorY === "number") {
          selectedFurniture.position.y = floorY;
        }
      }
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      controls.enabled = true;
      if (selectedFurniture) {
        saveFurnitureLayout();
      }
    };

    const handlePointerUp = () => {
      endDrag();
    };

    const handlePointerLeave = () => {
      endDrag();
    };

    const handleKeyDown = (event) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selectedFurniture
      ) {
        removeFurniture(selectedFurniture);
        selectedFurniture = null;
        saveFurnitureLayout();
        return;
      }

      const rotateLeft =
        event.key === "q" ||
        event.key === "Q" ||
        event.key === "ArrowLeft";
      const rotateRight =
        event.key === "e" ||
        event.key === "E" ||
        event.key === "ArrowRight";

      if (selectedFurniture && (rotateLeft || rotateRight)) {
        const delta = rotateLeft ? -ROTATION_STEP : ROTATION_STEP;
        selectedFurniture.rotation.y += delta;
        saveFurnitureLayout();
        return;
      }

      if (
        (event.key === "l" || event.key === "L") &&
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey
      ) {
        const layout = getCurrentLayout();
        const json = JSON.stringify(layout, null, 2);
        console.log("[Lou-re] furniture layout:\n", json);
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(json).catch(() => {});
        }
        event.preventDefault();
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("keydown", handleKeyDown);

    let animationFrame;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
      controls.dispose();
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      clearFurniture();
      furnitureHelpersRef.current = {
        addSofa: null,
        addTable: null,
        addPlant: null,
        clearFurniture: null,
        saveCloud: null,
        loadCloud: null,
      };
      furnitureGroupRef.current = null;
    };
  }, [file]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#000",
          cursor: "grab",
        }}
      />
      <div
        className="louref-toolbar"
        style={{
          position: "absolute",
          right: "16px",
          top: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "12px",
          borderRadius: "12px",
          background: "rgba(10, 10, 10, 0.9)",
          color: "#fff",
          fontSize: "13px",
          maxWidth: "240px",
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "4px" }}>
          Furniture tools
        </div>
        <div style={{ opacity: 0.8, marginBottom: "8px" }}>
          Click to drop furniture. Click an item to select, drag to move, use
          Q/E or ←/→ to rotate, press Delete to remove, and press Ctrl/⌘ + Shift
          + L to copy layout JSON.
        </div>
        <button
          onClick={() => furnitureHelpersRef.current.addSofa?.()}
          style={toolbarButtonStyle}
        >
          + Add sofa (box)
        </button>
        <button
          onClick={() => furnitureHelpersRef.current.addTable?.()}
          style={toolbarButtonStyle}
        >
          + Add table (box)
        </button>
        <button
          onClick={() => furnitureHelpersRef.current.addPlant?.()}
          style={toolbarButtonStyle}
        >
          + Add plant (cylinder + cone)
        </button>

        <hr style={{ borderColor: "#333", margin: "6px 0" }} />

        <button
          onClick={() => furnitureHelpersRef.current.saveCloud?.()}
          style={toolbarButtonStyle}
        >
          💾 Save layout to cloud
        </button>
        <button
          onClick={() => furnitureHelpersRef.current.loadCloud?.()}
          style={toolbarButtonStyle}
        >
          ☁️ Load layout from cloud
        </button>

        <button
          onClick={() => furnitureHelpersRef.current.clearFurniture?.()}
          style={{
            ...toolbarButtonStyle,
            marginTop: "4px",
            border: "1px solid #555",
            background: "#220000",
            color: "#ffb3b3",
          }}
        >
          Clear all furniture
        </button>
      </div>
    </div>
  );
}

const toolbarButtonStyle = {
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  textAlign: "left",
};