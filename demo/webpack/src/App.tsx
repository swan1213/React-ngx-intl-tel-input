import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const App = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div
            style={{
                height: '50rem',
                width: '50rem',
                margin: '1rem auto',
            }}
        >
            <Viewer fileUrl={'/pdf-open-parameters.pdf'} plugins={[defaultLayoutPluginInstance]} />
        </div>
    );
};

export default App;
