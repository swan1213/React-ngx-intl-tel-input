/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import type { PdfJs } from '../types/PdfJs';

enum PageRenderStatus {
    NotRenderedYet = 'NotRenderedYet',
    Rendering = 'Rendering',
    Rendered = 'Rendered',
}

interface PageVisibility {
    pageIndex: number;
    renderStatus: PageRenderStatus;
    visibility: number;
}

interface RenderQueue {
    currentRenderingPage: number;
    startRange: number;
    endRange: number;
    visibilities: PageVisibility[];
}

export interface UseRenderQueue {
    getHighestPriorityPage: () => number;
    isInRange: (pageIndex: number) => boolean;
    markRangeNotRendered: () => void;
    markRendered: (pageIndex: number) => void;
    markRendering: (pageIndex: number) => void;
    setOutOfRange: (pageIndex: number) => void;
    setRange: (startIndex: number, endIndex: number) => void;
    setVisibility: (pageIndex: number, visibility: number) => void;
}

const OUT_OF_RANGE_VISIBILITY = -9999;

export const useRenderQueue = ({ doc }: { doc: PdfJs.PdfDocument }): UseRenderQueue => {
    const { numPages } = doc;
    const docId = doc.loadingTask.docId;

    const initialPageVisibilities = React.useMemo<PageVisibility[]>(
        () =>
            Array(numPages)
                .fill(null)
                .map((_, pageIndex) => ({
                    pageIndex,
                    renderStatus: PageRenderStatus.NotRenderedYet,
                    visibility: OUT_OF_RANGE_VISIBILITY,
                })),
        [docId]
    );

    const latestRef = React.useRef<RenderQueue>({
        currentRenderingPage: -1,
        startRange: 0,
        endRange: numPages - 1,
        visibilities: initialPageVisibilities,
    });

    // Mark all pages in the current range as not rendered yet
    const markRangeNotRendered = () => {
        for (let i = latestRef.current.startRange; i <= latestRef.current.endRange; i++) {
            latestRef.current.visibilities[i].renderStatus = PageRenderStatus.NotRenderedYet;
        }
    };

    const markRendered = (pageIndex: number) => {
        latestRef.current.visibilities[pageIndex].renderStatus = PageRenderStatus.Rendered;
    };

    const markRendering = (pageIndex: number) => {
        if (
            latestRef.current.currentRenderingPage !== -1 &&
            latestRef.current.currentRenderingPage !== pageIndex &&
            latestRef.current.visibilities[latestRef.current.currentRenderingPage].renderStatus ===
                PageRenderStatus.Rendering
        ) {
            // The last rendering page isn't rendered completely
            latestRef.current.visibilities[latestRef.current.currentRenderingPage].renderStatus =
                PageRenderStatus.NotRenderedYet;
        }

        latestRef.current.visibilities[pageIndex].renderStatus = PageRenderStatus.Rendering;
        latestRef.current.currentRenderingPage = pageIndex;
    };

    const setRange = (startIndex: number, endIndex: number) => {
        latestRef.current.startRange = startIndex;
        latestRef.current.endRange = endIndex;

        for (let i = 0; i < numPages; i++) {
            if (i < startIndex || i > endIndex) {
                latestRef.current.visibilities[i].visibility = OUT_OF_RANGE_VISIBILITY;
                latestRef.current.visibilities[i].renderStatus = PageRenderStatus.NotRenderedYet;
            }
        }
    };

    const setOutOfRange = (pageIndex: number) => {
        setVisibility(pageIndex, OUT_OF_RANGE_VISIBILITY);
    };

    const setVisibility = (pageIndex: number, visibility: number) => {
        latestRef.current.visibilities[pageIndex].visibility = visibility;
    };

    // Render the next page in queue.
    // The next page is -1 in the case there's no page that need to be rendered or there is at least one page which has been rendering
    const getHighestPriorityPage = (): number => {
        // Find all visible pages which belongs to the range
        const visiblePages = latestRef.current.visibilities
            .slice(latestRef.current.startRange, latestRef.current.endRange)
            .filter((item) => item.visibility > OUT_OF_RANGE_VISIBILITY);
        if (!visiblePages.length) {
            return -1;
        }
        const firstVisiblePage = visiblePages[0].pageIndex;
        const lastVisiblePage = visiblePages[visiblePages.length - 1].pageIndex;

        // Find the first visible page that isn't rendered yet
        const numVisiblePages = visiblePages.length;
        for (let i = 0; i < numVisiblePages; i++) {
            // There is a page that is being rendered
            if (visiblePages[i].renderStatus === PageRenderStatus.Rendering) {
                return -1;
            }
            if (visiblePages[i].renderStatus === PageRenderStatus.NotRenderedYet) {
                return visiblePages[i].pageIndex;
            }
        }

        // All visible pages are rendered
        if (
            lastVisiblePage + 1 < numPages &&
            latestRef.current.visibilities[lastVisiblePage + 1].renderStatus !== PageRenderStatus.Rendered
        ) {
            // All visible pages are rendered
            // Render the page that is right after the last visible page ...
            return lastVisiblePage + 1;
        } else if (
            firstVisiblePage - 1 >= 0 &&
            latestRef.current.visibilities[firstVisiblePage - 1].renderStatus !== PageRenderStatus.Rendered
        ) {
            // ... or before the first visible one
            return firstVisiblePage - 1;
        }

        return -1;
    };

    const isInRange = (pageIndex: number) =>
        pageIndex >= latestRef.current.startRange && pageIndex <= latestRef.current.endRange;

    return {
        getHighestPriorityPage,
        isInRange,
        markRangeNotRendered,
        markRendered,
        markRendering,
        setOutOfRange,
        setRange,
        setVisibility,
    };
};
