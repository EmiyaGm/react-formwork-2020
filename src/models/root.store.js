import { types, flow, cast, applySnapshot } from "mobx-state-tree";

import { req, errorCollector } from "Utils";

const initialState = {
  currentLang: "zh-CN",
  initLocalesDone: false,
  getInfoRequesting: false,
  initialTheSite: true
};

const RootStore = types
  .model({
    currentLang: types.string,
    initLocalesDone: types.boolean,
    getInfoRequesting: types.boolean,
    initialTheSite: types.boolean
  })
  .actions(self => ({
    setCurrentLang(lang) {
      self.currentLang = lang;
    },
    setLocalesState(initLocalesDone) {
      self.initLocalesDone = initLocalesDone;
    },
    setGetInfoRequesting(getInfoRequesting) {
      self.getInfoRequesting = getInfoRequesting;
    },
    destroyRootStoreUser() {
      console.log("destroyRootStoreUser:");
      applySnapshot(self, {
        ...initialState,

        initLocalesDone: true
      });
    }
  }));

const rootStore = RootStore.create(initialState);

export { rootStore, RootStore };
