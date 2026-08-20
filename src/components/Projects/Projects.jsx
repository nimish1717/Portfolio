import { PhantomPost } from './PhantomPost';
import { FraudDetection } from './FraudDetection';
import { FrontendUI } from './FrontendUI';

export const Projects = () => {
    return (
        <div id="work" className="w-full relative flex flex-col">
            <PhantomPost />
            <FraudDetection />
            <FrontendUI />
        </div>
    );
};
