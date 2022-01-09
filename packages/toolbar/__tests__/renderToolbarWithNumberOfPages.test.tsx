import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Viewer } from '@react-pdf-viewer/core';

import { mockIsIntersecting } from '../../../test-utils/mockIntersectionObserver';
import { mockResize } from '../../../test-utils/mockResizeObserver';
import { toolbarPlugin, ToolbarSlot } from '../src';

const TestRenderToolbar: React.FC<{
    fileUrl: Uint8Array;
}> = ({ fileUrl }) => {
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    return (
        <div
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                height: '50rem',
                width: '50rem',
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    height: '2rem',
                    justifyContent: 'center',
                }}
            >
                <Toolbar>
                    {(toolbarSlot: ToolbarSlot) => {
                        const { CurrentPageLabel, NumberOfPages } = toolbarSlot;
                        return (
                            <div data-testid="current-page-label">
                                <CurrentPageLabel /> of <NumberOfPages />
                            </div>
                        );
                    }}
                </Toolbar>
            </div>
            <div
                style={{
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
            </div>
        </div>
    );
};

test('Test renderToolbar with <NumberOfPages />', async () => {
    const { findByTestId, getByTestId } = render(<TestRenderToolbar fileUrl={global['__OPEN_PARAMS_PDF__']} />);

    const viewerEle = getByTestId('core__viewer');
    mockIsIntersecting(viewerEle, true);
    viewerEle['__jsdomMockClientHeight'] = 767;
    viewerEle['__jsdomMockClientWidth'] = 800;

    let pageLabel = await findByTestId('current-page-label');
    expect(pageLabel.textContent).toEqual('1 of 8');

    // Jump to the fourth page
    const pagesContainer = getByTestId('core__inner-pages');
    pagesContainer.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 0,
        height: 767,
        width: 800,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => {},
    }));
    mockResize(pagesContainer);

    fireEvent.scroll(pagesContainer, {
        target: {
            scrollTop: 2662,
        },
    });

    await findByTestId('core__page-layer-3');
    pageLabel = await findByTestId('current-page-label');
    expect(pageLabel.textContent).toEqual('4 of 8');
});
