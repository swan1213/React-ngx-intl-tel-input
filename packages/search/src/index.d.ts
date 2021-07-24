/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import type { Plugin } from '@react-pdf-viewer/core';

export interface Match {
    keyword: RegExp;
    // The index of match in the page
    // Each page may have multiple matches
    matchIndex: number;
    pageIndex: number;
    pageText: string;
    // Position of matching
    startIndex: number;
    endIndex: number;
}

export interface RenderShowSearchPopoverProps {
    onClick: () => void;
}

export interface RenderSearchProps {
    clearKeyword(): void;
    changeMatchCase(matchCase: boolean): void;
    changeWholeWords(wholeWords: boolean): void;
    currentMatch: number;
    jumpToMatch(index: number): Match | null;
    jumpToNextMatch(): Match | null;
    jumpToPreviousMatch(): Match | null;
    keyword: string;
    matchCase: boolean;
    numberOfMatches: number;
    wholeWords: boolean;
    search(): Promise<Match[]>;
    setKeyword(keyword: string): void;
}

export interface ShowSearchPopoverProps {
    children?: (props: RenderShowSearchPopoverProps) => React.ReactElement;
}

export interface SearchProps {
    children?: (props: RenderSearchProps) => React.ReactElement;
}

export interface SearchPlugin extends Plugin {
    Search: (props: SearchProps) => React.ReactElement;
    ShowSearchPopover: (props: ShowSearchPopoverProps) => React.ReactElement;
    ShowSearchPopoverButton(): React.ReactElement;
    clearHighlights(): void;
    highlight(keyword: SingleKeyword | SingleKeyword[]): Promise<Match[]>;
    jumpToMatch(index: number): Match | null;
    jumpToNextMatch(): Match | null;
    jumpToPreviousMatch(): Match | null;
}

export interface FlagKeyword {
    keyword: string;
    matchCase?: boolean; // `false` by default
    wholeWords?: boolean; // `false` by default
}

export type SingleKeyword = string | RegExp | FlagKeyword;

export interface OnHighlightKeyword {
    highlightEle: HTMLElement;
    keyword: RegExp;
}

export interface SearchPluginProps {
    // The keyword that will be highlighted in all pages
    keyword?: SingleKeyword | SingleKeyword[];
    onHighlightKeyword?(props: OnHighlightKeyword): void;
}

export function searchPlugin(props?: SearchPluginProps): SearchPlugin;

export class NextIcon extends React.Component {}
export class PreviousIcon extends React.Component {}
export class SearchIcon extends React.Component {}
