import * as React from 'react';
import { TextDirection, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const IndexPage = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div
            style={{
                display: 'flex',
                height: '50rem',
                margin: '5rem auto',
                width: '64rem',
            }}
        >
            <Viewer
                fileUrl="/pdf-open-parameters.pdf"
                plugins={[defaultLayoutPluginInstance]}
                theme={{ direction: TextDirection.RightToLeft }}
            />
        </div>
    );
};

export default IndexPage;
