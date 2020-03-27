import { types, onAction } from "mobx-state-tree";

import { rootStore, RootStore } from "./root.store";

const Stores = types
  .model("Stores", {
    rootStore: types.maybe(RootStore)
  })
  .views(self => ({}));

const stores = Stores.create({
  rootStore
});

const disposer = onAction(stores, call => {
  if (process.env.NODE_ENV === "development") {
    console.log("============> call: @ ", call);
  }
});

export default stores;
