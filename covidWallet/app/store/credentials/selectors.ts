import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ICredentialObject } from './interface';

export const CredentialAdapter = createEntityAdapter({
  selectId: (action: ICredentialObject) => action.credentialId,
});

// Select Status
export const credentialState = (state: RootState) => state.credential;

export const addCredentialStatus = (state: RootState) => state.credential.addCredential;

export const deleteCredentialStatus = (state: RootState) => state.credential.deleteCredential;

// Select Error
export const fetchCredentialsError = (state: RootState) => state.credential.error;

// Select all credentials
export const getAllCredentials = CredentialAdapter.getSelectors((s: RootState) => s.credential);

// Select all credentials
export const selectSingleCredential = createSelector(
  (state: RootState) => state.credential.entities,
  (_: RootState, credentialId: string) => credentialId,
  (entities, credentialId) => {
    return entities[credentialId];
  }
);

export const fetchCredentialsStatus = createSelector([credentialState], state => ({
  initial: state.fetchCredentials === 'initial',
  loading: state.fetchCredentials === 'loading',
  success: state.fetchCredentials === 'success',
  error: state.fetchCredentials === 'error',
  status: state.fetchCredentials,
}));

// Select sorted array
export const selectSortedCredentials = createSelector(getAllCredentials.selectAll, cred =>
  cred.sort((a, b) => new Date(a.issuedAtUtc).getTime() - new Date(b.issuedAtUtc).getTime())
);

export const selectSearchedCredentials = createSelector(
  getAllCredentials.selectAll,
  (_: RootState, searchKeyword: string) => searchKeyword.toLowerCase(),
  (cred, keyword) => {
    if (!keyword) return cred;

    return cred.filter(c => c.type?.toLowerCase().includes(keyword));
  }
);
