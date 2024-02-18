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
import MenuBuilder from './menu';
import { initProjectDir, resolveHtmlPath } from './util';
import { subFinder } from './recon/subfinder';
import {
  PROJECT_DIR,
  createJsonFile,
  createProjectDir,
  projectDetails,
  readDirectoryNames,
} from './api/project';
import { liveSubDomains, screenwin } from './recon/httpx';
import { fetchJs, parameter, wwayback } from './recon/waybackurls';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('subfinder-process', async (event, args) => {
  const { domain, projectName } = args[0];
  const res = subFinder(domain, `${PROJECT_DIR}/${projectName}`);
  event.returnValue = res;
});
ipcMain.on('httpx-live-domain', async (event, args) => {
  const { projectName } = args[0];
  const res = liveSubDomains(`${PROJECT_DIR}/${projectName}`);
  event.returnValue = res;
});
ipcMain.on('httpx-screens', async (event, args) => {
  const { projectName } = args[0];
  const res = screenwin(`${PROJECT_DIR}/${projectName}`);
  event.returnValue = res;
});
ipcMain.on('waybackurls-archive', async (event, args) => {
  const res = wwayback();
  event.returnValue = res;
});
ipcMain.on('waybackurls-js', async (event, args) => {
  const res = fetchJs();
  event.returnValue = res;
});
ipcMain.on('waybackurls-parameter', async (event, args) => {
  const res = parameter();
  event.returnValue = res;
});

ipcMain.on('get-project-dir', async (event) => {
  event.returnValue = PROJECT_DIR;
});

ipcMain.on('get-project-details', async (event, args) => {
  const projectName = args[0];
  const data = projectDetails(projectName);
  event.returnValue = data;
});

ipcMain.on('list-projects', async (event) => {
  const dirs = readDirectoryNames();
  event.returnValue = dirs;
});

ipcMain.on('create-project', async (event, args) => {
  const { projectName, domain } = args[0];
  try {
    createProjectDir(projectName);
    createJsonFile(projectName, domain);
    event.returnValue = { error: false };
  } catch (err) {
    event.returnValue = { error: true };
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

  mainWindow = new BrowserWindow({
    show: false,
    width: 1400,
    height: 900,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

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
