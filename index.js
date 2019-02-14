/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Main from './index.android';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
