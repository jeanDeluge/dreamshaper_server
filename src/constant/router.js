import { Main } from '../components/pages';
import { TestResult, TestVoice, SelectSong } from '../components/pages/test';

const ROUTE_PATH_LIST = {
    "Main": {path: '/', Component: Main, label: 'Main'},
    "Test": {path: '/service', Component: TestVoice, label: "서비스체험" },
    "Voice": {path: '/service/:id', Component: SelectSong, label: "voice" },
};

export default ROUTE_PATH_LIST;
