import { Main, SignIn, SignUp } from '../components/pages';
import { TestUploadFace, TestVoice, SelectSong, Result } from '../components/pages/test';

const ROUTE_PATH_LIST = {
    "Main": {path: '/', Component: Main, label: 'Main'},
    "Test": {path: '/service', Component: TestVoice, label: "서비스체험" },
    "Voice": {path: '/service/:id', Component: SelectSong, label: "voice" },
    "Draw": {path: '/service/:id/draw', Component: TestUploadFace, label: "draw" },
    "FinalResult": {path: '/service/:id/result', Component: Result, label: "final_result"},
    "SignIn": {path: '/signin', Component: SignIn, label: "signin" },
    "SignUp": {path: '/signup', Component: SignUp, label: "signup" }
};

export default ROUTE_PATH_LIST;
