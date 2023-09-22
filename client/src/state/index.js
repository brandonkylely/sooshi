import { atom } from "jotai";

/**
 * @paginationAtom = {page: number, lastKeyData: string}
 */

export const userAtom = atom(null);
export const paginationAtom = atom({ pageNumber: 1, lastKeyData: null });
export const feedLoadingAtom = atom(false);
export const homePageFormChangeAtom = atom(false);

// Development only
// Check if we're in dev mode, used to render Navbar button for dev API switch
export const devAtom = atom(import.meta.env.DEV);
// true = use Local API, false = use AWS API
export const devAPIAtom = atom(false);