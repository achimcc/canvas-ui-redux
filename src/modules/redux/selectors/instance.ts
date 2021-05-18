import { createSelector } from '@reduxjs/toolkit';
import { Store } from '../store';
import { ContractFile, Instance } from '../types';
import { allContracts } from './file';

const instanceSelector = (store: Store) => store.contracts.instances;

export const getInstancesByHash = (hash: string) =>
  createSelector(instanceSelector, instances => instances.filter(c => c.hash === hash));

export const getInstanceByAddress = (address: string) =>
  createSelector(
    instanceSelector,
    instances => instances.find(c => c.address === address) as Instance
  );

export const getAll = createSelector(instanceSelector, instances => instances);

export const getInstance = (address: string) =>
  createSelector([allContracts, getInstanceByAddress(address)], (contracts, instance) => {
    return contracts.find(c => c.hash === instance.hash) as ContractFile;
  });
