import { createSelector } from '@reduxjs/toolkit';
import { Store } from '../store';

const instanceSelector = (store: Store) => store.contracts.instances;

export const getInstancesByHash = (hash: string) =>
  createSelector(instanceSelector, instances => instances.filter(c => c.hash === hash));

export const getAllInstances = () => createSelector(instanceSelector, instances => instances);
