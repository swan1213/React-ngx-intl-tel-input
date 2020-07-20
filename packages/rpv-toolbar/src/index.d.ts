/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { ReactElement } from 'react';
import { Plugin } from '@phuocng/rpv';

export interface ToolbarSlot {
    currentPage: ReactElement;
    currentPageInput: ReactElement;
    downloadButton: ReactElement;
    fullScreenButton: ReactElement;
    goToFirstPage: ReactElement;
    goToLastPage: ReactElement;
    nextPage: ReactElement;
    numberOfPages: ReactElement;
    openFileButton: ReactElement;
    previousPage: ReactElement;
    printButton: ReactElement;
    zoomInButton: ReactElement;
}

export type RenderToolbarSlot = (toolbarSlot: ToolbarSlot) => ReactElement;
export type RenderToolbar = (renderToolbar: RenderToolbarSlot) => ReactElement;

export interface ToolbarProps {
    children?: RenderToolbarSlot;
}

export interface ToolbarPlugin extends Plugin {
    Toolbar: (props: ToolbarProps) => ReactElement;
}

export default function toolbarPlugin(): ToolbarPlugin;
