import { createSelector } from '@reduxjs/toolkit';
import { Store } from '../store';

const contractsSelector = (store: Store) => store.contracts.contracts;

export const getByHash = (hash: string) =>
  createSelector(contractsSelector, contracts => contracts.find(c => c.hash === hash));
