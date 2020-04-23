/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React from 'react';

import ThemeContent from '../theme/ThemeContext';
import calculatePosition from '../utils/calculatePosition';
import Arrow from './Arrow';
import Offset from './Offset';
import Position from './Position';
import './tooltipBody.less';

interface TooltipBodyProps {
    offset: Offset;
    position: Position;
    targetRef: React.RefObject<HTMLElement>;
}

const TooltipBody: React.FC<TooltipBodyProps> = ({ children, offset, position, targetRef }) => {
    const theme = React.useContext(ThemeContent);
    const contentRef = React.createRef<HTMLDivElement>();
    const anchorRef = React.createRef<HTMLDivElement>();

    React.useLayoutEffect(() => {
        const targetEle = targetRef.current;
        const contentEle = contentRef.current;
        const anchorEle = anchorRef.current;
        if (!contentEle || !targetEle || !anchorEle) {
            return;
        }

        const anchorRect = anchorEle.getBoundingClientRect();
        const { top, left } = calculatePosition(contentEle, targetEle, position, offset);
        contentEle.style.top = `${top - anchorRect.top}px`;
        contentEle.style.left = `${left - anchorRect.left}px`;
    }, []);

    return (
        <>
            <div
                ref={anchorRef}
                style={{ left: 0, position: 'absolute', top: 0 }}
            />
            <div className={`${theme.prefixClass}-tooltip-body`} ref={contentRef}>
                <Arrow customClassName={`${theme.prefixClass}-tooltip-body-arrow`} position={position} />
                <div className={`${theme.prefixClass}-tooltip-body-content`}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default TooltipBody;
