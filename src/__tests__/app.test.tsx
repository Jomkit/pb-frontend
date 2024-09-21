import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe("app", function(){
    it('should render without crashing', () => { 
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );
    })
})