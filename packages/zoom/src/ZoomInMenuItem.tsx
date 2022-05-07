/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import type { LocalizationMap } from '@react-pdf-viewer/core';
import { LocalizationContext, MenuItem } from '@react-pdf-viewer/core';
import * as React from 'react';
import type { ZoomMenuItemProps } from './types/ZoomMenuItemProps';
import { ZoomInIcon } from './ZoomInIcon';

export const ZoomInMenuItem: React.FC<ZoomMenuItemProps> = ({ onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const label = l10n && l10n.zoom ? ((l10n.zoom as LocalizationMap).zoomIn as string) : 'Zoom in';

    return (
        <MenuItem icon={<ZoomInIcon />} testId="zoom__in-menu" onClick={onClick}>
            {label}
        </MenuItem>
    );
};
