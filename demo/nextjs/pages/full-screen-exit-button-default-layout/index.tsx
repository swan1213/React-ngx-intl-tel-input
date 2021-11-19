import * as React from 'react';
import { Button, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const IndexPage = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            fullScreenPlugin: {
                renderExitFullScreenButton: (props) => (
                    <div
                        style={{
                            bottom: '1rem',
                            position: 'fixed',
                            right: '1rem',
                        }}
                    >
                        <Button testId="exit-full-screen" onClick={props.onClick}>
                            Exit
                        </Button>
                    </div>
                ),
            },
        },
    });

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.js">
            <div
                style={{
                    height: '50rem',
                    margin: '5rem auto',
                    width: '64rem',
                }}
            >
                <Viewer fileUrl="/pdf-open-parameters.pdf" plugins={[defaultLayoutPluginInstance]} />
            </div>
        </Worker>
    );
};

export default IndexPage;
