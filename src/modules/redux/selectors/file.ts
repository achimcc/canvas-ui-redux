import { createSelector } from '@reduxjs/toolkit';
import { Store } from '../store';

const contractSelector = (store: Store) => store.contracts.contracts;

export const getByHash = (hash: string) =>
  createSelector(contractSelector, contracts => contracts.find(c => c.hash === hash));

export const getAllContractFiles = () => createSelector(contractSelector, contracts => contracts);
