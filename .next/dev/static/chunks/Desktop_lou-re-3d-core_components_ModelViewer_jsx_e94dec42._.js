(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModelViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/node_modules/three/build/three.module.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/node_modules/three/examples/jsm/loaders/GLTFLoader.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/node_modules/three/examples/jsm/controls/OrbitControls.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const FLOOR_Y = 0;
const LAYOUT_KEY = "lou-re-furniture-layout-v1";
const ROOM_ID = "demo-room-1"; // later you can make this dynamic per room/upload
function ModelViewer({ file }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const furnitureHelpersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        addSofa: null,
        addTable: null,
        addPlant: null,
        clearFurniture: null,
        saveCloud: null,
        loadCloud: null
    });
    const furnitureGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModelViewer.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return;
            // --- basic sizes based on container, not whole window ---
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Scene"]();
            scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"](0x111111);
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](50, width / height, 0.1, 1000);
            camera.position.set(0, 1.6, 4); // ~human height
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WebGLRenderer"]({
                antialias: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);
            const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 1.2);
            scene.add(ambientLight);
            const directionalLight = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 3);
            directionalLight.position.set(5, 10, 7);
            scene.add(directionalLight);
            const furnitureGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Group"]();
            scene.add(furnitureGroup);
            furnitureGroupRef.current = furnitureGroup;
            let roomCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
            const ROTATION_STEP = Math.PI / 16;
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            const pointer = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const dragPlane = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Plane"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), -FLOOR_Y);
            let selectedFurniture = null;
            let isDragging = false;
            // -----------------------
            // Layout helpers
            // -----------------------
            function getCurrentLayout() {
                if (!furnitureGroupRef.current) return [];
                return furnitureGroupRef.current.children.map({
                    "ModelViewer.useEffect.getCurrentLayout": (child)=>{
                        const type = child.userData?.furnitureType;
                        if (!type) return null;
                        return {
                            type,
                            position: child.position.toArray(),
                            rotation: [
                                child.rotation.x,
                                child.rotation.y,
                                child.rotation.z
                            ]
                        };
                    }
                }["ModelViewer.useEffect.getCurrentLayout"]).filter(Boolean);
            }
            function saveFurnitureLayout() {
                if (("TURBOPACK compile-time value", "object") === "undefined" || !furnitureGroupRef.current || !window.localStorage) return;
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
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1.5, height, 0.6), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        color: 0x6cb2ff,
                        roughness: 0.4
                    }));
                    mesh.userData.floorOffset = height / 2;
                } else if (type === "table") {
                    const height = 0.4;
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.9, height, 0.9), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        color: 0xffd37a,
                        roughness: 0.3
                    }));
                    mesh.userData.floorOffset = height / 2;
                } else if (type === "plant") {
                    const potHeight = 0.35;
                    const pot = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0.25, potHeight, 20), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        color: 0xa66a3d
                    }));
                    pot.position.y = potHeight / 2;
                    const leaves = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ConeGeometry"](0.4, 0.8, 24), new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        color: 0x4ade80
                    }));
                    leaves.position.y = potHeight + 0.4;
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Group"]();
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
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](roomCenter.x - 0.6, FLOOR_Y, roomCenter.z);
                }
                if (type === "table") {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](roomCenter.x + 0.4, FLOOR_Y, roomCenter.z);
                }
                if (type === "plant") {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](roomCenter.x, FLOOR_Y, roomCenter.z + 0.7);
                }
                return roomCenter.clone();
            }
            function spawnFurniture(type, options = {}) {
                if (!furnitureGroupRef.current) return null;
                const mesh = createFurnitureMesh(type);
                if (!mesh) return null;
                const position = options.position ? new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"](...options.position) : getDefaultPosition(type);
                mesh.position.x = position.x;
                mesh.position.z = position.z;
                mesh.position.y = options.position?.[1] ?? mesh.userData.floorY ?? FLOOR_Y + (mesh.userData.floorOffset || 0);
                if (options.rotation) {
                    mesh.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
                }
                furnitureGroupRef.current.add(mesh);
                return mesh;
            }
            function removeFurniture(mesh) {
                if (!mesh || !furnitureGroupRef.current) return;
                furnitureGroupRef.current.remove(mesh);
                mesh.traverse?.({
                    "ModelViewer.useEffect.removeFurniture": (obj)=>{
                        if (obj.isMesh) {
                            obj.geometry?.dispose?.();
                            if (Array.isArray(obj.material)) {
                                obj.material.forEach({
                                    "ModelViewer.useEffect.removeFurniture": (mat)=>mat?.dispose?.()
                                }["ModelViewer.useEffect.removeFurniture"]);
                            } else {
                                obj.material?.dispose?.();
                            }
                        }
                    }
                }["ModelViewer.useEffect.removeFurniture"]);
                mesh.geometry?.dispose?.();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach({
                        "ModelViewer.useEffect.removeFurniture": (mat)=>mat?.dispose?.()
                    }["ModelViewer.useEffect.removeFurniture"]);
                } else {
                    mesh.material?.dispose?.();
                }
            }
            function clearFurniture() {
                if (!furnitureGroupRef.current) return;
                const group = furnitureGroupRef.current;
                while(group.children.length){
                    removeFurniture(group.children[0]);
                }
                saveFurnitureLayout();
            }
            function loadFurnitureLayout() {
                if (("TURBOPACK compile-time value", "object") === "undefined" || !window.localStorage) return;
                try {
                    const raw = window.localStorage.getItem(LAYOUT_KEY);
                    if (!raw) return;
                    const layout = JSON.parse(raw);
                    layout.forEach({
                        "ModelViewer.useEffect.loadFurnitureLayout": (item)=>{
                            const mesh = spawnFurniture(item.type, {
                                position: item.position,
                                rotation: item.rotation
                            });
                            if (mesh) {
                                mesh.userData.floorY = item.position?.[1] ?? (mesh.userData.floorY || FLOOR_Y + (mesh.userData.floorOffset || 0));
                            }
                        }
                    }["ModelViewer.useEffect.loadFurnitureLayout"]);
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
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            room_id: ROOM_ID,
                            layout
                        })
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
                    const res = await fetch(`/api/load-layout?room_id=${encodeURIComponent(ROOM_ID)}`);
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
                    data.layout.forEach({
                        "ModelViewer.useEffect.loadLayoutFromCloud": (item)=>{
                            spawnFurniture(item.type, {
                                position: item.position,
                                rotation: item.rotation
                            });
                        }
                    }["ModelViewer.useEffect.loadLayoutFromCloud"]);
                    saveFurnitureLayout(); // sync to local
                    alert("Layout loaded from cloud ✅");
                } catch (err) {
                    console.error("Failed to load layout from cloud", err);
                    alert("Error loading layout from cloud");
                }
            }
            // expose helpers to React buttons
            furnitureHelpersRef.current = {
                addSofa: ({
                    "ModelViewer.useEffect": ()=>{
                        const mesh = spawnFurniture("sofa");
                        if (mesh) saveFurnitureLayout();
                    }
                })["ModelViewer.useEffect"],
                addTable: ({
                    "ModelViewer.useEffect": ()=>{
                        const mesh = spawnFurniture("table");
                        if (mesh) saveFurnitureLayout();
                    }
                })["ModelViewer.useEffect"],
                addPlant: ({
                    "ModelViewer.useEffect": ()=>{
                        const mesh = spawnFurniture("plant");
                        if (mesh) saveFurnitureLayout();
                    }
                })["ModelViewer.useEffect"],
                clearFurniture,
                saveCloud: saveLayoutToCloud,
                loadCloud: loadLayoutFromCloud
            };
            // -----------------------
            // Controls & model loading
            // -----------------------
            const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$client$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
            controlsRef.current = controls;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enablePan = true;
            controls.maxPolarAngle = Math.PI / 2.05;
            controls.minDistance = 1;
            controls.maxDistance = 50;
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$client$5d$__$28$ecmascript$29$__["GLTFLoader"]();
            loader.load(file, {
                "ModelViewer.useEffect": (gltf)=>{
                    gltf.scene.scale.set(1, 1, 1);
                    gltf.scene.position.set(0, 0, 0);
                    scene.add(gltf.scene);
                    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(gltf.scene);
                    const size = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"]()).length();
                    const center = box.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"]());
                    roomCenter = center.clone();
                    controls.target.copy(center);
                    camera.position.set(center.x + size * 0.6, center.y + size * 0.3, center.z + size * 0.6);
                    camera.lookAt(center);
                    // once the room is loaded, restore any saved furniture
                    loadFurnitureLayout();
                }
            }["ModelViewer.useEffect"], {
                "ModelViewer.useEffect": (xhr)=>{
                    if (xhr.total) {
                        const percent = (xhr.loaded / xhr.total * 100).toFixed(1);
                        console.log(`Loading model: ${percent}%`);
                    }
                }
            }["ModelViewer.useEffect"], {
                "ModelViewer.useEffect": (error)=>{
                    console.error("Failed to load GLB model:", error);
                    // still try to load layout in case we want to handle fallback later
                    loadFurnitureLayout();
                }
            }["ModelViewer.useEffect"]);
            // -----------------------
            // Interaction handlers
            // -----------------------
            const handleResize = {
                "ModelViewer.useEffect.handleResize": ()=>{
                    const newWidth = container.clientWidth || window.innerWidth;
                    const newHeight = container.clientHeight || window.innerHeight;
                    camera.aspect = newWidth / newHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(newWidth, newHeight);
                }
            }["ModelViewer.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            function updatePointer(event) {
                const rect = renderer.domElement.getBoundingClientRect();
                pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
                pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            }
            function findFurnitureRoot(object) {
                let current = object;
                while(current){
                    if (current.userData?.furnitureType) return current;
                    current = current.parent;
                }
                return null;
            }
            const handlePointerDown = {
                "ModelViewer.useEffect.handlePointerDown": (event)=>{
                    if (!furnitureGroupRef.current) return;
                    updatePointer(event);
                    raycaster.setFromCamera(pointer, camera);
                    const intersects = raycaster.intersectObjects(furnitureGroupRef.current.children, true);
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
                }
            }["ModelViewer.useEffect.handlePointerDown"];
            const handlePointerMove = {
                "ModelViewer.useEffect.handlePointerMove": (event)=>{
                    if (!isDragging || !selectedFurniture) return;
                    updatePointer(event);
                    raycaster.setFromCamera(pointer, camera);
                    const intersectionPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
                        selectedFurniture.position.x = intersectionPoint.x;
                        selectedFurniture.position.z = intersectionPoint.z;
                        const floorY = selectedFurniture.userData?.floorY;
                        if (typeof floorY === "number") {
                            selectedFurniture.position.y = floorY;
                        }
                    }
                }
            }["ModelViewer.useEffect.handlePointerMove"];
            const endDrag = {
                "ModelViewer.useEffect.endDrag": ()=>{
                    if (!isDragging) return;
                    isDragging = false;
                    controls.enabled = true;
                    if (selectedFurniture) {
                        saveFurnitureLayout();
                    }
                }
            }["ModelViewer.useEffect.endDrag"];
            const handlePointerUp = {
                "ModelViewer.useEffect.handlePointerUp": ()=>{
                    endDrag();
                }
            }["ModelViewer.useEffect.handlePointerUp"];
            const handlePointerLeave = {
                "ModelViewer.useEffect.handlePointerLeave": ()=>{
                    endDrag();
                }
            }["ModelViewer.useEffect.handlePointerLeave"];
            const handleKeyDown = {
                "ModelViewer.useEffect.handleKeyDown": (event)=>{
                    if ((event.key === "Delete" || event.key === "Backspace") && selectedFurniture) {
                        removeFurniture(selectedFurniture);
                        selectedFurniture = null;
                        saveFurnitureLayout();
                        return;
                    }
                    const rotateLeft = event.key === "q" || event.key === "Q" || event.key === "ArrowLeft";
                    const rotateRight = event.key === "e" || event.key === "E" || event.key === "ArrowRight";
                    if (selectedFurniture && (rotateLeft || rotateRight)) {
                        const delta = rotateLeft ? -ROTATION_STEP : ROTATION_STEP;
                        selectedFurniture.rotation.y += delta;
                        saveFurnitureLayout();
                        return;
                    }
                    if ((event.key === "l" || event.key === "L") && (event.metaKey || event.ctrlKey) && event.shiftKey) {
                        const layout = getCurrentLayout();
                        const json = JSON.stringify(layout, null, 2);
                        console.log("[Lou-re] furniture layout:\n", json);
                        if (navigator?.clipboard?.writeText) {
                            navigator.clipboard.writeText(json).catch({
                                "ModelViewer.useEffect.handleKeyDown": ()=>{}
                            }["ModelViewer.useEffect.handleKeyDown"]);
                        }
                        event.preventDefault();
                    }
                }
            }["ModelViewer.useEffect.handleKeyDown"];
            renderer.domElement.addEventListener("pointerdown", handlePointerDown);
            renderer.domElement.addEventListener("pointermove", handlePointerMove);
            renderer.domElement.addEventListener("pointerup", handlePointerUp);
            renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
            window.addEventListener("keydown", handleKeyDown);
            let animationFrame;
            const animate = {
                "ModelViewer.useEffect.animate": ()=>{
                    controls.update();
                    renderer.render(scene, camera);
                    animationFrame = requestAnimationFrame(animate);
                }
            }["ModelViewer.useEffect.animate"];
            animate();
            return ({
                "ModelViewer.useEffect": ()=>{
                    cancelAnimationFrame(animationFrame);
                    window.removeEventListener("resize", handleResize);
                    window.removeEventListener("keydown", handleKeyDown);
                    renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
                    renderer.domElement.removeEventListener("pointermove", handlePointerMove);
                    renderer.domElement.removeEventListener("pointerup", handlePointerUp);
                    renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
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
                        loadCloud: null
                    };
                    furnitureGroupRef.current = null;
                }
            })["ModelViewer.useEffect"];
        }
    }["ModelViewer.useEffect"], [
        file
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            background: "#000"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                style: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "#000",
                    cursor: "grab"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "louref-toolbar",
                style: {
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
                    zIndex: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 600,
                            marginBottom: "4px"
                        },
                        children: "Furniture tools"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            opacity: 0.8,
                            marginBottom: "8px"
                        },
                        children: "Click to drop furniture. Click an item to select, drag to move, use Q/E or ←/→ to rotate, press Delete to remove, and press Ctrl/⌘ + Shift + L to copy layout JSON."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 568,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>furnitureHelpersRef.current.addSofa?.(),
                        style: toolbarButtonStyle,
                        children: "+ Add sofa (box)"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>furnitureHelpersRef.current.addTable?.(),
                        style: toolbarButtonStyle,
                        children: "+ Add table (box)"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 579,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>furnitureHelpersRef.current.addPlant?.(),
                        style: toolbarButtonStyle,
                        children: "+ Add plant (cylinder + cone)"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 585,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        style: {
                            borderColor: "#333",
                            margin: "6px 0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 592,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>furnitureHelpersRef.current.saveCloud?.(),
                        style: toolbarButtonStyle,
                        children: "💾 Save layout to cloud"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 594,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>furnitureHelpersRef.current.loadCloud?.(),
                        style: toolbarButtonStyle,
                        children: "☁️ Load layout from cloud"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>furnitureHelpersRef.current.clearFurniture?.(),
                        style: {
                            ...toolbarButtonStyle,
                            marginTop: "4px",
                            border: "1px solid #555",
                            background: "#220000",
                            color: "#ffb3b3"
                        },
                        children: "Clear all furniture"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                        lineNumber: 607,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
                lineNumber: 547,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx",
        lineNumber: 528,
        columnNumber: 5
    }, this);
}
_s(ModelViewer, "6FnDlKvLBi7ae/4uMnF3rDT4qJM=");
_c = ModelViewer;
const toolbarButtonStyle = {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    textAlign: "left"
};
var _c;
__turbopack_context__.k.register(_c, "ModelViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx [client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/lou-re-3d-core/components/ModelViewer.jsx [client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Desktop_lou-re-3d-core_components_ModelViewer_jsx_e94dec42._.js.map