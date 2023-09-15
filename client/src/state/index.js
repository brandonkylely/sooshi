import { atom } from "jotai";

/**
 * @paginationAtom = {page: number, lastKeyData: string}
 */

export const userAtom = atom(null);
export const paginationAtom = atom({ pageNumber: 1, lastKeyData: null });
export const feedLoadingAtom = atom(false);

// Development only
// Check if we're in dev mode, used to render button to enable localhost API
export const devAtom = atom(import.meta.env.DEV);
export const devAPIAtom = atom(false);