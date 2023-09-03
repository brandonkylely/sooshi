import { atom } from "jotai";

/**
 * @paginationAtom = {page: number, lastKeyData: string}
 */

export const userAtom = atom(null);
export const paginationAtom = atom({ pageNumber: 1, lastKeyData: null });