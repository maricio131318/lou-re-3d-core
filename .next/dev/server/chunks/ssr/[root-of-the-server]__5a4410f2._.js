module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@supabase/supabase-js", () => require("@supabase/supabase-js"));

module.exports = mod;
}),
"[project]/Desktop/lou-re-3d-core/lib/supabaseClient.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://pbtappndlqjmbwhgqzfd.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBidGFwcG5kbHFqbWJ3aGdxemZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTU0NDYsImV4cCI6MjA3ODAzMTQ0Nn0.kZlmUtlrdxdR5FTd4h1d0maxjLpOo_4j-iNJSikyVio");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$29$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/Desktop/lou-re-3d-core/pages/upload.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/lib/supabaseClient.js [ssr] (ecmascript)");
;
;
;
function UploadPage({ onUpload }) {
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    async function handleUpload() {
        if (!file) return alert("Select a photo first.");
        setIsUploading(true);
        try {
            const fileName = Date.now() + "_" + file.name;
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from("rooms").upload("uploads/" + fileName, file);
            if (error) throw error;
            const publicUrl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from("rooms").getPublicUrl("uploads/" + fileName).data.publicUrl;
            onUpload(publicUrl);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally{
            setIsUploading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                type: "file",
                accept: "image/*",
                onChange: (e)=>setFile(e.target.files[0])
            }, void 0, false, {
                fileName: "[project]/Desktop/lou-re-3d-core/pages/upload.js",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                disabled: isUploading,
                onClick: handleUpload,
                children: isUploading ? "Uploading..." : "Upload Photo"
            }, void 0, false, {
                fileName: "[project]/Desktop/lou-re-3d-core/pages/upload.js",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/lou-re-3d-core/pages/upload.js",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/lou-re-3d-core/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$pages$2f$upload$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/lou-re-3d-core/pages/upload.js [ssr] (ecmascript)");
;
;
;
;
const PRESET_STYLES = [
    {
        id: "japandi",
        label: "Japandi Calm",
        prompt: "Transform the room into a Japandi modern interior with neutral tones, natural wood, clean lines, low furniture, and a peaceful zen atmosphere."
    },
    {
        id: "modern",
        label: "Modern Minimal",
        prompt: "Transform the room into a modern minimal interior with white walls, black accents, sleek furniture, hidden storage, and large statement lighting."
    },
    {
        id: "luxury",
        label: "Luxury Hotel",
        prompt: "Transform the room into a luxury hotel suite with warm lighting, high-end finishes, marble accents, plush textiles, and a dramatic centerpiece."
    },
    {
        id: "scandi",
        label: "Scandinavian Cozy",
        prompt: "Transform the room into a Scandinavian cozy interior with light wood, soft textiles, simple forms, lots of natural light, and plants."
    }
];
function Home() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const defaultPrompt = PRESET_STYLES[0].prompt;
    const [uploadedImageUrl, setUploadedImageUrl] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [restylePrompt, setRestylePrompt] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(defaultPrompt);
    const [restyledImageUrl, setRestyledImageUrl] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isRestyling, setIsRestyling] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [statusMessage, setStatusMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [activePresetId, setActivePresetId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(PRESET_STYLES[0].id);
    async function handleRestyle(promptOverride) {
        if (!uploadedImageUrl) {
            alert("Upload a room photo first.");
            return;
        }
        setIsRestyling(true);
        setError(null);
        const promptToUse = promptOverride || restylePrompt;
        setStatusMessage("Restyling… please wait.");
        setRestyledImageUrl(null);
        try {
            const res = await fetch("/api/restyle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    imageUrl: uploadedImageUrl,
                    prompt: promptToUse
                })
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.error || "Unknown error");
                setStatusMessage("");
                return;
            }
            setRestyledImageUrl(data.assetUrl);
            setStatusMessage("Done! Enjoy your newly styled room.");
        } catch (err) {
            setError(err.message);
            setStatusMessage("");
        } finally{
            setIsRestyling(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            padding: "32px 24px 64px",
            background: "#050505",
            display: "flex",
            justifyContent: "center"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 1200
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                    style: {
                        marginBottom: 32
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                color: "#8c8c8c",
                                letterSpacing: 2,
                                fontSize: 12
                            },
                            children: "ROOM RESTYLE"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            style: {
                                margin: "8px 0 12px",
                                fontSize: 36
                            },
                            children: "Generate new looks for any room in seconds."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                color: "#bcbcbc",
                                maxWidth: 640
                            },
                            children: "Upload a single room photo, choose a preset, and let Lou-re imagine the space in a new style using the Luma Photon API."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: {
                        background: "rgba(255,255,255,0.03)",
                        padding: 20,
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.07)",
                        marginBottom: 32
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            style: {
                                marginTop: 0
                            },
                            children: "Upload a room photo"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                color: "#9d9d9d",
                                marginBottom: 16
                            },
                            children: "Choose a single JPG or PNG image. We’ll store it securely via Supabase storage."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$lou$2d$re$2d$3d$2d$core$2f$pages$2f$upload$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onUpload: (url)=>setUploadedImageUrl(url)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 24,
                        marginBottom: 32
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ImageColumn, {
                            title: "Original photo",
                            imageUrl: uploadedImageUrl,
                            placeholder: "Upload a room photo to preview it here."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ImageColumn, {
                            title: "AI restyled photo",
                            imageUrl: restyledImageUrl,
                            placeholder: "Run a restyle to see the AI output.",
                            footer: restyledImageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>router.push("/viewer"),
                                style: {
                                    marginTop: 16,
                                    background: "#2563eb",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: 999,
                                    cursor: "pointer"
                                },
                                children: "Open 3D Sample Room"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                                lineNumber: 143,
                                columnNumber: 17
                            }, void 0) : null
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: {
                        background: "rgba(255,255,255,0.03)",
                        padding: 24,
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.07)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8
                            },
                            children: PRESET_STYLES.map((style)=>{
                                const isActive = activePresetId === style.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setActivePresetId(style.id);
                                        setRestylePrompt(style.prompt);
                                        handleRestyle(style.prompt);
                                    },
                                    style: {
                                        borderRadius: 999,
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        background: isActive ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.08)",
                                        color: "#fff",
                                        padding: "8px 16px",
                                        cursor: "pointer",
                                        fontSize: 14
                                    },
                                    children: style.label
                                }, style.id, false, {
                                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                                    lineNumber: 175,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            style: {
                                display: "block",
                                marginTop: 20,
                                marginBottom: 8
                            },
                            children: "Restyle prompt"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                            value: restylePrompt,
                            onChange: (e)=>{
                                setRestylePrompt(e.target.value);
                                setActivePresetId(null);
                            },
                            style: {
                                width: "100%",
                                minHeight: 110,
                                borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(0,0,0,0.6)",
                                color: "#fff",
                                padding: 16,
                                fontSize: 15,
                                fontFamily: "inherit"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 16,
                                alignItems: "center",
                                marginTop: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleRestyle,
                                    disabled: isRestyling,
                                    style: {
                                        background: isRestyling ? "#1e40af" : "#2563eb",
                                        color: "#fff",
                                        border: "none",
                                        padding: "12px 28px",
                                        borderRadius: 999,
                                        fontSize: 16,
                                        cursor: isRestyling ? "wait" : "pointer",
                                        transition: "background 0.2s ease"
                                    },
                                    children: isRestyling ? "Restyling…" : "Generate Restyle"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                statusMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#9fb5ff"
                                    },
                                    children: statusMessage
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#ff7b7b"
                                    },
                                    children: [
                                        "Error: ",
                                        error
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function ImageColumn({ title, imageUrl, placeholder, footer }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                style: {
                    marginBottom: 12
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        style: {
                            width: "100%",
                            borderRadius: 16,
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                            display: "block"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    footer
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    height: 320,
                    borderRadius: 16,
                    border: "1px dashed rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7c7c7c",
                    textAlign: "center",
                    padding: 24,
                    background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.6))"
                },
                children: placeholder
            }, void 0, false, {
                fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
                lineNumber: 280,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/lou-re-3d-core/pages/index.js",
        lineNumber: 263,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a4410f2._.js.map