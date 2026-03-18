import { ElectronAPI } from '@electron-toolkit/preload'
import type { FileGateway } from '../shared/file-gateway'

declare global {
  interface Window {
    electron: ElectronAPI
    api: FileGateway
  }
}

export {}
