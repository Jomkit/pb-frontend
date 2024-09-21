import { render } from "@testing-library/react";
import LoginForm from "../LoginForm";

describe("login form", function(){
    const mockedLogin = vi.fn();

    it('should render without crashing', () => { 
        render(<LoginForm login={mockedLogin} />);
    });

    it('should match snapshot', () => { 
        const { asFragment } = render(
            <LoginForm login={mockedLogin} />
        )

        expect(asFragment()).toMatchSnapshot();
    });
})