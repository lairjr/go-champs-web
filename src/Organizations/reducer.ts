import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_FAILURE,
  DELETE_ORGANIZATION_SUCCESS,
  PATCH_ORGANIZATION,
  PATCH_ORGANIZATION_FAILURE,
  PATCH_ORGANIZATION_SUCCESS,
  POST_ORGANIZATION,
  POST_ORGANIZATION_FAILURE,
  POST_ORGANIZATION_SUCCESS,
  REQUEST_ORGANIZATIONS,
  REQUEST_ORGANIZATIONS_FAILURE,
  REQUEST_ORGANIZATIONS_SUCCESS
} from './actions';
import { initialState, OrganizationState } from './state';

const mapOrganization = (apiData: any) => ({
  id: apiData.id,
  name: apiData.name,
  slug: apiData.slug
});

const organizationMapEntities = mapEntities(
  returnProperty('slug'),
  mapOrganization
);

export const deleteOrganization = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteOrganization: true
});

export const deleteOrganizationFailure = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteOrganization: false
});

export const deleteOrganizationSuccess = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => {
  const organizations = Object.keys(state.organizations)
    .filter(entityById(state.organizations, action.payload))
    .reduce(mapEntitiesByKey(state.organizations), {});
  return {
    ...state,
    isLoadingDeleteOrganization: false,
    organizations
  };
};

export const patchOrganization = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOrganization: true
});

export const patchOrganizationFailure = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOrganization: false
});

export const patchOrganizationSuccess = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOrganization: false,
  organizations: [action.payload.data].reduce(
    organizationMapEntities,
    state.organizations
  )
});

export const postOrganization = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOrganization: true
});

export const postOrganizationFailure = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOrganization: false
});

export const postOrganizationSuccess = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOrganization: false,
  organizations: [action.payload.data].reduce(
    organizationMapEntities,
    state.organizations
  )
});

export const requestOrganizations = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestOrganizations: true
});

export const requestOrganizationsFailure = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestOrganizations: false
});

export const requestOrganizationsSuccess = (
  state: OrganizationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestOrganizations: false,
  organizations: action.payload.data.reduce(organizationMapEntities, {})
});

export default createReducer(initialState, {
  [DELETE_ORGANIZATION]: deleteOrganization,
  [DELETE_ORGANIZATION_FAILURE]: deleteOrganizationFailure,
  [DELETE_ORGANIZATION_SUCCESS]: deleteOrganizationSuccess,
  [PATCH_ORGANIZATION]: patchOrganization,
  [PATCH_ORGANIZATION_FAILURE]: patchOrganizationFailure,
  [PATCH_ORGANIZATION_SUCCESS]: patchOrganizationSuccess,
  [POST_ORGANIZATION]: postOrganization,
  [POST_ORGANIZATION_FAILURE]: postOrganizationFailure,
  [POST_ORGANIZATION_SUCCESS]: postOrganizationSuccess,
  [REQUEST_ORGANIZATIONS]: requestOrganizations,
  [REQUEST_ORGANIZATIONS_FAILURE]: requestOrganizationsFailure,
  [REQUEST_ORGANIZATIONS_SUCCESS]: requestOrganizationsSuccess
});