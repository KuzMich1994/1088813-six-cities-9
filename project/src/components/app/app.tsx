import MainScreen from '../main-screen/main-screen';

type AppProps = {
  placeCounter: number;
}

function App({placeCounter}: AppProps): JSX.Element {
  return (
    <MainScreen placeCounter={placeCounter} />
  );
}

export default App;
