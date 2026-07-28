# Decap CMS 3.14.1 local patches

Stock: `https://unpkg.com/decap-cms@3.14.1/dist/decap-cms.js`  
Local: `public/admin/decap-cms-patched.js`

## Issue

[decaporg/decap-cms#7871](https://github.com/decaporg/decap-cms/issues/7871) — after media upload via git-gateway, `selectedFile` can be undefined while the media list is still empty, crashing the UI on `.path` access.

## Patches applied (search strings in minified bundle)

1. **Toolbar**  
   - Stock: `path:m.path,name:m.name,draft:m.draft`  
   - Patched: `path:m&&m.path,name:m&&m.name,draft:m&&m.draft`

2. **After persist — wait for list**  
   - Stock: `this.state.isPersisted&&this.setState({selectedFile:e.files[0],isPersisted:!1})`  
   - Patched: `this.state.isPersisted&&e.files[0]&&this.setState({selectedFile:e.files[0],isPersisted:!1})`  
   - Same for `this.props.files[0]` in `componentDidUpdate`.

3. **handleInsert**  
   - Guard: `if(!e||!e.path)return` before insert.

4. **handleDelete / handleDownload**  
   - Guard: no-op when selection lacks `key` / `id|url`.

5. **listFiles leading-slash 404 (git-gateway fetch fail)**  
   Collection `media_folder: '/public/images/...'` is correct for Decap
   (absolute from repo root), but GitHub’s tree API rejects
   `GET .../git/trees/master:/public/...` (404).  
   - Stock: `const i=Di()(e,"/");` (trim trailing only)  
   - Patched: `const i=zs()(Di()(e,"/"),"/");` (trim leading + trailing)  
   so the request becomes `master:public/images/...` (200).

6. **getFileSha**  
   - Stock: `const r=e.split("/")`  
   - Patched: `const r=zs()(e,"/").split("/")`  
   so leading-slash paths do not produce empty tree segments.

7. **AssetProxy.toBase64 + service worker (Medien Hochladen “Failed to fetch”)**  
   Stock `toBase64()` always does `fetch(this.url)` on a `blob:` object URL.
   The site-wide SW claimed `/admin` clients and re-handled those blob fetches,
   which fails in the SW context → **Failed to fetch** on upload.
   - Patched `toBase64`: prefer `this.fileObj` + `FileReader`; try/catch on
     fetch fallback; FileReader `onerror` → empty string.
   - `handlePersist`: no-op if file list empty (cancel dialog).
   - `public/sw.js` v7: `mustBypass` for blob/data/admin/.netlify/non-GET.
   - `admin/index.html`: **gate CMS load** until SW unregister + no controller
     (no race with static script tag); reload on re-claim.
   - Admin CSP `connect-src` must include **`blob:`** (otherwise browser
     blocks `fetch(blob:…)` even without SW — classic “Failed to fetch”).

## Re-applying after upgrade

1. Download the new stock `decap-cms.js`.
2. Apply the four replacements above (adjust minified names if they changed).
3. Save as `decap-cms-patched.js` and update the version comment in `index.html`.
