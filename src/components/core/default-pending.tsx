/* eslint-disable tailwindcss/no-custom-classname */
import { Helmet } from "react-helmet";

function RootPendingComponent() {
    return (
        <>
            <Helmet>
                <title>Page Loading...</title>
                <meta
                    name="description"
                    content="Please wait a moment while we prepare the page. Your experience is just around the corner!"
                />
            </Helmet>

            <div className="pointer-events-none flex h-screen select-none flex-col items-center justify-center bg-base-primary text-gray-800 dark:text-gray-300">
                <div className="loader relative mx-auto size-16 before:bg-java-secondary-light/20 after:bg-java-primary" />
                <p className="mt-12 font-mono text-xl">Loading...</p>
            </div>

            <style>
                {`
                .loader:before {
                    content: '';
                    width: 64px;
                    height: 7px;
                    position: absolute;
                    top: 80px;
                    left: 0;
                    border-radius: 50%;
                    animation: shadow324 0.5s linear infinite;
                }

                .loader:after {
                    content: '';
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 5px;
                    animation: jump7456 0.5s linear infinite;
                }

                @keyframes jump7456 {
                    15% {
                        border-bottom-right-radius: 3px;
                    }
                    25% {
                        transform: translateY(9px) rotate(22.5deg);
                    }
                    50% {
                        transform: translateY(18px) scale(1, .9) rotate(45deg);
                        border-bottom-right-radius: 40px;
                    }
                    75% {
                        transform: translateY(9px) rotate(67.5deg);
                    }
                    100% {
                        transform: translateY(0) rotate(90deg);
                    }
                }

                @keyframes shadow324 {
                    0%, 100% {
                        transform: scale(1, 1);
                    }
                    50% {
                        transform: scale(1.2, 1);
                    }
                }
                `}
            </style>
        </>
    );
}

export default RootPendingComponent;
