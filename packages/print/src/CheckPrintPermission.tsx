/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { Button, LocalizationContext, Modal } from '@react-pdf-viewer/core';
import type { PdfJs, Store } from '@react-pdf-viewer/core';

import type { StoreProps } from './types/StoreProps';
import { PrintStatus } from './structs/PrintStatus';

const PERMISSION_PRINT = 4;
const PERMISSION_PRINT_HIGHT_QUALITY = 2048;

export const CheckPrintPermission: React.FC<{
    doc: PdfJs.PdfDocument;
    store: Store<StoreProps>;
}> = ({ doc, store }) => {
    const { l10n } = React.useContext(LocalizationContext);

    const [isAllowed, setIsAllowed] = React.useState(true);

    React.useEffect(() => {
        doc.getPermissions().then((permissions) => {
            const canPrint =
                permissions === null ||
                permissions.includes(PERMISSION_PRINT) ||
                permissions.includes(PERMISSION_PRINT_HIGHT_QUALITY);
            canPrint ? store.update('printStatus', PrintStatus.Preparing) : setIsAllowed(false);
        });
    }, []);

    return isAllowed ? (
        <></>
    ) : (
        <Modal
            ariaControlsSuffix="print-permission"
            closeOnClickOutside={false}
            closeOnEscape={false}
            content={(toggle) => {
                const close = () => {
                    toggle();
                    store.update('printStatus', PrintStatus.Cancelled);
                };
                return (
                    <>
                        <div className="rpv-print__permission-body">
                            {l10n && l10n.print ? l10n.print.disallowPrint : 'The document does not allow to print'}
                        </div>
                        <div className="rpv-print__permission-footer">
                            <Button onClick={close}>{l10n && l10n.print ? l10n.print.close : 'Close'}</Button>
                        </div>
                    </>
                );
            }}
            isOpened={true}
        />
    );
};
