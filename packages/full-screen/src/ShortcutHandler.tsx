/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { isMac } from '@react-pdf-viewer/core';
import type { Store } from '@react-pdf-viewer/core';

import { useEnterFullScreen } from './useEnterFullScreen';
import type { StoreProps } from './types/StoreProps';
import type { Zoom } from './types/Zoom';

export const ShortcutHandler: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>;
    getFullScreenTarget(pagesContainer: HTMLElement): HTMLElement;
    store: Store<StoreProps>;
    onEnterFullScreen: (zoom: Zoom) => void;
    onExitFullScreen: (zoom: Zoom) => void;
}> = ({ containerRef, getFullScreenTarget, store, onEnterFullScreen, onExitFullScreen }) => {
    const { enterFullScreen } = useEnterFullScreen(getFullScreenTarget, store, onEnterFullScreen, onExitFullScreen);

    const keydownHandler = (e: KeyboardEvent) => {
        if (e.shiftKey || e.altKey) {
            return;
        }
        const areShortcutsPressed = isMac() ? e.metaKey && e.ctrlKey && e.key === 'f' : e.key === 'F11';
        if (!areShortcutsPressed) {
            return;
        }

        const containerEle = containerRef.current;
        if (!containerEle || !document.activeElement || !containerEle.contains(document.activeElement)) {
            return;
        }

        e.preventDefault();
        enterFullScreen();
    };

    React.useEffect(() => {
        const containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }

        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [containerRef.current]);

    return <></>;
};
