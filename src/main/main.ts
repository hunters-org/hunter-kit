/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import os from 'node:os';
import MenuBuilder from './menu';
import { initProjectDir, resolveHtmlPath } from './util';
import { subFinder } from './recon/subfinder';
import {
  PROJECT_DIR,
  createJsonFile,
  createProjectDir,
  createRequestToUrlScanner,
  projectDetails,
  projectScan,
  readDirectoryNames,
} from './api/project';
import { liveSubDomains, screenwin } from './recon/httpx';
import { fetchJs, parameter, wwayback } from './recon/waybackurls';
import { returnFile } from './api/serve';
import { extraLinks, findSecret } from './jsleak/jsleak';
import {
  defaultCredentials,
  exposedPanels,
  generalScanning,
  scanningCVEs,
  scanningForExposures,
  scanningForLFI,
  subdomainTakeovers,
} from './scanning/nuclei';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.handle('api-call', async (event, args) => {
  const { projectName, location, type } = args[0];
  const res = returnFile(`${projectName}/${location}`, type);
  return res;
});
// jeslack
ipcMain.handle('find-secrets', async (event, args) => {
  const { projectName } = args[0];
  const res = findSecret(`${PROJECT_DIR}/${projectName}`);
  return res;
});

ipcMain.handle('extra-links', async (event, args) => {
  const { projectName } = args[0];
  const res = extraLinks(`${PROJECT_DIR}/${projectName}`);
  return res;
});
// end of jeslack

ipcMain.handle('subfinder-process', async (event, args) => {
  const { domain, projectName } = args[0];
  const res = subFinder(domain, `${PROJECT_DIR}/${projectName}`);
  return res;
});
ipcMain.handle('httpx-live-domain', async (event, args) => {
  const { projectName } = args[0];
  const res = liveSubDomains(`${PROJECT_DIR}/${projectName}`);
  return res;
});
ipcMain.handle('httpx-screens', async (event, args) => {
  const { projectName } = args[0];
  const res = screenwin(`${PROJECT_DIR}/${projectName}`);
  return res;
});
ipcMain.handle('waybackurls-archive', async (event, args) => {
  const { projectName } = args[0];
  const res = wwayback(`${PROJECT_DIR}/${projectName}`);
  return res;
});
ipcMain.handle('waybackurls-js', async (event, args) => {
  const { projectName } = args[0];
  const res = fetchJs(`${PROJECT_DIR}/${projectName}`);
  return res;
});
ipcMain.handle('waybackurls-parameter', async (event, args) => {
  const { projectName } = args[0];
  const res = parameter(`${PROJECT_DIR}/${projectName}`);
  return res;
});

/// nuclei
ipcMain.handle('general-scan', async (event, args) => {
  const { projectName } = args[0];
  const res = await generalScanning(`${PROJECT_DIR}/${projectName}`);
  return res;
});
ipcMain.handle('scanning_for_exposures', async (event, args) => {
  const { projectName } = args[0];
  const res = await scanningForExposures(`${PROJECT_DIR}/${projectName}`);
  return res;
});

ipcMain.handle('exposed-panels', async (event, args) => {
  const { projectName } = args[0];
  const res = await exposedPanels(`${PROJECT_DIR}/${projectName}`);
  return res;
});

ipcMain.handle('default_credentials', async (event, args) => {
  const { projectName } = args[0];
  const res = await defaultCredentials(`${PROJECT_DIR}/${projectName}`);
  return res;
});

ipcMain.handle('subdomain_takeovers', async (event, args) => {
  const { projectName } = args[0];
  const res = await subdomainTakeovers(`${PROJECT_DIR}/${projectName}`);
  return res;
});

ipcMain.handle('scanning_CVEs', async (event, args) => {
  const { projectName } = args[0];
  const res = await scanningCVEs(`${PROJECT_DIR}/${projectName}`);
  return res;
});

ipcMain.handle('scanning_for_LFI', async (event, args) => {
  const { projectName } = args[0];
  const res = await scanningForLFI(`${PROJECT_DIR}/${projectName}`);
  return res;
});

// end of nuclei
ipcMain.handle('get-project-dir', async (event) => {
  return PROJECT_DIR;
});

ipcMain.handle('get-project-details', async (event, args) => {
  const projectName = args[0];
  const data = projectDetails(projectName);
  return data;
});

ipcMain.handle('get-project-scan', async (event, args) => {
  const projectName = args[0];
  const data = projectScan(projectName);
  return data;
});

ipcMain.handle('list-projects', async (event) => {
  const dirs = readDirectoryNames();
  return dirs;
});
ipcMain.once('open-link', async (event, args) => {
  const { url } = args[0];
  shell.openExternal(`https://${url}`);
});

ipcMain.handle('create-project', async (event, args) => {
  const { projectName, domain } = args[0];
  try {
    createProjectDir(projectName);
    createJsonFile(projectName, domain);
    await createRequestToUrlScanner(projectName, domain);
    return { error: false };
  } catch (err) {
    return { error: true };
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  function selectAppIcon(): string {
    switch (os.platform()) {
      case 'win32':
        return getAssetPath('icon.ico');
      case 'darwin':
        return getAssetPath('logo.icns');
      default:
        return getAssetPath('logo.png');
    }
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1400,
    height: 900,
    icon: selectAppIcon(),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  mainWindow.center();
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    initProjectDir();

    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
// const test = '';
// exposedPanels(test);
// generalScanning(test);
// defaultCredentials(test);
// subdomainTakeovers(test);
// scanningForExposures(test);
// scanningForLFI(test);
// scanningCVEs(test);
