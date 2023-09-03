import { atom } from "jotai";

/**
 * @paginationAtom = {page: number, lastKeyData: string}
 */

export const userAtom = atom(null);
export const paginationAtom = atom({ pageNumber: 0, lastKeyData: null });