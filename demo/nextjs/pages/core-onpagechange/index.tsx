import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import type { PageChangeEvent } from '@react-pdf-viewer/core';

const IndexPage = () => {
    const [visitedPages, setVisitedPages] = React.useState([]);
    const handlePageChange = (e: PageChangeEvent) => {
        setVisitedPages((visitedPages) => visitedPages.concat(e.currentPage));
    };

    return (
        <div
            style={{
                margin: '1rem auto',
                width: '64rem',
            }}
        >
            <div style={{ margin: '0.5rem 0' }}>
                Visited pages: <span data-testid="visited-pages">{visitedPages.join(', ')}</span>
            </div>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, .3)',
                    display: 'flex',
                    height: '50rem',
                    width: '100%',
                }}
            >
                <Viewer fileUrl="/pdf-open-parameters.pdf" onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default IndexPage;
