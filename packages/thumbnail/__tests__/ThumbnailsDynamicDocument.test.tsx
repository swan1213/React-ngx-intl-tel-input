import * as React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Button, Viewer } from '@react-pdf-viewer/core';

import { mockIsIntersecting } from '../../../test-utils/mockIntersectionObserver';
import { mockResize } from '../../../test-utils/mockResizeObserver';
import { thumbnailPlugin } from '../src';

const fs = require('fs');
const path = require('path');

const TestThumbnailsDynamicDocument = () => {
    const pageLabelDocument = React.useMemo(
        () => new Uint8Array(fs.readFileSync(path.resolve(__dirname, '../../../samples/ignore/page-labels.pdf'))),
        []
    );

    const [fileUrl, setFileUrl] = React.useState(global['__OPEN_PARAMS_PDF__']);
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    return (
        <div
            data-testid="root"
            style={{
                margin: '1rem auto',
                width: '64rem',
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '1rem',
                }}
            >
                <div style={{ marginRight: '0.5rem' }}>
                    <Button testId="load-doc-1" onClick={() => setFileUrl(global['__OPEN_PARAMS_PDF__'])}>
                        Load document 1
                    </Button>
                </div>
                <Button testId="load-doc-2" onClick={() => setFileUrl(pageLabelDocument)}>
                    Load document 2
                </Button>
            </div>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    height: '50rem',
                    width: '50rem',
                }}
            >
                <div
                    style={{
                        borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                        overflow: 'auto',
                        width: '15rem',
                    }}
                >
                    <Thumbnails />
                </div>
                <div style={{ flex: 1 }}>
                    <Viewer fileUrl={fileUrl} plugins={[thumbnailPluginInstance]} />
                </div>
            </div>
        </div>
    );
};

test('Test <Thumbnails /> with dynamic document', async () => {
    const { findByLabelText, findByTestId, getByTestId, getByText } = render(<TestThumbnailsDynamicDocument />);

    let viewerEle = await findByTestId('core__viewer');
    mockIsIntersecting(viewerEle, true);
    viewerEle['__jsdomMockClientHeight'] = 798;
    viewerEle['__jsdomMockClientWidth'] = 558;

    // Wait until the document is loaded completely
    await waitForElementToBeRemoved(() => screen.getByTestId('core__doc-loading'));
    await findByTestId('core__text-layer-0');
    await findByTestId('core__annotation-layer-0');
    await findByTestId('core__text-layer-1');
    await findByTestId('core__annotation-layer-1');
    await findByTestId('core__text-layer-2');
    await findByTestId('core__annotation-layer-2');
    await findByTestId('core__text-layer-3');
    await findByTestId('core__annotation-layer-3');

    let pagesContainer = await findByTestId('core__inner-pages');
    pagesContainer.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 0,
        height: 798,
        width: 558,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => {},
    }));
    mockResize(pagesContainer);

    let thumbnailsListContainer = await findByTestId('thumbnail__list-container');
    mockIsIntersecting(thumbnailsListContainer, true);

    let thumbnailsContainer = await findByTestId('thumbnail__list');
    expect(thumbnailsContainer.querySelectorAll('.rpv-thumbnail__item').length).toEqual(8);

    // Find the first thumbnail
    const firstThumbnailContainer = await findByTestId('thumbnail__container-0');
    mockIsIntersecting(firstThumbnailContainer, true);

    const firstThumbnailImage = await findByLabelText('Thumbnail of page 1');
    let src = firstThumbnailImage.getAttribute('src');
    expect(src.substring(0, 100)).toEqual(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACFCAYAAACt+l1zAAAABmJLR0QA/wD/AP+gvaeTAAAKgUlEQV'
    );
    expect(src.length).toEqual(3710);

    // Click the `Load document 2` button
    fireEvent.click(getByText('Load document 2'));

    viewerEle = await findByTestId('core__viewer');
    viewerEle['__jsdomMockClientHeight'] = 798;
    viewerEle['__jsdomMockClientWidth'] = 558;
    mockIsIntersecting(viewerEle, true);

    // Wait until the document is loaded completely
    await waitForElementToBeRemoved(() => screen.getByTestId('core__doc-loading'));
    await findByTestId('core__text-layer-0');
    await findByTestId('core__annotation-layer-0');
    await findByTestId('core__text-layer-1');
    await findByTestId('core__annotation-layer-1');
    await findByTestId('core__text-layer-2');
    await findByTestId('core__annotation-layer-2');
    await findByTestId('core__text-layer-3');
    await findByTestId('core__annotation-layer-3');

    pagesContainer = await findByTestId('core__inner-pages');
    pagesContainer.getBoundingClientRect = jest.fn(() => ({
        x: 0,
        y: 0,
        height: 798,
        width: 558,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => {},
    }));
    mockResize(pagesContainer);

    thumbnailsListContainer = await findByTestId('thumbnail__list-container');
    mockIsIntersecting(thumbnailsListContainer, true);

    thumbnailsContainer = await findByTestId('thumbnail__list');
    expect(thumbnailsContainer.querySelectorAll('.rpv-thumbnail__item').length).toEqual(4);

    // Find the second thumbnail
    const secondThumbnailContainer = await findByTestId('thumbnail__container-1');
    mockIsIntersecting(secondThumbnailContainer, true);

    const secondThumbnailImage = await findByLabelText('Thumbnail of page 2');
    src = secondThumbnailImage.getAttribute('src');
    expect(src.substring(0, 100)).toEqual(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACBCAYAAAA2ax9lAAAABmJLR0QA/wD/AP+gvaeTAAAByUlEQV'
    );
    expect(src.length).toEqual(734);
});
