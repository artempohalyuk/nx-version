import { createAction } from '@ngneat/effects';

export const loadNews = createAction('[News] Load');
export const loadNewsDetails = createAction('[News Details] Load', (newsId: string) => ({newsId}));
export const loadActivePlayers = createAction('[Active Players] Load');
export const loadUserTeam = createAction('[User Team] Load');
export const createUserTeam = createAction('[User Team] Create', (name: string) => ({name}));
export const updateUserTeam = createAction('[User Team] Update', (userTeam) => ({userTeam}));
export const removeUserTeam = createAction('[User Team] Remove');