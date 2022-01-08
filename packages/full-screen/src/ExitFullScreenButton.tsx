/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2022 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { classNames, LocalizationContext, MinimalButton, TextDirection, ThemeContext } from '@react-pdf-viewer/core';

import { ExitFullScreenIcon } from './ExitFullScreenIcon';

export const ExitFullScreenButton: React.FC<{
    onClick(): void;
}> = ({ onClick }) => {
    const { l10n } = React.useContext(LocalizationContext);
    const { direction } = React.useContext(ThemeContext);
    const isRtl = direction === TextDirection.RightToLeft;

    const exitFullScreenLabel = l10n && l10n.fullScreen ? l10n.fullScreen.exitFullScreen : 'Exit full screen';

    return (
        <div
            className={classNames({
                'rpv-full-screen__exit-button': true,
                'rpv-full-screen__exit-button--ltr': !isRtl,
                'rpv-full-screen__exit-button--rtl': isRtl,
            })}
        >
            <MinimalButton
                ariaLabel={exitFullScreenLabel as string}
                testId="full-screen__exit-button"
                onClick={onClick}
            >
                <ExitFullScreenIcon />
            </MinimalButton>
        </div>
    );
};
