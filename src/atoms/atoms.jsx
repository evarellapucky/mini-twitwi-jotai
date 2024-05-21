import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage('user-key', null);
export const tokenAtom = atomWithStorage('token-key', null);
export const postsAtom = atom([]);