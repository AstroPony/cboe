import './styles.scss';
import './fonts.scss';
import Overview from "./components/Overview";
import { ProductProvider } from './store/ProductContext';

function App() {
    return (
        <ProductProvider>
            <Overview/>
        </ProductProvider>
    );
}

export default App;
