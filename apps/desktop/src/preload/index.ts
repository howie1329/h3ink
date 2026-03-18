import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { FileGateway } from '../shared/file-gateway'

// Custom APIs for renderer
const api: FileGateway = {
  ensureDefaultNotesDirectory: () => ipcRenderer.invoke('file-gateway:ensureDefaultNotesDirectory'),
  createDesktopNote: (input) => ipcRenderer.invoke('file-gateway:createDesktopNote', input),
  openMarkdownFile: () => ipcRenderer.invoke('file-gateway:openMarkdownFile'),
  openRecentFile: (input) => ipcRenderer.invoke('file-gateway:openRecentFile', input),
  saveMarkdownFile: (input) => ipcRenderer.invoke('file-gateway:saveMarkdownFile', input),
  saveMarkdownFileAs: (input) => ipcRenderer.invoke('file-gateway:saveMarkdownFileAs', input),
  listRecentFiles: () => ipcRenderer.invoke('file-gateway:listRecentFiles'),
  getLaunchState: () => ipcRenderer.invoke('file-gateway:getLaunchState'),
  setLastActiveFilePath: (input) => ipcRenderer.invoke('file-gateway:setLastActiveFilePath', input)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
