/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import type { Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { GoToPreviousPageButton } from './GoToPreviousPageButton';
import type { RenderGoToPage, RenderGoToPageProps } from './types/index';
import type { StoreProps } from './types/StoreProps';
import { useCurrentPage } from './useCurrentPage';

export const GoToPreviousPage: React.FC<{
    children?: RenderGoToPage;
    store: Store<StoreProps>;
}> = ({ store, children }) => {
    const { currentPage } = useCurrentPage(store);

    const goToPreviousPage = () => {
        const jumpToPage = store.get('jumpToPage');
        if (jumpToPage) {
            jumpToPage(currentPage - 1);
        }
    };

    const defaultChildren = (props: RenderGoToPageProps) => (
        <GoToPreviousPageButton isDisabled={props.isDisabled} onClick={props.onClick} />
    );
    const render = children || defaultChildren;

    return render({
        isDisabled: currentPage <= 0,
        onClick: goToPreviousPage,
    });
};
