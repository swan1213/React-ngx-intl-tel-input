/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import type { Plugin, PluginOnDocumentLoad } from '@react-pdf-viewer/core';
import { createStore } from '@react-pdf-viewer/core';
import * as React from 'react';
import { AttachmentListWithStore } from './AttachmentListWithStore';
import type { StoreProps } from './types/StoreProps';

export interface AttachmentPlugin extends Plugin {
    Attachments: () => React.ReactElement;
}

export const attachmentPlugin = (): AttachmentPlugin => {
    const store = React.useMemo(() => createStore<StoreProps>({}), []);

    const AttachmentsDecorator = () => <AttachmentListWithStore store={store} />;

    return {
        onDocumentLoad: (props: PluginOnDocumentLoad) => {
            store.update('doc', props.doc);
        },
        Attachments: AttachmentsDecorator,
    };
};
