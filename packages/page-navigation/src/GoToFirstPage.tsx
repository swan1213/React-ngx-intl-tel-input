/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import type { Store } from '@react-pdf-viewer/core';

import { GoToFirstPageButton } from './GoToFirstPageButton';
import { useCurrentPage } from './useCurrentPage';
import type { RenderGoToPage, RenderGoToPageProps } from './types/index';
import type { StoreProps } from './types/StoreProps';

export const GoToFirstPage: React.FC<{
    children?: RenderGoToPage;
    store: Store<StoreProps>;
}> = ({ children, store }) => {
    const { currentPage } = useCurrentPage(store);
    const goToFirstPage = () => {
        const jumpToPage = store.get('jumpToPage');
        if (jumpToPage) {
            jumpToPage(0);
        }
    };

    const defaultChildren = (props: RenderGoToPageProps) => (
        <GoToFirstPageButton isDisabled={props.isDisabled} onClick={props.onClick} />
    );
    const render = children || defaultChildren;

    return render({
        isDisabled: currentPage === 0,
        onClick: goToFirstPage,
    });
};
