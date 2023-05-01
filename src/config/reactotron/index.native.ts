import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

import { APP_NAME } from "../../constants";

const { scriptURL } = NativeModules.SourceCode;
const host = scriptURL.split("://")[1].split(":")[0];

export const reactotron = Reactotron.configure({ name: APP_NAME, host })
  .useReactNative({ asyncStorage: false, networking: true })
  .use(reactotronRedux())
  .connect();

console.tron = reactotron.log;
