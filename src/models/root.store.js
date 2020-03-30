import { types, flow, cast, applySnapshot } from "mobx-state-tree";

import { req, errorCollector } from "Utils";

const initialState = {};

const RootStore = types.model({}).actions(self => ({}));

const rootStore = RootStore.create(initialState);

export { rootStore, RootStore };
