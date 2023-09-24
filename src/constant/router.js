import { Main } from '../components/pages';
import { TestResult, TestUploadFace, TestVoice, SelectSong, Result } from '../components/pages/test';

const ROUTE_PATH_LIST = {
    "Main": {path: '/', Component: Main, label: 'Main'},
    "Test": {path: '/service', Component: TestVoice, label: "서비스체험" },
    "Voice": {path: '/service/:id', Component: SelectSong, label: "voice" },
    "Result": {path: '/service/:id/result/:song_id', Component: Result, label: "result" },
    "SignIn": {path: '/signin', Component: SignIn, label: "signin" },
    "SignUp": {path: '/signup', Component: SignUp, label: "signup" },
    "Draw": {path: '/service/:id/draw', Component: TestUploadFace, label: "draw" },
};

export default ROUTE_PATH_LIST;
